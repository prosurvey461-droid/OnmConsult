export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export interface AboutCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface Project {
  id: string;
  title: string;
  capacity?: string;
  category: 'Hydropower' | 'Solar' | 'Irrigation' | 'Consulting' | 'Other';
  description: string;
  details?: string;
  image: string;
  client?: string;
  year?: string;
  location?: string;
  status?: 'Completed' | 'Ongoing' | 'Under Design';
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  experience: string;
  education: string;
  description: string;
  icon: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  deliverables?: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  description?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactMessage {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  projectType?: string;
  date: string;
  read: boolean;
}

export interface HeaderSettings {
  topBarVisible: boolean;
  topBarNotice: string;
  logoTitle: string;
  logoSubtitle: string;
  tagline: string;
  logoImageUrl?: string;
  enquireButtonText: string;
  enquireButtonLink: string;
}

export interface FooterSettings {
  aboutDescription: string;
  registrationText: string;
  emergencyHotline: string;
  officeHours: string;
  copyrightText: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  recipientName: string;
  customIntro: string;
  autoOpenOnSubmit: boolean;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  establishedYear: string;
  address: string;
  city: string;
  country: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  supportEmail?: string;
  workingHours: string;
  header?: HeaderSettings;
  footer?: FooterSettings;
  whatsapp?: WhatsAppSettings;
  mdMessage: {
    name: string;
    role: string;
    quote: string;
    photo?: string;
  };
  socialLinks: {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube?: string;
  };
  stats: {
    projectsCompleted: number;
    totalCapacityMW: number;
    expertEngineers: number;
    clientSatisfactionRate: number;
  };
}

export interface SiteData {
  settings: SiteSettings;
  heroSlides: HeroSlide[];
  aboutCards: AboutCard[];
  projects: Project[];
  team: TeamMember[];
  services: Service[];
  skills: Skill[];
  faqs: FAQ[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
    role: string;
  } | null;
  token: string | null;
}
