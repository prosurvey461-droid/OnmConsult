import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export type EditModalType = 'project' | 'team' | 'service' | 'faq' | 'slide' | 'about';

interface EditItemModalProps {
  isOpen: boolean;
  type: EditModalType;
  item: any | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (data: any, isNew: boolean) => Promise<void>;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  type,
  item,
  isNew,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    } else {
      // Default templates based on type
      if (type === 'project') {
        setFormData({
          title: '',
          capacity: '10 MW',
          category: 'Hydropower',
          description: '',
          details: '',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800',
          client: '',
          year: '2024',
          location: 'Nepal',
          status: 'Completed'
        });
      } else if (type === 'team') {
        setFormData({
          name: '',
          title: 'Senior Engineer',
          experience: '5+ Years Experience',
          education: 'Masters in Engineering',
          description: '',
          icon: 'UserCog',
          photo: '',
          email: '',
          phone: '',
          linkedin: ''
        });
      } else if (type === 'service') {
        setFormData({
          title: '',
          description: '',
          icon: 'Compass',
          details: ['Pre-feasibility & Desk study', 'Field survey & hydrology modeling', 'Final design validation'],
          deliverables: 'Detailed Project Report (DPR)'
        });
      } else if (type === 'faq') {
        setFormData({
          question: '',
          answer: '',
          category: 'Engineering Services'
        });
      } else if (type === 'slide') {
        setFormData({
          title: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1600',
          badge: 'Engineering Excellence'
        });
      } else if (type === 'about') {
        setFormData({
          title: '',
          description: '',
          icon: 'Target',
          linkText: 'Explore Scope',
          linkHref: '#services'
        });
      }
    }
  }, [item, type, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData, isNew);
    setSaving(false);
    onClose();
  };

  const getTitle = () => {
    const action = isNew ? 'Add New' : 'Edit';
    switch (type) {
      case 'project': return `${action} Project Dossier`;
      case 'team': return `${action} Team Member`;
      case 'service': return `${action} Technical Service`;
      case 'faq': return `${action} FAQ Entry`;
      case 'slide': return `${action} Hero Slide`;
      case 'about': return `${action} About Pillar`;
      default: return `${action} Entry`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-none max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 border-l-4 border-l-sky-700 animate-in fade-in duration-150 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-none transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-widest block mb-1">
          CONTENT MANAGEMENT MODAL
        </span>
        <h3 className="text-xl font-bold text-slate-900 font-['Cairo',sans-serif] uppercase tracking-tight mb-6">
          {getTitle()}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Project Form Fields */}
          {type === 'project' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Pikhuwa Khola Hydropower"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Capacity (MW / kWp)
                  </label>
                  <input
                    type="text"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="e.g. 15 MW"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Hydropower'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                  >
                    <option value="Hydropower">Hydropower</option>
                    <option value="Solar">Solar</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Detailed Technical Scope & Deliverables
                </label>
                <textarea
                  rows={3}
                  value={formData.details || ''}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client || ''}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Team Member Form Fields */}
          {type === 'team' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ashok Bista"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Job Title / Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Senior Mechanical Engineer"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="10+ Years Experience"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Education / Degrees
                  </label>
                  <input
                    type="text"
                    value={formData.education || ''}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="Masters in Mechanical Engineering"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Professional Bio / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Service Form Fields */}
          {type === 'service' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Key Scope Points (One per line)
                </label>
                <textarea
                  rows={4}
                  value={Array.isArray(formData.details) ? formData.details.join('\n') : (formData.details || '')}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>
            </>
          )}

          {/* FAQ Form Fields */}
          {type === 'faq' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={formData.question || ''}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer || ''}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category || 'General'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                />
              </div>
            </>
          )}

          {/* Hero Slide Form Fields */}
          {type === 'slide' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>
            </>
          )}

          {/* About Card Form Fields */}
          {type === 'about' && (
            <>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Pillar Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-sky-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={formData.linkText || ''}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 font-mono">
                    Link Target
                  </label>
                  <input
                    type="text"
                    value={formData.linkHref || ''}
                    onChange={(e) => setFormData({ ...formData, linkHref: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-none"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
