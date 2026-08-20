import React from 'react';
import { useApp } from '../context/AppContext';
import { AboutCard } from '../types';
import { 
  CheckCircle2, 
  Target, 
  Lightbulb, 
  Zap, 
  Award, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Edit3, 
  Trash2,
  FileCheck,
  Quote
} from 'lucide-react';

interface AboutSectionProps {
  onEditCard: (card: AboutCard) => void;
  onNewCard: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onEditCard,
  onNewCard
}) => {
  const { siteData, editMode, setAdminActiveTab, setAdminDrawerOpen, deleteAboutCard } = useApp();
  const { settings, aboutCards } = siteData;

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete card "${title}"?`)) {
      await deleteAboutCard(id);
    }
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'target':
      case 'crosshair':
        return <Target className="w-6 h-6 text-sky-700" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-sky-700" />;
      case 'zap':
      case 'bolt':
        return <Zap className="w-6 h-6 text-sky-700" />;
      case 'shieldcheck':
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-sky-700" />;
      case 'award':
        return <Award className="w-6 h-6 text-sky-700" />;
      default:
        return <Layers className="w-6 h-6 text-sky-700" />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-sky-700"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase font-mono">
                Corporate Profile
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 font-['Cairo',sans-serif] tracking-tight">
              Engineering Precision & <span className="font-bold text-slate-900">Sustainable Infrastructure</span>
            </h2>
            <p className="text-slate-600 text-sm mt-3 max-w-2xl leading-relaxed">
              Established in {settings.establishedYear || "2021"} in Kathmandu, Nepal, {settings.companyName || "omsconsults"} provides complete consulting engineering, pre-feasibility, detailed design, hydraulic studies, and construction supervision.
            </p>
          </div>

          {/* Admin Add Card Button */}
          {editMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={onNewCard}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider rounded-none shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" /> Add Card
              </button>
            </div>
          )}
        </div>

        {/* 4 Pillars Grid - Geometric Balance Square Cards with Left Accent Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutCards.map((card, idx) => (
            <div
              key={card.id}
              className="bg-white p-7 border border-slate-200 border-l-4 border-l-sky-700 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative rounded-none"
            >
              {/* Admin Edit Controls */}
              {editMode && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
                  <button
                    onClick={() => onEditCard(card)}
                    className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow text-xs font-bold"
                    title="Edit Card"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id, card.title)}
                    className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow text-xs"
                    title="Delete Card"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Geometric Icon Box */}
                <div className="w-12 h-12 bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-sky-700 group-hover:text-white transition-colors duration-200 rounded-none">
                  {getCardIcon(card.icon)}
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  0{idx + 1} / PILLAR
                </span>

                <h3 className="text-lg font-bold text-slate-900 font-['Cairo',sans-serif] mb-3 group-hover:text-sky-700 transition-colors uppercase tracking-tight">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {card.linkHref && (
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={card.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  >
                    {card.linkText || "Learn More"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Executive Managing Director Statement - Geometric Balance Callout */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 border-l-4 border-sky-600 shadow-md rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-sky-500"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-sky-400 uppercase font-mono">
                  Managing Director Executive Statement
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-light">
                "{settings.mdMessage?.quote || `At ${settings.companyName || "omsconsults"}, our core philosophy is simple: engineering excellence built upon rigorous physics, transparent methodology, and strict fidelity to construction timelines and cost baselines.`}"
              </blockquote>

              <div className="pt-2 flex items-center gap-4">
                {settings.mdMessage?.photo && (
                  <img
                    src={settings.mdMessage.photo}
                    alt={settings.mdMessage?.name || "Managing Director"}
                    className="w-12 h-12 rounded-none object-cover border border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <p className="text-sm font-bold text-white font-['Cairo',sans-serif] uppercase tracking-wider">
                    {settings.mdMessage?.name || "Managing Director"}
                  </p>
                  <p className="text-xs text-sky-400 font-mono">
                    {settings.mdMessage?.role || settings.companyName || "omsconsults"}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-3 bg-slate-800/80 p-6 border border-slate-700 rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                Corporate Credentials
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Licensed by Nepal Engineering Council</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>FIDIC Contract Supervision Standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>ISO 9001:2015 Quality Guidelines</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
