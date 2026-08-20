import React from 'react';
import { useApp } from '../context/AppContext';
import { TeamMember } from '../types';
import { 
  UserCheck, 
  UserCog, 
  ShieldCheck, 
  Wrench, 
  Compass, 
  Plus, 
  Edit3, 
  Trash2, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  Linkedin,
  Award
} from 'lucide-react';

interface TeamSectionProps {
  onEditMember: (member: TeamMember) => void;
  onNewMember: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  onEditMember,
  onNewMember
}) => {
  const { siteData, editMode, deleteTeamMember } = useApp();
  const { team } = siteData;

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove team member "${name}"?`)) {
      await deleteTeamMember(id);
    }
  };

  const getMemberIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'usercog':
      case 'user-gear':
        return <UserCog className="w-6 h-6 text-sky-700" />;
      case 'usercheck':
      case 'user-tie':
        return <UserCheck className="w-6 h-6 text-sky-700" />;
      case 'shieldcheck':
      case 'user-shield':
        return <ShieldCheck className="w-6 h-6 text-sky-700" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-sky-700" />;
      case 'compass':
      case 'user-graduate':
        return <Compass className="w-6 h-6 text-sky-700" />;
      default:
        return <Award className="w-6 h-6 text-sky-700" />;
    }
  };

  return (
    <section id="team" className="py-20 sm:py-28 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-[2px] bg-sky-700"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase font-mono">
                Leadership & Staff
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 font-['Cairo',sans-serif] tracking-tight">
              Our Professional <span className="font-bold text-slate-900">Engineering Faculty</span>
            </h2>
            <p className="text-slate-600 text-sm mt-3 max-w-2xl leading-relaxed">
              Decades of specialized acumen in hydro-mechanical design, power systems, high-accuracy geomatics, and on-site construction supervision.
            </p>
          </div>

          {/* Admin Add Team Member Button */}
          {editMode && (
            <button
              onClick={onNewMember}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider rounded-none shadow-sm transition-all self-start md:self-auto"
            >
              <Plus className="w-4 h-4" /> Add Team Member
            </button>
          )}
        </div>

        {/* Team Grid - Geometric Balance Square Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200 border-l-4 border-l-sky-700 p-7 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative rounded-none"
            >
              {/* Admin Action Buttons */}
              {editMode && (
                <div className="absolute top-3 right-3 flex items-center gap-1 z-20">
                  <button
                    onClick={() => onEditMember(member)}
                    className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow text-xs font-bold"
                    title="Edit Member"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none shadow text-xs"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Header Icon / Avatar Container */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-sky-700 group-hover:text-white transition-colors duration-200 shrink-0 rounded-none">
                    <div className="group-hover:text-white transition-colors">
                      {getMemberIcon(member.icon)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Cairo',sans-serif] group-hover:text-sky-700 transition-colors uppercase tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-sky-700">
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Experience & Education Specs Box */}
                <div className="space-y-2 mb-5 bg-slate-50 p-3.5 border border-slate-200/80 font-mono text-xs rounded-none">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Briefcase className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                    <span>{member.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                    <span>{member.education}</span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Contact Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  CONSULTANT
                </span>
                <div className="flex items-center gap-2 text-slate-500">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1 hover:text-sky-700 hover:bg-slate-100 rounded-none transition-colors"
                      title={member.email}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="p-1 hover:text-sky-700 hover:bg-slate-100 rounded-none transition-colors"
                      title={member.phone}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:text-sky-700 hover:bg-slate-100 rounded-none transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
