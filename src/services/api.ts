import { SiteData, ContactMessage, SiteSettings, Project, TeamMember, Service, Skill, FAQ, HeroSlide, AboutCard } from '../types';
import { defaultSiteData } from '../data/defaultData';
import { db, doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy } from '../lib/firebase';

const TOKEN_KEY = 'omsconsults_admin_token';
const USER_KEY = 'omsconsults_admin_user';
const LOCAL_STORAGE_DATA_KEY = 'omsconsults_site_data_fallback';
const INQUIRIES_STORAGE_KEY = 'omsconsults_inquiries_local';
const DEFAULT_ADMIN_TOKEN = 'surveypro_admin_session_token_thimi123';
const FIRESTORE_DOC_ID = 'omsconsults_main_content';

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

// Fallback to local storage when offline or transitioning
export function getFallbackData(): SiteData {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.settings) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not parse cached local data", e);
  }
  return defaultSiteData;
}

export function saveFallbackData(data: SiteData) {
  try {
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not cache local data", e);
  }
}

function getLocalInquiries(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

function saveLocalInquiries(msgs: ContactMessage[]) {
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(msgs));
  } catch {
    // ignore
  }
}

// ----------------------------------------------------
// Firestore Sync Helpers
// ----------------------------------------------------
async function fetchFromFirestore(): Promise<SiteData | null> {
  try {
    const docRef = doc(db, 'site_content', FIRESTORE_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const docData = snap.data();
      if (docData && docData.data && docData.data.settings) {
        return docData.data as SiteData;
      }
    }
  } catch (err) {
    console.warn('Firestore fetch failed or offline:', err);
  }
  return null;
}

async function saveToFirestore(data: SiteData): Promise<boolean> {
  try {
    const docRef = doc(db, 'site_content', FIRESTORE_DOC_ID);
    await setDoc(docRef, {
      data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore save error:', err);
    return false;
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
      if (res.ok) {
        const data = await res.json();
        setStoredToken(data.token, data.user);
        return data;
      }
    } catch {
      // Backend not running (Netlify static deployment)
    }

    // Direct credential validation fallback for Netlify & static client hosting
    if (email.trim().toLowerCase() === 'admin@thimiguys.com' && password === 'thimi123') {
      const user = { email, name: 'Ashok Bista (Admin)', role: 'Administrator' };
      setStoredToken(DEFAULT_ADMIN_TOKEN, user);
      return { success: true, token: DEFAULT_ADMIN_TOKEN, user };
    }
    throw new Error('Invalid email or password');
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

  // Site Data (Firebase Cloud Firestore + Node.js Server + Local fallback)
  async fetchSiteData(): Promise<SiteData> {
    // 1. Try Firebase Cloud Firestore first (works everywhere worldwide, Netlify, custom domain)
    const firestoreData = await fetchFromFirestore();
    if (firestoreData) {
      saveFallbackData(firestoreData);
      return firestoreData;
    }

    // 2. Try Node Express backend if running
    try {
      const res = await fetch(`/api/data?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data && data.settings) {
            saveFallbackData(data);
            // Seed Firestore with initial server data
            saveToFirestore(data).catch(() => {});
            return data;
          }
        }
      }
    } catch {
      // ignore
    }

    // 3. Fallback to localStorage / default dataset
    const fallback = getFallbackData();
    // Try to seed Firestore if empty
    saveToFirestore(fallback).catch(() => {});
    return fallback;
  },

  async updateAllData(data: SiteData): Promise<SiteData> {
    saveFallbackData(data);

    // 1. Persist to Firebase Cloud Firestore
    saveToFirestore(data).catch(err => console.warn('Could not sync to Firestore:', err));

    // 2. Persist to Node Express backend if available
    try {
      fetch('/api/data', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      }).catch(() => {});
    } catch {
      // ignore
    }
    return data;
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const cur = await this.fetchSiteData();
    cur.settings = { ...cur.settings, ...settings };
    await this.updateAllData(cur);
    return cur.settings;
  },

  // Projects CRUD
  async saveProject(project: Partial<Project>, isNew = false): Promise<Project> {
    const cur = await this.fetchSiteData();
    let saved: Project;

    if (isNew || !project.id) {
      saved = {
        id: project.id || `proj-${Date.now()}`,
        title: project.title || 'New Project',
        client: project.client || '',
        category: project.category || 'Consulting',
        location: project.location || '',
        year: project.year || new Date().getFullYear().toString(),
        status: project.status || 'Completed',
        image: project.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
        featured: project.featured ?? false,
        capacity: project.capacity || '',
        details: project.details || '',
        description: project.description || ''
      };
      cur.projects = [saved, ...(cur.projects || [])];
    } else {
      saved = {
        ...(cur.projects || []).find(p => p.id === project.id),
        ...project
      } as Project;
      cur.projects = (cur.projects || []).map(p => p.id === saved.id ? saved : p);
    }

    await this.updateAllData(cur);
    return saved;
  },

  async deleteProject(id: string): Promise<boolean> {
    const cur = await this.fetchSiteData();
    cur.projects = (cur.projects || []).filter(p => p.id !== id);
    await this.updateAllData(cur);
    return true;
  },

  // Team CRUD
  async saveTeamMember(member: Partial<TeamMember>, isNew = false): Promise<TeamMember> {
    const cur = await this.fetchSiteData();
    let saved: TeamMember;

    if (isNew || !member.id) {
      saved = {
        id: member.id || `team-${Date.now()}`,
        name: member.name || 'New Member',
        title: member.title || 'Engineering Specialist',
        education: member.education || 'B.E. Civil',
        experience: member.experience || '5+ Years',
        icon: member.icon || 'Building2',
        description: member.description || '',
        photo: member.photo || '',
        email: member.email || '',
        phone: member.phone || '',
        linkedin: member.linkedin || ''
      };
      cur.team = [...(cur.team || []), saved];
    } else {
      saved = {
        ...(cur.team || []).find(t => t.id === member.id),
        ...member
      } as TeamMember;
      cur.team = (cur.team || []).map(t => t.id === saved.id ? saved : t);
    }

    await this.updateAllData(cur);
    return saved;
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    const cur = await this.fetchSiteData();
    cur.team = (cur.team || []).filter(t => t.id !== id);
    await this.updateAllData(cur);
    return true;
  },

  // Services CRUD
  async saveService(service: Partial<Service>, isNew = false): Promise<Service> {
    const cur = await this.fetchSiteData();
    let saved: Service;

    if (isNew || !service.id) {
      saved = {
        id: service.id || `serv-${Date.now()}`,
        title: service.title || 'New Service',
        icon: service.icon || 'Compass',
        description: service.description || '',
        details: service.details || [],
        deliverables: service.deliverables || ''
      };
      cur.services = [...(cur.services || []), saved];
    } else {
      saved = {
        ...(cur.services || []).find(s => s.id === service.id),
        ...service
      } as Service;
      cur.services = (cur.services || []).map(s => s.id === saved.id ? saved : s);
    }

    await this.updateAllData(cur);
    return saved;
  },

  async deleteService(id: string): Promise<boolean> {
    const cur = await this.fetchSiteData();
    cur.services = (cur.services || []).filter(s => s.id !== id);
    await this.updateAllData(cur);
    return true;
  },

  // FAQs CRUD
  async saveFaq(faq: Partial<FAQ>, isNew = false): Promise<FAQ> {
    const cur = await this.fetchSiteData();
    let saved: FAQ;

    if (isNew || !faq.id) {
      saved = {
        id: faq.id || `faq-${Date.now()}`,
        question: faq.question || 'New Question',
        answer: faq.answer || 'Answer',
        category: faq.category || 'General'
      };
      cur.faqs = [...(cur.faqs || []), saved];
    } else {
      saved = {
        ...(cur.faqs || []).find(f => f.id === faq.id),
        ...faq
      } as FAQ;
      cur.faqs = (cur.faqs || []).map(f => f.id === saved.id ? saved : f);
    }

    await this.updateAllData(cur);
    return saved;
  },

  async deleteFaq(id: string): Promise<boolean> {
    const cur = await this.fetchSiteData();
    cur.faqs = (cur.faqs || []).filter(f => f.id !== id);
    await this.updateAllData(cur);
    return true;
  },

  // Hero Slides
  async updateSlides(slides: HeroSlide[]): Promise<HeroSlide[]> {
    const cur = await this.fetchSiteData();
    cur.heroSlides = slides;
    await this.updateAllData(cur);
    return slides;
  },

  // About Cards
  async updateAboutCards(cards: AboutCard[]): Promise<AboutCard[]> {
    const cur = await this.fetchSiteData();
    cur.aboutCards = cards;
    await this.updateAllData(cur);
    return cards;
  },

  // Skills
  async updateSkills(skills: Skill[]): Promise<Skill[]> {
    const cur = await this.fetchSiteData();
    cur.skills = skills;
    await this.updateAllData(cur);
    return skills;
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
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: payload.name || 'Anonymous',
      email: payload.email,
      phone: payload.phone || '',
      subject: payload.subject || 'New Contact Request',
      message: payload.message || '',
      projectType: payload.projectType || 'General Inquiry',
      date: new Date().toISOString(),
      read: false
    };

    // Save locally
    const localList = [newMsg, ...getLocalInquiries()];
    saveLocalInquiries(localList);

    // Save to Firestore inquiries collection
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...newMsg,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Could not write inquiry to Firestore:', e);
    }

    // Save to Node server if active
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch {
      // ignore
    }
    return { success: true, message: 'Inquiry received and logged.' };
  },

  async fetchInquiries(): Promise<ContactMessage[]> {
    // Try Firestore collection
    try {
      const q = query(collection(db, 'inquiries'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const msgs: ContactMessage[] = [];
        snap.forEach(d => {
          const item = d.data();
          msgs.push({
            id: d.id,
            name: item.name || 'Anonymous',
            email: item.email || '',
            phone: item.phone || '',
            subject: item.subject || '',
            message: item.message || '',
            projectType: item.projectType || 'General Inquiry',
            date: item.date || item.createdAt || new Date().toISOString(),
            read: !!item.read
          });
        });
        saveLocalInquiries(msgs);
        return msgs;
      }
    } catch (err) {
      console.warn('Firestore inquiries query:', err);
    }

    // Try Node backend
    try {
      const res = await fetch('/api/inquiries', {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          saveLocalInquiries(data);
          return data;
        }
      }
    } catch {
      // ignore
    }
    return getLocalInquiries();
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const local = getLocalInquiries().filter(m => m.id !== id);
    saveLocalInquiries(local);

    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch {
      // ignore
    }

    try {
      fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      }).catch(() => {});
    } catch {
      // ignore
    }
    return true;
  },

  async resetDefaults(): Promise<SiteData> {
    await this.updateAllData(defaultSiteData);
    return defaultSiteData;
  }
};
