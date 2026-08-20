import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Lock, 
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteData, auth, setAdminDrawerOpen } = useApp();
  const { settings } = siteData;
  const footer = settings.footer || {
    aboutDescription: `${settings.companyName || "omsconsults"}, Kathmandu, Nepal. Engineering consultancy, pre-feasibility, detailed design, hydraulic studies, and FIDIC construction supervision since 2021.`,
    registrationText: "Govt. Regd. Engineering Consultancy Firm | Kathmandu, Nepal",
    emergencyHotline: settings.primaryPhone || "9851124710",
    officeHours: settings.workingHours || "Sunday - Friday: 9:00 AM - 6:00 PM",
    copyrightText: `© 2026 ${(settings.companyName || "OMSCONSULTS").toUpperCase()}. KATHMANDU, NEPAL. ALL RIGHTS RESERVED.`
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      {/* 4-Column Corporate Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Registration Identity */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-sky-700 flex items-center justify-center text-white shrink-0 rounded-none">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                {settings.header?.logoTitle || settings.companyName || "omsconsults"} <span className="text-sky-400">{settings.header?.logoSubtitle || "Pvt. Ltd."}</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {footer.aboutDescription || `${settings.companyName || "omsconsults"}, Kathmandu, Nepal. Engineering consultancy, pre-feasibility, detailed design, hydraulic studies, and FIDIC construction supervision since ${settings.establishedYear || "2021"}.`}
            </p>

            {footer.registrationText && (
              <p className="text-[11px] font-mono text-slate-500">
                {footer.registrationText}
              </p>
            )}

            <div className="pt-2 space-y-2 text-xs font-mono">
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <a href={`tel:${settings.primaryPhone}`} className="hover:text-white transition-colors">
                  {settings.primaryPhone} {settings.secondaryPhone ? `/ ${settings.secondaryPhone}` : ''}
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{settings.address || "New Baneshwor, Kathmandu, Nepal"}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              Company
            </h4>
            <ul className="space-y-2 uppercase tracking-wider text-[11px] font-semibold">
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#team" className="hover:text-sky-400 transition-colors">Our Team</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-400 transition-colors">Location</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              Services
            </h4>
            <ul className="space-y-2 uppercase tracking-wider text-[11px] font-semibold">
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Engineering Design</a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Supervision</a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Tender Preparation</a>
              </li>
              <li>
                <a href="#our-skills" className="hover:text-sky-400 transition-colors">Competencies</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-sky-400 transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              Connect
            </h4>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={settings.socialLinks?.facebook || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-slate-800 hover:bg-sky-700 hover:text-white border border-slate-700 flex items-center justify-center transition-colors rounded-none"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-slate-800 hover:bg-sky-700 hover:text-white border border-slate-700 flex items-center justify-center transition-colors rounded-none"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.twitter || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-slate-800 hover:bg-sky-700 hover:text-white border border-slate-700 flex items-center justify-center transition-colors rounded-none"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.instagram || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-slate-800 hover:bg-sky-700 hover:text-white border border-slate-700 flex items-center justify-center transition-colors rounded-none"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3 font-mono text-[11px] space-y-1">
              <p className="text-slate-500 uppercase">Office Hours:</p>
              <p className="text-slate-300 font-medium">{footer.officeHours || settings.workingHours}</p>
            </div>

            {auth.isAuthenticated && (
              <div className="pt-3 border-t border-slate-800 font-mono text-[11px]">
                <button
                  onClick={() => setAdminDrawerOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-bold uppercase tracking-wider"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ADMIN CONTROL CENTER
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Minimalist Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
          <span>{footer.copyrightText || `© ${new Date().getFullYear()} SURVEY PRO PVT. LTD. KATHMANDU, NEPAL. ALL RIGHTS RESERVED.`}</span>
          <div className="flex gap-6">
            <a href={settings.socialLinks?.facebook || "#"} className="hover:text-sky-400 transition-colors">Facebook</a>
            <a href={settings.socialLinks?.linkedin || "#"} className="hover:text-sky-400 transition-colors">LinkedIn</a>
            <a href={settings.socialLinks?.twitter || "#"} className="hover:text-sky-400 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
