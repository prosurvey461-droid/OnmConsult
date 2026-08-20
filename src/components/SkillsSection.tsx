import React from 'react';
import { useApp } from '../context/AppContext';
import { Edit2, ShieldCheck } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { siteData, editMode, setAdminActiveTab, setAdminDrawerOpen, updateSkills } = useApp();
  const { skills } = siteData;

  const handlePercentageChange = (id: string, newPercentage: number) => {
    const updated = skills.map(s => s.id === id ? { ...s, percentage: newPercentage } : s);
    updateSkills(updated);
  };

  return (
    <section id="our-skills" className="py-20 sm:py-28 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-sky-500"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-sky-400 uppercase font-mono">
                Technical Competencies
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-100 font-['Cairo',sans-serif] tracking-tight">
              Engineering Proficiency & <span className="font-bold text-white">Calculated Precision</span>
            </h2>
            <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed">
              Tested field execution and analytical rigor across structural analysis, power electrical substations, hydraulic transients, and geomatics surveying.
            </p>
          </div>

          {editMode && (
            <button
              onClick={() => {
                setAdminActiveTab('skills');
                setAdminDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-none shadow self-start md:self-auto"
            >
              <Edit2 className="w-3.5 h-3.5" /> Adjust Percentages
            </button>
          )}
        </div>

        {/* Skills Progress Bars Grid - Geometric Balance Flat Minimalist Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Progress Bars Block (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 border-l-4 border-l-sky-600 p-8 shadow-sm rounded-none space-y-7">
            {skills.map((skill, idx) => (
              <div key={skill.id} className="space-y-2.5">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider font-mono">
                  <span className="text-slate-200">
                    0{idx + 1}. {skill.name}
                  </span>
                  <span className="text-sky-400">{skill.percentage}%</span>
                </div>

                {/* Flat Architectural Progress Bar */}
                <div className="h-1.5 bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-sky-600 transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
                  />
                </div>

                {skill.description && (
                  <p className="text-[11px] text-slate-400 font-normal leading-normal">
                    {skill.description}
                  </p>
                )}

                {/* Admin direct slider */}
                {editMode && (
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">Slider:</span>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={skill.percentage}
                      onChange={(e) => handlePercentageChange(skill.id, Number(e.target.value))}
                      className="w-full accent-amber-400 h-1.5 bg-slate-700 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Software & Standards Box (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 p-8 rounded-none space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-['Cairo',sans-serif]">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              Software & Simulation Standards
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our engineering team deploys computational modeling tools including ANSYS for FEA, AutoCAD Civil 3D, HEC-RAS 2D hydraulics, PVsyst solar yield simulations, and DGPS geospatial processing.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-3.5 border border-slate-700/80 rounded-none">
                <p className="font-bold text-sky-400 uppercase">ANSYS & CFD</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Turbine & penstock FEA</p>
              </div>
              <div className="bg-slate-900 p-3.5 border border-slate-700/80 rounded-none">
                <p className="font-bold text-sky-400 uppercase">PVsyst 7</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Solar PV yield modeling</p>
              </div>
              <div className="bg-slate-900 p-3.5 border border-slate-700/80 rounded-none">
                <p className="font-bold text-sky-400 uppercase">HEC-RAS 2D</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Hydrological flood maps</p>
              </div>
              <div className="bg-slate-900 p-3.5 border border-slate-700/80 rounded-none">
                <p className="font-bold text-sky-400 uppercase">FIDIC MDB</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Pink/Red Book supervision</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-700 text-slate-400 text-xs font-mono">
              <span className="text-sky-400 font-bold">TOTAL VERIFIED OUTPUT:</span> 100% QA Inspection standard on every concrete pour and weld.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
