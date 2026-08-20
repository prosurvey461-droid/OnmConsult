import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EditItemModal, EditModalType } from './EditItemModal';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { 
  X, 
  Settings, 
  Layers, 
  Users, 
  Briefcase, 
  HelpCircle, 
  MessageSquare, 
  Sliders, 
  RotateCcw, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Image as ImageIcon,
  LayoutTemplate,
  PanelTop,
  PanelBottom,
  MessageCircle,
  ExternalLink,
  Phone,
  Code,
  Upload
} from 'lucide-react';

export const AdminControlDrawer: React.FC = () => {
  const { 
    siteData, 
    adminDrawerOpen, 
    setAdminDrawerOpen, 
    adminActiveTab, 
    setAdminActiveTab, 
    updateAllData,
    updateSettings, 
    saveProject,
    deleteProject,
    saveTeamMember,
    deleteTeamMember,
    saveService,
    deleteService,
    saveFaq,
    deleteFaq,
    updateSkills,
    updateSlides,
    inquiries,
    deleteInquiry,
    resetDefaults,
    refreshData
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(adminActiveTab || 'overview');
  const [settingsForm, setSettingsForm] = useState({ 
    ...siteData.settings,
    header: siteData.settings.header || {
      topBarVisible: true,
      topBarNotice: siteData.settings.workingHours || "Sunday - Friday: 9:00 AM - 6:00 PM (NPT)",
      logoTitle: siteData.settings.companyName || "omsconsults",
      logoSubtitle: "Pvt. Ltd.",
      tagline: "Engineering & Supervision",
      logoImageUrl: "",
      enquireButtonText: "ENQUIRE",
      enquireButtonLink: "#contact"
    },
    footer: siteData.settings.footer || {
      aboutDescription: `${siteData.settings.companyName || "omsconsults"}, Kathmandu, Nepal. Engineering consultancy, pre-feasibility, detailed design, hydraulic studies, and FIDIC construction supervision since 2021.`,
      registrationText: "Govt. Regd. Engineering Consultancy Firm | Kathmandu, Nepal",
      emergencyHotline: siteData.settings.primaryPhone || "9851124710",
      officeHours: siteData.settings.workingHours || "Sunday - Friday: 9:00 AM - 6:00 PM",
      copyrightText: `© 2026 ${(siteData.settings.companyName || "OMSCONSULTS").toUpperCase()}. KATHMANDU, NEPAL. ALL RIGHTS RESERVED.`
    },
    whatsapp: siteData.settings.whatsapp || {
      enabled: true,
      phoneNumber: "9779805671898",
      recipientName: "Bigyan",
      customIntro: "Hello Bigyan!",
      autoOpenOnSubmit: true
    }
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Raw JSON Editor State
  const [rawJsonText, setRawJsonText] = useState<string>(() => JSON.stringify(siteData, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSaveSuccess, setJsonSaveSuccess] = useState<boolean>(false);
  const [isFormattingJson, setIsFormattingJson] = useState<boolean>(false);

  // Update raw JSON when siteData changes
  React.useEffect(() => {
    setRawJsonText(JSON.stringify(siteData, null, 2));
  }, [siteData]);

  // Edit Submodal state
  const [editModal, setEditModal] = useState<{
    open: boolean;
    type: EditModalType;
    item: any;
    isNew: boolean;
  }>({
    open: false,
    type: 'project',
    item: null,
    isNew: false
  });

  // Sync tab with external state
  React.useEffect(() => {
    if (adminActiveTab) {
      setActiveTab(adminActiveTab);
    }
  }, [adminActiveTab]);

  React.useEffect(() => {
    setSettingsForm({ 
      ...siteData.settings,
      header: siteData.settings.header || {
        topBarVisible: true,
        topBarNotice: siteData.settings.workingHours || "Sunday - Friday: 9:00 AM - 6:00 PM (NPT)",
        logoTitle: siteData.settings.companyName || "omsconsults",
        logoSubtitle: "Pvt. Ltd.",
        tagline: "Engineering & Supervision",
        logoImageUrl: "",
        enquireButtonText: "ENQUIRE",
        enquireButtonLink: "#contact"
      },
      footer: siteData.settings.footer || {
        aboutDescription: `${siteData.settings.companyName || "omsconsults"}, Kathmandu, Nepal. Engineering consultancy, pre-feasibility, detailed design, hydraulic studies, and FIDIC construction supervision since 2021.`,
        registrationText: "Govt. Regd. Engineering Consultancy Firm | Kathmandu, Nepal",
        emergencyHotline: siteData.settings.primaryPhone || "9851124710",
        officeHours: siteData.settings.workingHours || "Sunday - Friday: 9:00 AM - 6:00 PM",
        copyrightText: `© 2026 ${(siteData.settings.companyName || "OMSCONSULTS").toUpperCase()}. KATHMANDU, NEPAL. ALL RIGHTS RESERVED.`
      },
      whatsapp: siteData.settings.whatsapp || {
        enabled: true,
        phoneNumber: "9779805671898",
        recipientName: "Bigyan",
        customIntro: "Hello Bigyan!",
        autoOpenOnSubmit: true
      }
    });
  }, [siteData.settings]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!adminDrawerOpen) return null;

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    const success = await updateSettings(settingsForm);
    setIsSaving(false);
    if (success) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 4000);
    } else {
      setSaveError("Failed to save changes to the central server. Please check connection.");
      setTimeout(() => setSaveError(null), 5000);
    }
  };

  const handleOpenEdit = (type: EditModalType, item: any = null, isNew = false) => {
    setEditModal({
      open: true,
      type,
      item,
      isNew
    });
  };

  const handleSaveItem = async (data: any, isNew: boolean) => {
    setIsSaving(true);
    let success = false;
    switch (editModal.type) {
      case 'project':
        success = await saveProject(data, isNew);
        break;
      case 'team':
        success = await saveTeamMember(data, isNew);
        break;
      case 'service':
        success = await saveService(data, isNew);
        break;
      case 'faq':
        success = await saveFaq(data, isNew);
        break;
      case 'slide':
        if (isNew) {
          const newSlide = { ...data, id: `slide_${Date.now()}` };
          success = await updateSlides([...siteData.heroSlides, newSlide]);
        } else {
          const updated = siteData.heroSlides.map(s => s.id === data.id ? data : s);
          success = await updateSlides(updated);
        }
        break;
    }
    setIsSaving(false);
    if (success) {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (siteData.heroSlides.length <= 1) {
      alert("At least one hero slide is required.");
      return;
    }
    if (window.confirm("Delete this slide?")) {
      const updated = siteData.heroSlides.filter(s => s.id !== id);
      await updateSlides(updated);
    }
  };

  const handleExportJSON = (filename = 'site-data.json') => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed || !parsed.settings) {
          throw new Error("Invalid file format: Missing settings object.");
        }
        await updateAllData(parsed);
        alert("Site data successfully imported!");
      } catch (err: any) {
        alert(`Failed to import JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="bg-slate-900 text-white w-full max-w-4xl h-full flex flex-col shadow-2xl border-l-4 border-sky-700 animate-in slide-in-from-right duration-300 rounded-none">
        {/* Drawer Header - Geometric Balance Style */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-700 flex items-center justify-center text-white shrink-0 rounded-none">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">
                ADMIN CONTROL CENTER
              </span>
              <h2 className="text-lg font-bold font-['Cairo',sans-serif] text-white uppercase tracking-tight">
                {siteData.settings.companyName || "omsconsults"} CMS Engine
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateAllData(siteData)}
              title="Force sync current data to central server"
              className="px-3 py-1.5 bg-slate-800 hover:bg-sky-700 text-sky-300 hover:text-white border border-slate-700 text-[10px] font-mono font-bold uppercase transition-colors"
            >
              Sync Live Server
            </button>
            <button
              onClick={() => setAdminDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-none transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Tabs Navigation */}
        <div className="px-6 bg-slate-950 border-b border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none py-2 text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutTemplate },
            { id: 'header', label: 'Header & Nav', icon: PanelTop },
            { id: 'footer', label: 'Footer & Info', icon: PanelBottom },
            { id: 'whatsapp', label: 'WhatsApp & Form', icon: MessageCircle },
            { id: 'settings', label: 'General Info', icon: Settings },
            { id: 'slides', label: `Slides (${siteData.heroSlides.length})`, icon: ImageIcon },
            { id: 'projects', label: `Projects (${siteData.projects.length})`, icon: Layers },
            { id: 'team', label: `Team (${siteData.team.length})`, icon: Users },
            { id: 'services', label: `Services (${siteData.services.length})`, icon: Briefcase },
            { id: 'skills', label: 'Skills %', icon: Sliders },
            { id: 'faqs', label: `FAQs (${siteData.faqs.length})`, icon: HelpCircle },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: MessageSquare },
            { id: 'json', label: 'Raw JSON Data', icon: Code },
            { id: 'backup', label: 'Backup / Reset', icon: RotateCcw }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-none font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors text-[11px] ${
                  isActive 
                    ? 'bg-sky-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Drawer Body Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-slate-300">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div className="bg-slate-800 p-5 rounded-none border border-slate-700 border-l-4 border-l-sky-600">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Projects</p>
                  <p className="text-2xl font-bold text-white mt-1">{siteData.projects.length}</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-none border border-slate-700 border-l-4 border-l-sky-600">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Faculty</p>
                  <p className="text-2xl font-bold text-white mt-1">{siteData.team.length}</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-none border border-slate-700 border-l-4 border-l-sky-600">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Services</p>
                  <p className="text-2xl font-bold text-white mt-1">{siteData.services.length}</p>
                </div>
                <div className="bg-slate-800 p-5 rounded-none border border-slate-700 border-l-4 border-l-sky-600">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiries</p>
                  <p className="text-2xl font-bold text-sky-400 mt-1">{inquiries.length}</p>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-none border border-slate-700 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                  Quick CMS Add Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleOpenEdit('project', null, true)}
                    className="p-3.5 bg-slate-900 hover:bg-sky-700 rounded-none border border-slate-700 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white transition-colors"
                  >
                    <Plus className="w-4 h-4 text-sky-400" />
                    + Add Project
                  </button>
                  <button
                    onClick={() => handleOpenEdit('team', null, true)}
                    className="p-3.5 bg-slate-900 hover:bg-sky-700 rounded-none border border-slate-700 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white transition-colors"
                  >
                    <Plus className="w-4 h-4 text-sky-400" />
                    + Add Member
                  </button>
                  <button
                    onClick={() => handleOpenEdit('faq', null, true)}
                    className="p-3.5 bg-slate-900 hover:bg-sky-700 rounded-none border border-slate-700 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white transition-colors"
                  >
                    <Plus className="w-4 h-4 text-sky-400" />
                    + Add FAQ
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-none border border-slate-700 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                  Recent Inquiries Received
                </h3>
                {inquiries.length === 0 ? (
                  <p className="text-slate-400 italic">No inquiry messages logged yet.</p>
                ) : (
                  <div className="space-y-2">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="p-3.5 bg-slate-900 rounded-none border border-slate-700 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white font-mono">{inq.name || inq.email}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-md mt-0.5">{inq.subject || inq.message}</p>
                        </div>
                        <span className="text-[10px] text-sky-400 font-mono">
                          {new Date(inq.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: HEADER & NAVIGATION */}
          {activeTab === 'header' && (
            <form onSubmit={handleSaveSettings} className="space-y-5">
              {settingsSaved && (
                <div className="p-3.5 bg-slate-800 border border-sky-500 text-sky-300 rounded-none flex items-center gap-2 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  Header & Navigation settings saved successfully!
                </div>
              )}

              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs flex items-center gap-2">
                  <PanelTop className="w-4 h-4 text-sky-400" /> Top Announcement Bar
                </h3>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="topBarVisible"
                    checked={settingsForm.header?.topBarVisible !== false}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      header: {
                        ...settingsForm.header!,
                        topBarVisible: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded-none accent-sky-600 cursor-pointer"
                  />
                  <label htmlFor="topBarVisible" className="text-xs text-slate-200 font-mono font-bold cursor-pointer">
                    Enable Top Information & Hotline Bar
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    Top Bar Working Hours Notice
                  </label>
                  <input
                    type="text"
                    value={settingsForm.header?.topBarNotice || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      header: {
                        ...settingsForm.header!,
                        topBarNotice: e.target.value
                      }
                    })}
                    placeholder="Sunday - Friday: 9:00 AM - 6:00 PM (NPT)"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs">
                  Brand Logo & Identity
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      Logo Brand Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header?.logoTitle || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        header: {
                          ...settingsForm.header!,
                          logoTitle: e.target.value
                        }
                      })}
                      placeholder="omsconsults"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      Logo Brand Subtitle / Suffix
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header?.logoSubtitle || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        header: {
                          ...settingsForm.header!,
                          logoSubtitle: e.target.value
                        }
                      })}
                      placeholder="Pvt. Ltd."
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    Sub-Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.header?.tagline || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      header: {
                        ...settingsForm.header!,
                        tagline: e.target.value
                      }
                    })}
                    placeholder="Engineering & Supervision"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    Custom Image Logo URL (Optional - Replaces Default Icon)
                  </label>
                  <input
                    type="url"
                    value={settingsForm.header?.logoImageUrl || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      header: {
                        ...settingsForm.header!,
                        logoImageUrl: e.target.value
                      }
                    })}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                  {settingsForm.header?.logoImageUrl && (
                    <div className="mt-2 p-2 bg-slate-950 border border-slate-800 flex items-center gap-3">
                      <img 
                        src={settingsForm.header.logoImageUrl} 
                        alt="Logo preview" 
                        className="w-8 h-8 object-contain bg-white/10 p-1"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <span className="text-[11px] font-mono text-slate-400">Logo preview</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs">
                  Header CTA Action Button
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header?.enquireButtonText || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        header: {
                          ...settingsForm.header!,
                          enquireButtonText: e.target.value
                        }
                      })}
                      placeholder="ENQUIRE"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      CTA Button Target Link
                    </label>
                    <input
                      type="text"
                      value={settingsForm.header?.enquireButtonLink || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        header: {
                          ...settingsForm.header!,
                          enquireButtonLink: e.target.value
                        }
                      })}
                      placeholder="#contact"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none shadow transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Save className="w-4 h-4" /> Save Header Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB: FOOTER & CORPORATE INFO */}
          {activeTab === 'footer' && (
            <form onSubmit={handleSaveSettings} className="space-y-5">
              {settingsSaved && (
                <div className="p-3.5 bg-slate-800 border border-sky-500 text-sky-300 rounded-none flex items-center gap-2 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  Footer & Corporate details saved successfully!
                </div>
              )}

              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs flex items-center gap-2">
                  <PanelBottom className="w-4 h-4 text-sky-400" /> Footer Brand Statement
                </h3>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    About Consultancy Summary Description
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.footer?.aboutDescription || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      footer: {
                        ...settingsForm.footer!,
                        aboutDescription: e.target.value
                      }
                    })}
                    placeholder="omsconsults, Kathmandu, Nepal..."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    Govt. Registration & Accreditation Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.footer?.registrationText || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      footer: {
                        ...settingsForm.footer!,
                        registrationText: e.target.value
                      }
                    })}
                    placeholder="Govt. Regd. Engineering Consultancy Firm | Kathmandu, Nepal"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-4">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs">
                  Operational Details & Copyright
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      Emergency / Desk Hotline
                    </label>
                    <input
                      type="text"
                      value={settingsForm.footer?.emergencyHotline || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        footer: {
                          ...settingsForm.footer!,
                          emergencyHotline: e.target.value
                        }
                      })}
                      placeholder="9851124710"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      Office Operational Hours
                    </label>
                    <input
                      type="text"
                      value={settingsForm.footer?.officeHours || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        footer: {
                          ...settingsForm.footer!,
                          officeHours: e.target.value
                        }
                      })}
                      placeholder="Sunday - Friday: 9:00 AM - 6:00 PM"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    Copyright Attribution Line
                  </label>
                  <input
                    type="text"
                    value={settingsForm.footer?.copyrightText || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      footer: {
                        ...settingsForm.footer!,
                        copyrightText: e.target.value
                      }
                    })}
                    placeholder="© 2026 OMSCONSULTS. KATHMANDU, NEPAL. ALL RIGHTS RESERVED."
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none shadow transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Save className="w-4 h-4" /> Save Footer Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB: WHATSAPP INTEGRATION */}
          {activeTab === 'whatsapp' && (
            <form onSubmit={handleSaveSettings} className="space-y-5">
              {settingsSaved && (
                <div className="p-3.5 bg-slate-800 border border-sky-500 text-sky-300 rounded-none flex items-center gap-2 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  WhatsApp configuration saved successfully!
                </div>
              )}

              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white uppercase tracking-wider font-mono text-xs flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp Integration Settings
                  </h3>
                  <span className="px-2.5 py-0.5 bg-emerald-950 text-[#25D366] border border-[#25D366]/40 font-mono text-[10px] font-bold uppercase">
                    Direct API Format
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  When clients submit the enquiry form on your website, it creates a WhatsApp message formatted directly to your WhatsApp account:
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="waEnabled"
                    checked={settingsForm.whatsapp?.enabled !== false}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      whatsapp: {
                        ...settingsForm.whatsapp!,
                        enabled: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded-none accent-[#25D366] cursor-pointer"
                  />
                  <label htmlFor="waEnabled" className="text-xs text-slate-200 font-mono font-bold cursor-pointer">
                    Enable WhatsApp Forwarding & Floating Widget
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      WhatsApp Phone Number (with Country Code) *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsapp?.phoneNumber || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        whatsapp: {
                          ...settingsForm.whatsapp!,
                          phoneNumber: e.target.value
                        }
                      })}
                      placeholder="9779805671898"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs font-mono"
                    />
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">
                      Example: 9779805671898 (Nepal: 977 + 10-digit number, no + or spaces)
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                      Admin / Recipient Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp?.recipientName || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        whatsapp: {
                          ...settingsForm.whatsapp!,
                          recipientName: e.target.value
                        }
                      })}
                      placeholder="Bigyan"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono text-[11px]">
                    Custom Greeting Intro Line
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp?.customIntro || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      whatsapp: {
                        ...settingsForm.whatsapp!,
                        customIntro: e.target.value
                      }
                    })}
                    placeholder="Hello Bigyan!"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white text-xs"
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="autoOpenOnSubmit"
                    checked={settingsForm.whatsapp?.autoOpenOnSubmit !== false}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      whatsapp: {
                        ...settingsForm.whatsapp!,
                        autoOpenOnSubmit: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded-none accent-[#25D366] cursor-pointer"
                  />
                  <label htmlFor="autoOpenOnSubmit" className="text-xs text-slate-200 font-mono font-bold cursor-pointer">
                    Auto-Open WhatsApp Chat in new tab when visitor clicks submit
                  </label>
                </div>
              </div>

              {/* Sample Output Preview & Test Link */}
              <div className="bg-slate-950 p-5 rounded-none border border-slate-800 space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                    Live Formatted WhatsApp Link
                  </span>
                  <a
                    href={buildWhatsAppUrl(settingsForm.whatsapp, {
                      name: "Bigyan Neupane",
                      email: "bigyan1.sybazzar@gmail.com",
                      message: "cc"
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366] hover:bg-[#1EBE5D] text-slate-950 text-[11px] font-bold uppercase rounded-none transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Test Link Live
                  </a>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 text-[11px] text-slate-300 break-all select-all">
                  {buildWhatsAppUrl(settingsForm.whatsapp, {
                    name: "Bigyan Neupane",
                    email: "bigyan1.sybazzar@gmail.com",
                    message: "cc"
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none shadow transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Save className="w-4 h-4" /> Save WhatsApp Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SETTINGS & BRANDING */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              {settingsSaved && (
                <div className="p-3.5 bg-slate-800 border border-sky-500 text-sky-300 rounded-none flex items-center gap-2 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  Site settings successfully saved and updated!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono">Company Name</label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono">Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono">Primary Phone</label>
                  <input
                    type="text"
                    value={settingsForm.primaryPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, primaryPhone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono">Secondary Phone</label>
                  <input
                    type="text"
                    value={settingsForm.secondaryPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, secondaryPhone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1 font-mono">Official Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1 font-mono">Office Location Address</label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-bold text-white uppercase tracking-wider mb-3 font-mono">
                  Managing Director Executive Statement
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block font-bold text-slate-400 mb-1 font-mono">MD Full Name</label>
                    <input
                      type="text"
                      value={settingsForm.mdMessage?.name || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        mdMessage: { ...settingsForm.mdMessage, name: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-400 mb-1 font-mono">MD Designation</label>
                    <input
                      type="text"
                      value={settingsForm.mdMessage?.role || ''}
                      onChange={(e) => setSettingsForm({
                        ...settingsForm,
                        mdMessage: { ...settingsForm.mdMessage, role: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block font-bold text-slate-400 mb-1 font-mono">MD Photo Image URL (Optional Direct Link)</label>
                  <input
                    type="url"
                    value={settingsForm.mdMessage?.photo || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      mdMessage: { ...settingsForm.mdMessage, photo: e.target.value }
                    })}
                    placeholder="https://images.unsplash.com/... or photo link"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                  />
                  {settingsForm.mdMessage?.photo && (
                    <div className="mt-2 p-2 bg-slate-950 border border-slate-800 flex items-center gap-3">
                      <img
                        src={settingsForm.mdMessage.photo}
                        alt="MD Preview"
                        className="w-10 h-10 object-cover border border-slate-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <span className="text-[11px] font-mono text-slate-400">MD Photo Preview</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1 font-mono">MD Quote Statement</label>
                  <textarea
                    rows={2}
                    value={settingsForm.mdMessage?.quote || ''}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      mdMessage: { ...settingsForm.mdMessage, quote: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-none text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none shadow transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SLIDES */}
          {activeTab === 'slides' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                  Hero Slides ({siteData.heroSlides.length})
                </h3>
                <button
                  onClick={() => handleOpenEdit('slide', null, true)}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Slide
                </button>
              </div>

              <div className="space-y-3">
                {siteData.heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="p-4 bg-slate-800 rounded-none border border-slate-700 flex items-start gap-4">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-24 h-16 object-cover rounded-none shrink-0 bg-slate-950"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-900 text-sky-400 font-bold font-mono rounded-none text-[10px]">
                          SLIDE #{idx + 1}
                        </span>
                        {slide.badge && (
                          <span className="px-2 py-0.5 bg-slate-900 text-slate-300 font-mono rounded-none text-[10px]">
                            {slide.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-white mt-1 text-sm truncate uppercase font-['Cairo',sans-serif]">{slide.title}</h4>
                      <p className="text-slate-400 text-[11px] truncate mt-0.5">{slide.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEdit('slide', slide, false)}
                        className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow"
                        title="Edit Slide"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                  Manage Projects ({siteData.projects.length})
                </h3>
                <button
                  onClick={() => handleOpenEdit('project', null, true)}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="space-y-3">
                {siteData.projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-slate-800 rounded-none border border-slate-700 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-16 h-12 object-cover rounded-none shrink-0 bg-slate-950"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white truncate text-sm uppercase">{proj.title}</span>
                          {proj.capacity && (
                            <span className="px-2 py-0.5 bg-slate-900 text-sky-400 font-bold font-mono rounded-none text-[10px]">
                              {proj.capacity}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px] truncate font-mono mt-0.5">
                          {proj.category} • {proj.location || "Nepal"} • {proj.year || "2023"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEdit('project', proj, false)}
                        className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow font-bold"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TEAM */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                  Manage Faculty Members ({siteData.team.length})
                </h3>
                <button
                  onClick={() => handleOpenEdit('team', null, true)}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Member
                </button>
              </div>

              <div className="space-y-3">
                {siteData.team.map((mem) => (
                  <div key={mem.id} className="p-4 bg-slate-800 rounded-none border border-slate-700 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {mem.photo ? (
                        <img
                          src={mem.photo}
                          alt={mem.name}
                          className="w-12 h-12 object-cover rounded-none shrink-0 bg-slate-950 border border-slate-700"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-950 border border-slate-700 flex items-center justify-center text-sky-400 font-bold text-sm shrink-0">
                          {mem.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm uppercase truncate">{mem.name}</h4>
                        <p className="text-sky-400 text-xs font-mono truncate">{mem.title}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5 font-mono truncate">{mem.experience} • {mem.education}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEdit('team', mem, false)}
                        className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTeamMember(mem.id)}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                  Manage Services ({siteData.services.length})
                </h3>
                <button
                  onClick={() => handleOpenEdit('service', null, true)}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>

              <div className="space-y-3">
                {siteData.services.map((srv) => (
                  <div key={srv.id} className="p-4 bg-slate-800 rounded-none border border-slate-700 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm uppercase">{srv.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">{srv.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEdit('service', srv, false)}
                        className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteService(srv.id)}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SKILLS / EXPERTISE */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                Expertise Percentage Sliders
              </h3>
              <div className="space-y-4">
                {siteData.skills.map((skill) => (
                  <div key={skill.id} className="p-4 bg-slate-800 rounded-none border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = siteData.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s);
                          updateSkills(updated);
                        }}
                        className="bg-transparent font-bold text-white text-sm border-b border-transparent hover:border-slate-500 focus:border-sky-400 focus:outline-none uppercase"
                      />
                      <span className="font-mono font-bold text-sky-400 text-sm">
                        {skill.percentage}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={skill.percentage}
                      onChange={(e) => {
                        const updated = siteData.skills.map(s => s.id === skill.id ? { ...s, percentage: Number(e.target.value) } : s);
                        updateSkills(updated);
                      }}
                      className="w-full accent-sky-400 h-1.5 bg-slate-950 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                  Manage FAQs ({siteData.faqs.length})
                </h3>
                <button
                  onClick={() => handleOpenEdit('faq', null, true)}
                  className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold uppercase tracking-wider rounded-none flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {siteData.faqs.map((faq) => (
                  <div key={faq.id} className="p-4 bg-slate-800 rounded-none border border-slate-700 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase">{faq.question}</h4>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEdit('faq', faq, false)}
                        className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <h3 className="font-bold text-white uppercase tracking-wider font-mono">
                Project Inquiries ({inquiries.length})
              </h3>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center bg-slate-800/50 rounded-none border border-slate-700">
                  <MessageSquare className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400">No contact messages received yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-5 bg-slate-800 rounded-none border border-slate-700 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2">
                        <div>
                          <span className="font-bold text-white text-sm mr-2 font-mono">{inq.name || "Inquirer"}</span>
                          <span className="text-sky-400 font-mono text-[11px]">{inq.email}</span>
                          {inq.phone && (
                            <span className="text-slate-400 ml-2 font-mono text-[11px]">Tel: {inq.phone}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {inq.projectType && (
                            <span className="px-2 py-0.5 bg-slate-900 text-sky-400 font-mono font-bold rounded-none text-[10px]">
                              {inq.projectType}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(inq.date).toLocaleString()}
                          </span>
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1 bg-rose-600 hover:bg-rose-500 text-white rounded-none transition-colors"
                            title="Delete message"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {inq.subject && (
                        <p className="font-bold text-slate-200">{inq.subject}</p>
                      )}
                      <p className="text-slate-300 text-xs whitespace-pre-wrap bg-slate-950 p-3 rounded-none border border-slate-800 font-mono">
                        {inq.message}
                      </p>

                      <div className="flex justify-end pt-1">
                        <a
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Survey Pro Consultation')}`}
                          className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-none text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3 h-3" /> Reply by Email
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 10: RAW JSON DATA DIRECT EDITOR */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800 p-4 rounded-none border border-slate-700">
                <div>
                  <h3 className="font-bold text-white uppercase tracking-wider font-mono text-sm flex items-center gap-2">
                    <Code className="w-4 h-4 text-sky-400" />
                    Central Site Data JSON Editor
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Directly view, edit, or paste site data. All changes persist straight to <code className="text-sky-300 font-mono">/data/site-data.json</code>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(rawJsonText);
                        setRawJsonText(JSON.stringify(parsed, null, 2));
                        setJsonError(null);
                      } catch (e: any) {
                        setJsonError(`Cannot format: ${e.message}`);
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold uppercase rounded-none border border-slate-700"
                  >
                    Format JSON
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(rawJsonText);
                      alert("JSON copied to clipboard!");
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold uppercase rounded-none border border-slate-700"
                  >
                    Copy
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRawJsonText(JSON.stringify(siteData, null, 2));
                      setJsonError(null);
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold uppercase rounded-none border border-slate-700"
                  >
                    Reload
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        setJsonError(null);
                        const parsed = JSON.parse(rawJsonText);
                        if (!parsed || typeof parsed !== 'object') {
                          throw new Error('Invalid JSON structure: Root must be an object.');
                        }
                        if (!Array.isArray(parsed.projects) || !Array.isArray(parsed.team) || !Array.isArray(parsed.services)) {
                          throw new Error('Missing arrays: projects, team, and services must be arrays.');
                        }
                        await updateAllData(parsed);
                        setJsonSaveSuccess(true);
                        setTimeout(() => setJsonSaveSuccess(false), 4000);
                      } catch (err: any) {
                        setJsonError(err.message || 'Invalid JSON syntax');
                      }
                    }}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-none shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Direct JSON
                  </button>
                </div>
              </div>

              {jsonError && (
                <div className="p-3 bg-rose-950/80 border border-rose-600 text-rose-200 font-mono text-xs rounded-none">
                  <strong>JSON Syntax Error:</strong> {jsonError}
                </div>
              )}

              {jsonSaveSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 font-mono text-xs rounded-none flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <strong>Success:</strong> Raw JSON data successfully saved and synchronized with server storage!
                </div>
              )}

              <div className="relative">
                <textarea
                  rows={20}
                  value={rawJsonText}
                  onChange={(e) => {
                    setRawJsonText(e.target.value);
                    if (jsonError) setJsonError(null);
                  }}
                  spellCheck={false}
                  className="w-full p-4 bg-slate-950 text-sky-300 font-mono text-xs border border-slate-700 rounded-none focus:outline-none focus:border-sky-500 leading-relaxed font-mono resize-y"
                  placeholder="Paste or edit raw JSON here..."
                />
              </div>

              {/* Image URL Guide Cheatsheet */}
              <div className="bg-slate-800 p-5 rounded-none border border-slate-700 space-y-2 text-xs">
                <h4 className="font-bold text-sky-400 font-mono uppercase tracking-wider">
                  Image URL Quick Reference
                </h4>
                <p className="text-slate-300">
                  You can use direct HTTPS web links for all images in the JSON:
                </p>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-400">
                  <li><strong className="text-slate-200">Projects:</strong> <code className="text-sky-300">"image": "https://..."</code> in each item under <code className="text-sky-300">projects[]</code></li>
                  <li><strong className="text-slate-200">Team:</strong> <code className="text-sky-300">"photo": "https://..."</code> in each item under <code className="text-sky-300">team[]</code></li>
                  <li><strong className="text-slate-200">Hero Slides:</strong> <code className="text-sky-300">"image": "https://..."</code> in each item under <code className="text-sky-300">heroSlides[]</code></li>
                  <li><strong className="text-slate-200">Logo:</strong> <code className="text-sky-300">"logoImageUrl": "https://..."</code> under <code className="text-sky-300">settings.header</code></li>
                  <li><strong className="text-slate-200">MD Photo:</strong> <code className="text-sky-300">"photo": "https://..."</code> under <code className="text-sky-300">settings.mdMessage</code></li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 11: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              {/* Netlify & Live Cloud Database Information */}
              <div className="bg-sky-950/60 p-5 rounded-none border border-sky-600/70 space-y-2.5">
                <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  Live Cloud Database Connected (Netlify Ready)
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Your website is now connected to <strong>Cloud Firestore</strong>. When deployed on <strong>Netlify</strong>, custom domains, or local servers, all edits made here (projects, team members, contact inquiries, images, and settings) <strong>save and sync in real time across the entire world</strong> without needing to rebuild or push code!
                </p>
                <div className="bg-slate-950 p-3 rounded-none border border-sky-800/40 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-Time Cloud Persistence: Active & Synced globally</span>
                </div>
              </div>

              {/* Export JSON Backup */}
              <div className="bg-slate-800 p-6 rounded-none border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Download className="w-4 h-4 text-sky-400" />
                  Export / Download JSON
                </h4>
                <p className="text-slate-400 text-xs">
                  Download a snapshot of the current site dataset (projects, team, services, settings) for backup or Git repo synchronization.
                </p>
                <button
                  onClick={() => handleExportJSON('site-data.json')}
                  className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download site-data.json
                </button>
              </div>

              {/* Import JSON */}
              <div className="bg-slate-800 p-6 rounded-none border border-slate-700 space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  Import JSON File
                </h4>
                <p className="text-slate-400 text-xs">
                  Upload a previously saved <code className="text-sky-300 font-mono">site-data.json</code> file to restore or apply changes in bulk.
                </p>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Select & Upload JSON File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Reset to defaults */}
              <div className="bg-slate-800 p-6 rounded-none border border-rose-800/60 space-y-3">
                <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  Restore Template Defaults
                </h4>
                <p className="text-slate-300 text-xs">
                  Reset the website to the default engineering company template dataset.
                </p>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to reset all content to the default engineering company template?")) {
                      await resetDefaults();
                      alert("Restored defaults!");
                    }
                  }}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                >
                  Reset to Original Template
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Item Editor Modal */}
      <EditItemModal
        isOpen={editModal.open}
        type={editModal.type}
        item={editModal.item}
        isNew={editModal.isNew}
        onClose={() => setEditModal(prev => ({ ...prev, open: false }))}
        onSave={handleSaveItem}
      />
    </div>
  );
};
