import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Edit3, 
  Eye, 
  Settings, 
  LogOut, 
  RotateCcw, 
  MessageSquare
} from 'lucide-react';

export const AdminBar: React.FC = () => {
  const { 
    auth, 
    editMode, 
    setEditMode, 
    setAdminDrawerOpen, 
    setAdminActiveTab, 
    logout, 
    unreadInquiriesCount, 
    resetDefaults 
  } = useApp();

  if (!auth.isAuthenticated) return null;

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all content back to the default template? Any unsaved custom modifications will be overwritten.")) {
      await resetDefaults();
    }
  };

  return (
    <aside aria-label="Admin Control Bar" className="sticky top-[101px] sm:top-[105px] z-30 bg-slate-900 text-white px-4 py-2 border-b-2 border-sky-700 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Status & Identity - Geometric Precision */}
        <div className="flex items-center gap-2.5 flex-wrap font-mono">
          <div className="flex items-center gap-1.5 bg-slate-800 text-sky-400 px-3 py-1 border-l-2 border-sky-500 font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            ADMIN: {auth.user?.email || "admin@thimiguys.com"}
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none font-bold uppercase tracking-wider text-[11px] transition-all ${
              editMode 
                ? 'bg-sky-700 hover:bg-sky-800 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Toggle interactive on-page edit badges on every section"
          >
            {editMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {editMode ? "EDIT MODE: ACTIVE" : "EDIT MODE: OFF"}
          </button>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setAdminActiveTab('inquiries');
              setAdminDrawerOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-none transition-colors border border-slate-700 font-bold uppercase tracking-wider text-[11px]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
            Inquiries
            {unreadInquiriesCount > 0 && (
              <span className="bg-sky-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2">
                {unreadInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setAdminActiveTab('overview');
              setAdminDrawerOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-none uppercase tracking-wider text-[11px] transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            CMS Dashboard
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-white rounded-none transition-colors border border-slate-700 text-[11px] uppercase tracking-wider"
            title="Reset site content to default template"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-bold rounded-none uppercase tracking-wider text-[11px] transition-colors border border-slate-700 hover:border-rose-600"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
