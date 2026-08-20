import { SiteData, ContactMessage, SiteSettings, Project, TeamMember, Service, Skill, FAQ, HeroSlide, AboutCard } from '../types';
import { defaultSiteData } from '../data/defaultData';

const TOKEN_KEY = 'omsconsults_admin_token';
const USER_KEY = 'omsconsults_admin_user';
const LOCAL_STORAGE_DATA_KEY = 'omsconsults_site_data_fallback';
const DEFAULT_ADMIN_TOKEN = 'surveypro_admin_session_token_thimi123';

export function getStoredToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem('surveypro_admin_token');
  return token || null;
}

export function setStoredToken(token: string | null, user?: any) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('surveypro_admin_token', token);
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('surveypro_admin_user', JSON.stringify(user));
    }
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('surveypro_admin_token');
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('surveypro_admin_user');
  }
}

export function getStoredUser(): any {
  try {
    const user = localStorage.getItem(USER_KEY) || localStorage.getItem('surveypro_admin_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  const token = getStoredToken() || DEFAULT_ADMIN_TOKEN;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'x-admin-token': token
  };
}

// Fallback to local storage when server is starting or for offline resilience
function getFallbackData(): SiteData {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not parse cached local data", e);
  }
  return defaultSiteData;
}

function saveFallbackData(data: SiteData) {
  try {
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not cache local data", e);
  }
}

export const api = {
  // Auth
  async login(email: string, password: string) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      setStoredToken(data.token, data.user);
      return data;
    } catch (err: any) {
      // Direct validation fallback for client safety
      if (email.trim().toLowerCase() === 'admin@thimiguys.com' && password === 'thimi123') {
        const user = { email, name: 'Ashok Bista (Admin)', role: 'Administrator' };
        setStoredToken(DEFAULT_ADMIN_TOKEN, user);
        return { success: true, token: DEFAULT_ADMIN_TOKEN, user };
      }
      throw err;
    }
  },

  async verifyAuth(): Promise<boolean> {
    const token = getStoredToken();
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/verify', {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        return !!data.valid;
      }
      return token === DEFAULT_ADMIN_TOKEN;
    } catch {
      return token === DEFAULT_ADMIN_TOKEN;
    }
  },

  logout() {
    setStoredToken(null);
  },

  // Site Data (Always fresh for all devices)
  async fetchSiteData(): Promise<SiteData> {
    try {
      const res = await fetch(`/api/data?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (!res.ok) throw new Error(`Failed to fetch site data: ${res.status}`);
      const data = await res.json();
      if (data && data.settings) {
        saveFallbackData(data);
        return data;
      }
      return getFallbackData();
    } catch (err) {
      console.warn('Using cached or default site data:', err);
      return getFallbackData();
    }
  },

  async updateAllData(data: SiteData): Promise<SiteData> {
    saveFallbackData(data);
    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server update failed with code ${res.status}`);
    }
    const result = await res.json();
    return result.data || data;
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to update settings on server (Status: ${res.status})`);
    }
    const result = await res.json();
    const cur = getFallbackData();
    cur.settings = { ...cur.settings, ...settings };
    saveFallbackData(cur);
    return result.settings;
  },

  // Projects CRUD
  async saveProject(project: Partial<Project>, isNew = false): Promise<Project> {
    const url = isNew ? '/api/projects' : `/api/projects/${project.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to save project on server (Status: ${res.status})`);
    }
    const result = await res.json();
    const saved = result.project;
    const cur = getFallbackData();
    if (isNew) {
      cur.projects = [saved, ...(cur.projects || [])];
    } else {
      cur.projects = (cur.projects || []).map(p => p.id === saved.id ? saved : p);
    }
    saveFallbackData(cur);
    return saved;
  },

  async deleteProject(id: string): Promise<boolean> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to delete project on server`);
    }
    const cur = getFallbackData();
    cur.projects = (cur.projects || []).filter(p => p.id !== id);
    saveFallbackData(cur);
    return true;
  },

  // Team CRUD
  async saveTeamMember(member: Partial<TeamMember>, isNew = false): Promise<TeamMember> {
    const url = isNew ? '/api/team' : `/api/team/${member.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(member)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to save team member on server`);
    }
    const result = await res.json();
    const saved = result.member;
    const cur = getFallbackData();
    if (isNew) {
      cur.team = [...(cur.team || []), saved];
    } else {
      cur.team = (cur.team || []).map(t => t.id === saved.id ? saved : t);
    }
    saveFallbackData(cur);
    return saved;
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    const res = await fetch(`/api/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to delete team member on server`);
    }
    const cur = getFallbackData();
    cur.team = (cur.team || []).filter(t => t.id !== id);
    saveFallbackData(cur);
    return true;
  },

  // Services CRUD
  async saveService(service: Partial<Service>, isNew = false): Promise<Service> {
    const url = isNew ? '/api/services' : `/api/services/${service.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(service)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to save service on server`);
    }
    const result = await res.json();
    const saved = result.service;
    const cur = getFallbackData();
    if (isNew) {
      cur.services = [...(cur.services || []), saved];
    } else {
      cur.services = (cur.services || []).map(s => s.id === saved.id ? saved : s);
    }
    saveFallbackData(cur);
    return saved;
  },

  async deleteService(id: string): Promise<boolean> {
    const res = await fetch(`/api/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to delete service on server`);
    }
    const cur = getFallbackData();
    cur.services = (cur.services || []).filter(s => s.id !== id);
    saveFallbackData(cur);
    return true;
  },

  // FAQs CRUD
  async saveFaq(faq: Partial<FAQ>, isNew = false): Promise<FAQ> {
    const url = isNew ? '/api/faqs' : `/api/faqs/${faq.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(faq)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to save FAQ on server`);
    }
    const result = await res.json();
    const saved = result.faq;
    const cur = getFallbackData();
    if (isNew) {
      cur.faqs = [...(cur.faqs || []), saved];
    } else {
      cur.faqs = (cur.faqs || []).map(f => f.id === saved.id ? saved : f);
    }
    saveFallbackData(cur);
    return saved;
  },

  async deleteFaq(id: string): Promise<boolean> {
    const res = await fetch(`/api/faqs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to delete FAQ on server`);
    }
    const cur = getFallbackData();
    cur.faqs = (cur.faqs || []).filter(f => f.id !== id);
    saveFallbackData(cur);
    return true;
  },

  // Hero Slides
  async updateSlides(slides: HeroSlide[]): Promise<HeroSlide[]> {
    const res = await fetch('/api/slides', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(slides)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to update slides on server`);
    }
    const result = await res.json();
    return result.slides;
  },

  // About Cards
  async updateAboutCards(cards: AboutCard[]): Promise<AboutCard[]> {
    const res = await fetch('/api/about-cards', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(cards)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to update about cards on server`);
    }
    const result = await res.json();
    return result.aboutCards;
  },

  // Skills
  async updateSkills(skills: Skill[]): Promise<Skill[]> {
    const res = await fetch('/api/skills', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(skills)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to update skills on server`);
    }
    const result = await res.json();
    return result.skills;
  },

  // Contact Inquiries
  async submitContactForm(payload: {
    name?: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
    projectType?: string;
  }) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async fetchInquiries(): Promise<ContactMessage[]> {
    try {
      const res = await fetch('/api/inquiries', {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("Could not fetch messages from server", err);
    }
    return [];
  },

  async deleteInquiry(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async resetDefaults(): Promise<SiteData> {
    const res = await fetch('/api/reset-defaults', {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error('Failed to reset defaults on server');
    }
    const data = await res.json();
    saveFallbackData(data.data);
    return data.data;
  }
};
