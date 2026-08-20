import React from 'react';
import { Project } from '../types';
import { 
  X, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-none max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 border-l-4 border-l-sky-700 animate-in fade-in duration-150 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-950/70 hover:bg-slate-950 text-white rounded-none transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-white">
            <span className="px-3 py-1 bg-sky-700 rounded-none text-xs font-mono font-bold uppercase tracking-wider shadow">
              {project.category}
            </span>
            {project.capacity && (
              <span className="px-3 py-1 bg-slate-950/90 rounded-none text-xs font-mono font-bold text-sky-400 border border-slate-700">
                CAPACITY: {project.capacity}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-widest block mb-1">
              TECHNICAL DOSSIER
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-['Cairo',sans-serif] uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Details Specs */}
          {project.details && (
            <div className="bg-slate-50 rounded-none p-5 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-1.5 font-mono">
                <Layers className="w-4 h-4 text-sky-700" />
                Technical Scope & Deliverables
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.details}
              </p>
            </div>
          )}

          {/* Key metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-slate-50 p-3 rounded-none border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Client</span>
              <p className="font-bold text-slate-800 truncate mt-0.5">{project.client || "Institutional Client"}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-none border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
              <p className="font-bold text-slate-800 truncate mt-0.5">{project.location || "Nepal"}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-none border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Year</span>
              <p className="font-bold text-slate-800 mt-0.5">{project.year || "2023"}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-none border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
              <p className="font-bold text-sky-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                {project.status || "Completed"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-none transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-colors inline-flex items-center gap-2"
            >
              Consult On Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
