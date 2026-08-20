import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ShieldCheck, 
  Lock, 
  Compass, 
  HardHat, 
  FileText, 
  Search, 
  Users, 
  HelpCircle, 
  Calendar, 
  Server,
  Layers,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteData, auth, editMode, setEditMode, setAdminDrawerOpen, unreadInquiriesCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { settings } = siteData;
  const header = settings.header || {
    topBarVisible: true,
    topBarNotice: settings.workingHours || "Sunday - Friday: 9:00 AM - 6:00 PM (NPT)",
    logoTitle: settings.companyName || "omsconsults",
    logoSubtitle: "Pvt. Ltd.",
    tagline: "Engineering & Supervision",
    logoImageUrl: "",
    enquireButtonText: "ENQUIRE",
    enquireButtonLink: "#contact"
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar - Geometric Precision */}
      {header.topBarVisible !== false && (
        <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                {settings.address || "Kathmandu, Nepal"}
              </span>
              <a 
                href={`tel:${settings.primaryPhone}`} 
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors font-medium text-white"
              >
                <Phone className="w-3.5 h-3.5 text-sky-500" />
                {settings.primaryPhone} {settings.secondaryPhone ? `/ ${settings.secondaryPhone}` : ''}
              </a>
              <a 
                href={`mailto:${settings.email}`} 
                className="hidden md:flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-500" />
                {settings.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden lg:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {header.topBarNotice || settings.workingHours}
              </span>

              {/* Only show Admin button when already authenticated */}
              {auth.isAuthenticated && (
                <div className="flex items-center gap-2">
                  <button
                    id="admin-dashboard-btn-top"
                    onClick={() => setAdminDrawerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-none text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin CMS
                    {unreadInquiriesCount > 0 && (
                      <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 text-[10px] font-black">
                        {unreadInquiriesCount}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar - Geometric Balance Theme */}
      <nav className={`bg-white transition-all duration-200 ${isScrolled ? 'shadow-sm py-3' : 'py-4'} border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Square Sky-700 Icon or Custom Uploaded Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {header.logoImageUrl ? (
              <img 
                src={header.logoImageUrl} 
                alt={header.logoTitle} 
                className="w-10 h-10 object-contain shrink-0" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 bg-sky-700 flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            )}
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-800 uppercase block leading-none">
                {header.logoTitle || "Survey Pro"} <span className="text-sky-700">{header.logoSubtitle || "Pvt. Ltd."}</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                {header.tagline || "Engineering & Supervision"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
            <a 
              href="#about" 
              className="hover:text-sky-700 transition-colors py-1"
            >
              About
            </a>
            <a 
              href="#projects" 
              className="hover:text-sky-700 transition-colors py-1"
            >
              Projects
            </a>
            <a 
              href="#team" 
              className="hover:text-sky-700 transition-colors py-1"
            >
              Team
            </a>

            {/* Services with MegaMenu */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <a 
                href="#services" 
                className="hover:text-sky-700 transition-colors py-1 flex items-center gap-1.5"
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-sky-700' : ''}`} />
              </a>

              {/* Mega Menu Dropdown - Geometric Border & Card */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white shadow-xl border border-slate-200 p-6 grid grid-cols-12 gap-6 animate-in fade-in duration-150 z-50 rounded-none">
                  {/* Left Column: Highlight Box with Sky-700 Accent */}
                  <div className="col-span-5 bg-slate-900 text-white p-6 border-l-4 border-sky-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-[2px] bg-sky-500"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-sky-400 uppercase">Consulting</span>
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2 font-['Cairo',sans-serif]">
                        {header.logoTitle} {header.logoSubtitle}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Kathmandu-based specialists in hydropower design, solar PV implementation, and comprehensive construction supervision since {settings.establishedYear || "2021"}.
                      </p>
                    </div>
                    <a 
                      href={header.enquireButtonLink || "#contact"} 
                      onClick={closeMenus}
                      className="mt-4 inline-flex items-center justify-center px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold uppercase tracking-widest rounded-none transition-colors"
                    >
                      {header.enquireButtonText || "Enquire Now"}
                    </a>
                  </div>

                  {/* Right Column: Links Grid */}
                  <div className="col-span-7 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 pb-1 border-b border-slate-100">
                        Capabilities
                      </p>
                      <a 
                        href="#services" 
                        onClick={closeMenus}
                        className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <Building2 className="w-3.5 h-3.5 text-sky-700" />
                        Services
                      </a>
                      <a 
                        href="#our-skills" 
                        onClick={closeMenus}
                        className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-sky-700" />
                        Expertise
                      </a>
                      <a 
                        href="#faqs" 
                        onClick={closeMenus}
                        className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
                        FAQs
                      </a>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 pb-1 border-b border-slate-100">
                        Quick Access
                      </p>
                      <a 
                        href="#projects" 
                        onClick={closeMenus}
                        className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <Server className="w-3.5 h-3.5 text-sky-700" />
                        Projects
                      </a>
                      <a 
                        href="#team" 
                        onClick={closeMenus}
                        className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <Users className="w-3.5 h-3.5 text-sky-700" />
                        Engineers
                      </a>
                      <a 
                        href="#contact" 
                        onClick={closeMenus}
                        className="flex items-center gap-2 p-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-sky-700 transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-sky-700" />
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a 
              href="#faqs" 
              className="hover:text-sky-700 transition-colors py-1"
            >
              FAQs
            </a>
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href={header.enquireButtonLink || "#contact"} 
              className="px-6 py-2.5 text-xs font-bold bg-sky-700 text-white rounded-none hover:bg-sky-800 uppercase tracking-widest transition-colors shadow-sm"
            >
              {header.enquireButtonText || "ENQUIRE"}
            </a>
            {auth.isAuthenticated && (
              <button
                onClick={() => setAdminDrawerOpen(true)}
                className="px-4 py-2.5 text-xs font-bold bg-slate-900 text-sky-400 border border-slate-700 rounded-none hover:bg-slate-800 uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                CMS
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-none transition-colors border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
            <a 
              href="#about" 
              onClick={closeMenus}
              className="block px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              About Us
            </a>
            <a 
              href="#projects" 
              onClick={closeMenus}
              className="block px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              Our Projects
            </a>
            <a 
              href="#team" 
              onClick={closeMenus}
              className="block px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              Our Team
            </a>
            <a 
              href="#services" 
              onClick={closeMenus}
              className="block px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              Services
            </a>
            <a 
              href="#our-skills" 
              onClick={closeMenus}
              className="block px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              Our Expertise
            </a>
            <a 
              href="#faqs" 
              onClick={closeMenus}
              className="block px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 hover:text-sky-700"
            >
              FAQs
            </a>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a 
                href={header.enquireButtonLink || "#contact"} 
                onClick={closeMenus}
                className="w-full text-center py-2.5 bg-sky-700 text-white font-bold text-xs uppercase tracking-widest rounded-none"
              >
                {header.enquireButtonText || "ENQUIRE NOW"}
              </a>
              {auth.isAuthenticated && (
                <button
                  onClick={() => { closeMenus(); setAdminDrawerOpen(true); }}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-none flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-sky-400" /> Admin Control Center
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
