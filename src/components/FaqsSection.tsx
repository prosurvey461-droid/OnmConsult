import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQ } from '../types';
import { ChevronDown, Plus, Edit3, Trash2 } from 'lucide-react';

interface FaqsSectionProps {
  onEditFaq: (faq: FAQ) => void;
  onNewFaq: () => void;
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({
  onEditFaq,
  onNewFaq
}) => {
  const { siteData, editMode, deleteFaq } = useApp();
  const { faqs } = siteData;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      await deleteFaq(id);
    }
  };

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Geometric Balance Style */}
        <div className="text-center mb-16 relative">
          {editMode && (
            <button
              onClick={onNewFaq}
              className="absolute -top-6 right-0 flex items-center gap-1.5 px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold uppercase tracking-wider rounded-none shadow"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          )}

          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-sky-700"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase font-mono">
              Technical Clarity
            </span>
            <span className="w-8 h-[2px] bg-sky-700"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-light text-slate-800 font-['Cairo',sans-serif] tracking-tight">
            Frequently Asked <span className="font-bold text-slate-900">Engineering Questions</span>
          </h2>
          <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Methodologies, design codes, construction quality control, and tender document protocols followed by Survey Pro Pvt. Ltd.
          </p>
        </div>

        {/* FAQs Accordion - Geometric Balance Sharp Edge Style */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border transition-all duration-150 rounded-none ${
                  isOpen
                    ? 'bg-slate-50 border-slate-300 border-l-4 border-l-sky-700 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  onClick={() => toggleFaq(faq.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-sky-700">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 font-['Cairo',sans-serif] text-left uppercase tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {editMode && (
                      <div className="flex items-center gap-1 mr-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onEditFaq(faq)}
                          className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none text-xs shadow"
                          title="Edit FAQ"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, faq.id)}
                          className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-none text-xs shadow"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className={`p-1 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-700' : 'text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                    <p className="mt-2">{faq.answer}</p>
                    {faq.category && (
                      <span className="inline-block mt-3 px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {faq.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
