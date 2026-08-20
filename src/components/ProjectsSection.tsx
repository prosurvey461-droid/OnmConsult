import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { 
  Zap, 
  Sun, 
  Droplets, 
  Layers, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2,
  Search,
  ArrowRight
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onNewProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onEditProject,
  onNewProject
}) => {
  const { siteData, editMode, deleteProject } = useApp();
  const { projects } = siteData;
  const [filter, setFilter] = useState<'All' | 'Hydropower' | 'Solar' | 'Irrigation' | 'Consulting'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hydropower', 'Solar', 'Irrigation', 'Consulting'] as const;

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'All' || project.category === filter;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete project "${title}"?`)) {
      await deleteProject(id);
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-sky-700"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase font-mono">
                Institutional Portfolio
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 font-['Cairo',sans-serif] tracking-tight">
              Featured Hydropower & <span className="font-bold text-slate-900">Infrastructure Works</span>
            </h2>
            <p className="text-slate-600 text-sm mt-3 max-w-2xl leading-relaxed">
              Explore our track record across 112+ MW of hydroelectric plants, institutional solar systems, and feasibility surveying assignments in Nepal.
            </p>
          </div>

          {/* Admin Add Project Button */}
          {editMode && (
            <button
              onClick={onNewProject}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider rounded-none shadow-sm transition-all self-start md:self-auto"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          )}
        </div>

        {/* Filter Controls & Search Bar - Geometric Balance Style */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          {/* Category Filter Pills (Square geometric tabs) */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-none ${
                  filter === cat
                    ? 'bg-sky-700 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700 rounded-none"
            />
          </div>
        </div>

        {/* Projects Grid - Geometric Balance Square Cards */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 p-8 rounded-none">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-bold text-sm">No projects found matching your criteria.</p>
            <button
              onClick={() => { setFilter('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-sky-700 hover:underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-white border border-slate-200 border-l-4 border-l-sky-700 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group cursor-pointer relative rounded-none"
              >
                {/* Admin Quick Edit / Delete Buttons */}
                {editMode && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 z-20" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => { e.stopPropagation(); onEditProject(project); }}
                      className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow text-xs font-bold"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, project.id, project.title)}
                      className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow text-xs"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div>
                  {/* Image Container with Top Tag */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Category & Capacity Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-sky-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {project.capacity && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 bg-slate-950/90 text-sky-400 text-[11px] font-mono font-bold uppercase tracking-wider border border-slate-700">
                          {project.capacity}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 font-['Cairo',sans-serif] group-hover:text-sky-700 transition-colors uppercase tracking-tight mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono pt-3 border-t border-slate-100">
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-700" />
                          {project.location}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sky-700" />
                          {project.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700 group-hover:text-sky-800 flex items-center gap-1.5">
                    TECHNICAL SCOPE
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    DETAIL VIEW
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
