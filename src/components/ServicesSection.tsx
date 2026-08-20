import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service } from '../types';
import { 
  Compass, 
  HardHat, 
  FileText, 
  Search, 
  Cpu, 
  Wrench, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';

interface ServicesSectionProps {
  onEditService: (service: Service) => void;
  onNewService: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onEditService,
  onNewService
}) => {
  const { siteData, editMode, deleteService } = useApp();
  const { services } = siteData;
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete service "${title}"?`)) {
      await deleteService(id);
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'compass':
      case 'drafting-compass':
        return <Compass className="w-6 h-6 text-sky-700" />;
      case 'hardhat':
      case 'helmet-safety':
        return <HardHat className="w-6 h-6 text-sky-700" />;
      case 'filetext':
      case 'file-contract':
        return <FileText className="w-6 h-6 text-sky-700" />;
      case 'search':
      case 'magnifying-glass-chart':
        return <Search className="w-6 h-6 text-sky-700" />;
      case 'cpu':
      case 'gears':
        return <Cpu className="w-6 h-6 text-sky-700" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-sky-700" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-700" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-sky-700"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase font-mono">
                Consulting Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 font-['Cairo',sans-serif] tracking-tight">
              Comprehensive Technical <span className="font-bold text-slate-900">Engineering Solutions</span>
            </h2>
            <p className="text-slate-600 text-sm mt-3 max-w-2xl leading-relaxed">
              From topographical surveys and hydraulic modeling to FIDIC contract administration, design reviews, and quality supervision.
            </p>
          </div>

          {/* Admin Add Service Button */}
          {editMode && (
            <button
              onClick={onNewService}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider rounded-none shadow-sm transition-all self-start md:self-auto"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          )}
        </div>

        {/* Services Grid - Geometric Balance Square Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white border border-slate-200 border-l-4 border-l-sky-700 p-7 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer relative rounded-none"
            >
              {/* Admin Action Buttons */}
              {editMode && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEditService(service); }}
                    className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow text-xs font-bold"
                    title="Edit Service"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(service.id, service.title); }}
                    className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow text-xs"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Service Icon Box */}
                <div className="w-14 h-14 bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-sky-700 group-hover:text-white transition-colors duration-200 rounded-none">
                  <div className="group-hover:text-white transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  0{idx + 1} / SERVICE
                </span>

                <h3 className="text-lg font-bold text-slate-900 font-['Cairo',sans-serif] mb-3 group-hover:text-sky-700 transition-colors uppercase tracking-tight">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Bullet List */}
                {service.details && service.details.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.details.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 bg-sky-700 shrink-0"></span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 group-hover:text-sky-800 flex items-center gap-1.5">
                  SCOPE DETAILS
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  EXPLORE
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Scope Modal - Geometric Balance Theme */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 border-l-4 border-l-sky-700 animate-in fade-in duration-150 relative rounded-none">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-none transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-200 flex items-center justify-center rounded-none shrink-0">
                {getServiceIcon(selectedService.icon)}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-700">
                  ENGINEERING SCOPE
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-['Cairo',sans-serif] uppercase tracking-tight">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="space-y-3 mb-6 bg-slate-50 p-5 border border-slate-200 rounded-none">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
                Key Technical Activities:
              </h4>
              <ul className="space-y-2">
                {selectedService.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedService.deliverables && (
              <div className="mb-6 text-xs text-slate-600">
                <strong className="text-slate-900 font-mono">Deliverables: </strong>
                {selectedService.deliverables}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-none hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold uppercase tracking-wider rounded-none shadow-sm transition-colors"
              >
                Request Quotation
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
