import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, X, ExternalLink } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const { siteData } = useApp();
  const whatsappConfig = siteData.settings.whatsapp;
  const [openPopup, setOpenPopup] = useState(false);

  if (whatsappConfig && whatsappConfig.enabled === false) {
    return null;
  }

  const phone = whatsappConfig?.phoneNumber || '9779805671898';
  const recipient = whatsappConfig?.recipientName || 'Bigyan';

  const defaultUrl = buildWhatsAppUrl(whatsappConfig, {
    message: `Hello, I would like to enquire about ${siteData.settings.companyName || 'omsconsults'} engineering consulting services.`
  });

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-sans">
      {/* Floating Popup Card */}
      {openPopup && (
        <div className="mb-3 bg-white border border-slate-200 shadow-2xl p-4 w-72 sm:w-80 rounded-none border-l-4 border-l-[#25D366] animate-in fade-in slide-in-from-bottom duration-150">
          <div className="flex items-start justify-between pb-2 border-b border-slate-100">
            <div>
              <p className="text-[10px] font-mono font-bold text-[#25D366] uppercase tracking-wider">
                Direct WhatsApp Hotline
              </p>
              <h4 className="text-xs font-bold text-slate-900 uppercase">
                Chat with {recipient}
              </h4>
            </div>
            <button
              onClick={() => setOpenPopup(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-600 my-3 leading-relaxed">
            Need immediate assistance for engineering design, hydropower estimation, or feasibility discussion?
          </p>

          <a
            href={defaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Chat Now (+{phone})
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <button
        onClick={() => setOpenPopup(!openPopup)}
        className="group flex items-center gap-2 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-none shadow-lg transition-all hover:scale-105"
        aria-label="Contact via WhatsApp"
        title="WhatsApp Support Hotline"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold font-mono tracking-wider uppercase hidden sm:inline-block">
          WhatsApp Support
        </span>
      </button>
    </div>
  );
};
