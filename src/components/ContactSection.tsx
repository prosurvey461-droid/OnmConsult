import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Edit2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteData, submitContact, editMode, setAdminActiveTab, setAdminDrawerOpen } = useApp();
  const { settings } = siteData;
  const whatsappConfig = settings.whatsapp || {
    enabled: true,
    phoneNumber: "9779805671898",
    recipientName: "Bigyan",
    customIntro: "Hello Bigyan!",
    autoOpenOnSubmit: true
  };

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Hydropower',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean;
    error: string | null;
    whatsappLink: string | null;
  }>({
    submitting: false,
    success: false,
    error: null,
    whatsappLink: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid email address.', whatsappLink: null });
      return;
    }

    setStatus({ submitting: true, success: false, error: null, whatsappLink: null });
    const res = await submitContact(formState);
    
    // Generate WhatsApp URL
    const waUrl = buildWhatsAppUrl(whatsappConfig, formState);

    if (res.success) {
      setStatus({ 
        submitting: false, 
        success: true, 
        error: null, 
        whatsappLink: whatsappConfig.enabled !== false ? waUrl : null 
      });

      // If autoOpen is active, trigger opening WhatsApp in new window
      if (whatsappConfig.enabled !== false && whatsappConfig.autoOpenOnSubmit !== false) {
        try {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch {
          // Popup blocker fallback handled by clickable button
        }
      }

      setFormState({
        name: '',
        email: '',
        phone: '',
        projectType: 'Hydropower',
        subject: '',
        message: ''
      });
    } else {
      setStatus({ submitting: false, success: false, error: res.message || 'Failed to send message.', whatsappLink: null });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-sky-700"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase font-mono">
                Consultation & Enquiries
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 font-['Cairo',sans-serif] tracking-tight">
              Initiate Project Discussion & <span className="font-bold text-slate-900">Engineering Inquiry</span>
            </h2>
            <p className="text-slate-600 text-sm mt-3 max-w-2xl leading-relaxed">
              Reach out directly to our engineering consultancy office in Kathmandu to discuss your hydropower, solar, or infrastructure project.
            </p>
          </div>

          {editMode && (
            <button
              onClick={() => {
                setAdminActiveTab('settings');
                setAdminDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-none shadow self-start md:self-auto"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Contact Info
            </button>
          )}
        </div>

        {/* Contact Container - Geometric Balance 2-Column Split */}
        <div className="bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 rounded-none">
          
          {/* Left Column: Direct Info Box with Left Sky Accent Border (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between border-l-4 border-sky-600 rounded-none">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-2.5 py-1 bg-slate-800 text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-700">
                  HEADQUARTERS
                </span>
                <h3 className="text-2xl font-bold font-['Cairo',sans-serif] uppercase tracking-tight text-white">
                  {settings.companyName}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Registered engineering consultancy providing feasibility studies, detail engineering, and FIDIC supervision in Nepal.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 pt-4 border-t border-slate-800 font-mono text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 rounded-none">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hotline</p>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      {settings.primaryPhone} / {settings.secondaryPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 rounded-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Email</p>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      {settings.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 rounded-none">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      {settings.address || "New Baneshwor, Kathmandu, Nepal"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 rounded-none">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Working Hours</p>
                    <p className="text-xs font-semibold text-white mt-0.5">
                      {settings.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              RESPONSE TIME: <span className="text-sky-400 font-bold">&lt; 24 HOURS</span>
            </div>
          </div>

          {/* Right Column: Square Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10">
            <h3 className="text-xl font-bold text-slate-900 font-['Cairo',sans-serif] uppercase tracking-tight mb-1">
              Send Us a Technical Project Enquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-mono">
              Fill in the technical parameters below and our lead engineer will respond promptly.
            </p>

            {status.success && (
              <div className="mb-6 p-5 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-none space-y-3">
                <div className="flex items-center gap-3 font-semibold text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry logged successfully! Our engineering team will review it immediately.</span>
                </div>

                {status.whatsappLink && (
                  <div className="pt-2 border-t border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-emerald-800 font-mono">
                      Connect via WhatsApp directly with <strong className="text-emerald-950">{whatsappConfig.recipientName || 'our desk'}</strong>:
                    </p>
                    <a
                      href={status.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-none shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Open WhatsApp Chat ({whatsappConfig.phoneNumber || '9779805671898'})
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-300 text-rose-900 rounded-none flex items-center gap-3 text-xs font-semibold">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[11px]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Er. Ramesh Sharma"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[11px]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[11px]">
                    Phone / Mobile
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9851000000"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[11px]">
                    Project Sector
                  </label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 rounded-none"
                  >
                    <option value="Hydropower">Hydropower Engineering Design</option>
                    <option value="Solar">Solar PV Installation</option>
                    <option value="Supervision">Construction Supervision</option>
                    <option value="Tender">Tender Document Preparation</option>
                    <option value="Irrigation">Irrigation / Hydraulic Works</option>
                    <option value="General">General Technical Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[11px]">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Proposal Request for 15 MW Hydro Detailed Design"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 rounded-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono text-[11px]">
                  Project Specifications / Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Project location, approximate head/discharge or MW capacity, required scope of work..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 rounded-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-all disabled:opacity-50 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                {status.submitting ? (
                  <>SENDING ENQUIRY...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> TRANSMIT MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
