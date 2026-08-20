import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteData, AuthState, ContactMessage, Project, TeamMember, Service, Skill, FAQ, HeroSlide, AboutCard, SiteSettings } from '../types';
import { defaultSiteData } from '../data/defaultData';
import { api, getStoredUser } from '../services/api';

interface AppContextType {
  siteData: SiteData;
  isLoading: boolean;
  error: string | null;
  auth: AuthState;
  editMode: boolean;
  adminDrawerOpen: boolean;
  adminActiveTab: string;
  loginModalOpen: boolean;
  inquiries: ContactMessage[];
  unreadInquiriesCount: number;
  
  // Actions
  setEditMode: (active: boolean) => void;
  setAdminDrawerOpen: (open: boolean) => void;
  setAdminActiveTab: (tab: string) => void;
  setLoginModalOpen: (open: boolean) => void;
  
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  
  updateAllData: (data: SiteData) => Promise<boolean>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  saveProject: (project: Partial<Project>, isNew?: boolean) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveTeamMember: (member: Partial<TeamMember>, isNew?: boolean) => Promise<boolean>;
  deleteTeamMember: (id: string) => Promise<boolean>;
  saveService: (service: Partial<Service>, isNew?: boolean) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  updateSkills: (skills: Skill[]) => Promise<boolean>;
  saveFaq: (faq: Partial<FAQ>, isNew?: boolean) => Promise<boolean>;
  deleteFaq: (id: string) => Promise<boolean>;
  updateSlides: (slides: HeroSlide[]) => Promise<boolean>;
  updateAboutCards: (cards: AboutCard[]) => Promise<boolean>;
  
  submitContact: (payload: { name?: string; email: string; phone?: string; subject?: string; message?: string; projectType?: string }) => Promise<{ success: boolean; message: string }>;
  fetchInquiries: () => Promise<void>;
  deleteInquiry: (id: string) => Promise<boolean>;
  resetDefaults: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [auth, setAuth] = useState<AuthState>(() => {
    const user = getStoredUser();
    return {
      isAuthenticated: !!user,
      user: user || null,
      token: user ? 'surveypro_admin_session_token_thimi123' : null
    };
  });

  const [editMode, setEditMode] = useState<boolean>(false);
  const [adminDrawerOpen, setAdminDrawerOpen] = useState<boolean>(false);
  const [adminActiveTab, setAdminActiveTab] = useState<string>('overview');
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [inquiries, setInquiries] = useState<ContactMessage[]>([]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.fetchSiteData();
      setSiteData(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load site data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchInquiriesList = useCallback(async () => {
    if (auth.isAuthenticated) {
      const msgs = await api.fetchInquiries();
      setInquiries(msgs);
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    refreshData();
    api.verifyAuth().then((isValid) => {
      if (!isValid) {
        setAuth({ isAuthenticated: false, user: null, token: null });
        setEditMode(false);
      }
    });
  }, [refreshData]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchInquiriesList();
    }
  }, [auth.isAuthenticated, fetchInquiriesList]);

  const login = async (email: string, pass: string) => {
    try {
      const res = await api.login(email, pass);
      if (res.success) {
        setAuth({
          isAuthenticated: true,
          user: res.user,
          token: res.token
        });
        setLoginModalOpen(false);
        setEditMode(true);
        fetchInquiriesList();
        return { success: true };
      }
      return { success: false, error: res.error || 'Authentication error' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to log in' };
    }
  };

  const logout = () => {
    api.logout();
    setAuth({ isAuthenticated: false, user: null, token: null });
    setEditMode(false);
    setAdminDrawerOpen(false);
  };

  const updateAllData = async (data: SiteData) => {
    setSiteData(data);
    try {
      await api.updateAllData(data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateSettings = async (settings: Partial<SiteSettings>) => {
    const updated = { ...siteData, settings: { ...siteData.settings, ...settings } };
    setSiteData(updated);
    try {
      await api.updateSettings(settings);
      return true;
    } catch {
      return false;
    }
  };

  const saveProject = async (project: Partial<Project>, isNew = false) => {
    try {
      const saved = await api.saveProject(project, isNew);
      setSiteData(prev => {
        let updatedList: Project[];
        if (isNew) {
          updatedList = [saved, ...prev.projects];
        } else {
          updatedList = prev.projects.map(p => p.id === saved.id ? saved : p);
        }
        return { ...prev, projects: updatedList };
      });
      return true;
    } catch {
      return false;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api.deleteProject(id);
      setSiteData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
      return true;
    } catch {
      return false;
    }
  };

  const saveTeamMember = async (member: Partial<TeamMember>, isNew = false) => {
    try {
      const saved = await api.saveTeamMember(member, isNew);
      setSiteData(prev => {
        let updatedList: TeamMember[];
        if (isNew) {
          updatedList = [...prev.team, saved];
        } else {
          updatedList = prev.team.map(t => t.id === saved.id ? saved : t);
        }
        return { ...prev, team: updatedList };
      });
      return true;
    } catch {
      return false;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await api.deleteTeamMember(id);
      setSiteData(prev => ({
        ...prev,
        team: prev.team.filter(t => t.id !== id)
      }));
      return true;
    } catch {
      return false;
    }
  };

  const saveService = async (service: Partial<Service>, isNew = false) => {
    try {
      const saved = await api.saveService(service, isNew);
      setSiteData(prev => {
        let updatedList: Service[];
        if (isNew) {
          updatedList = [...prev.services, saved];
        } else {
          updatedList = prev.services.map(s => s.id === saved.id ? saved : s);
        }
        return { ...prev, services: updatedList };
      });
      return true;
    } catch {
      return false;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await api.deleteService(id);
      setSiteData(prev => ({
        ...prev,
        services: prev.services.filter(s => s.id !== id)
      }));
      return true;
    } catch {
      return false;
    }
  };

  const updateSkills = async (skills: Skill[]) => {
    const updated = { ...siteData, skills };
    setSiteData(updated);
    try {
      await api.updateAllData(updated);
      return true;
    } catch {
      return false;
    }
  };

  const saveFaq = async (faq: Partial<FAQ>, isNew = false) => {
    try {
      const saved = await api.saveFaq(faq, isNew);
      setSiteData(prev => {
        let updatedList: FAQ[];
        if (isNew) {
          updatedList = [...prev.faqs, saved];
        } else {
          updatedList = prev.faqs.map(f => f.id === saved.id ? saved : f);
        }
        return { ...prev, faqs: updatedList };
      });
      return true;
    } catch {
      return false;
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      await api.deleteFaq(id);
      setSiteData(prev => ({
        ...prev,
        faqs: prev.faqs.filter(f => f.id !== id)
      }));
      return true;
    } catch {
      return false;
    }
  };

  const updateSlides = async (slides: HeroSlide[]) => {
    const updated = { ...siteData, heroSlides: slides };
    setSiteData(updated);
    try {
      await api.updateAllData(updated);
      return true;
    } catch {
      return false;
    }
  };

  const updateAboutCards = async (cards: AboutCard[]) => {
    const updated = { ...siteData, aboutCards: cards };
    setSiteData(updated);
    try {
      await api.updateAllData(updated);
      return true;
    } catch {
      return false;
    }
  };

  const submitContact = async (payload: { name?: string; email: string; phone?: string; subject?: string; message?: string; projectType?: string }) => {
    try {
      const res = await api.submitContactForm(payload);
      if (auth.isAuthenticated) {
        fetchInquiriesList();
      }
      return { success: true, message: res.message || 'Inquiry submitted successfully!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Submission error. Please try again.' };
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      await api.deleteInquiry(id);
      setInquiries(prev => prev.filter(m => m.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const resetDefaults = async () => {
    try {
      const reset = await api.resetDefaults();
      setSiteData(reset);
      return true;
    } catch {
      return false;
    }
  };

  const unreadInquiriesCount = inquiries.filter(m => !m.read).length;

  return (
    <AppContext.Provider
      value={{
        siteData,
        isLoading,
        error,
        auth,
        editMode,
        adminDrawerOpen,
        adminActiveTab,
        loginModalOpen,
        inquiries,
        unreadInquiriesCount,
        setEditMode,
        setAdminDrawerOpen,
        setAdminActiveTab,
        setLoginModalOpen,
        login,
        logout,
        updateAllData,
        updateSettings,
        saveProject,
        deleteProject,
        saveTeamMember,
        deleteTeamMember,
        saveService,
        deleteService,
        updateSkills,
        saveFaq,
        deleteFaq,
        updateSlides,
        updateAboutCards,
        submitContact,
        fetchInquiries: fetchInquiriesList,
        deleteInquiry,
        resetDefaults,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
