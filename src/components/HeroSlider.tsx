import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HeroSlide } from '../types';
import { ChevronLeft, ChevronRight, Edit2, ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  onEditSlide: (slide: HeroSlide) => void;
  onNewSlide: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onEditSlide, onNewSlide }) => {
  const { siteData, editMode, setAdminActiveTab, setAdminDrawerOpen } = useApp();
  const slides = siteData.heroSlides || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  if (!slides.length) return null;

  const current = slides[currentSlide] || slides[0];

  return (
    <section 
      className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="home"
    >
      {/* Background Subtle Geometric Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Slide Edit Trigger (Admin Only) */}
      {editMode && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
          <button
            onClick={() => onEditSlide(current)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-none shadow"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit Current Slide
          </button>
          <button
            onClick={() => {
              setAdminActiveTab('slides');
              setAdminDrawerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-none shadow"
          >
            All Slides ({slides.length})
          </button>
        </div>
      )}

      {/* Main Hero Container - Geometric Balance Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Hero Typography & Key Metrics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              {/* Geometric Dash Line + Tracked Uppercase Badge */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-12 h-[2px] bg-sky-500"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-sky-400 uppercase font-mono">
                  {current.badge || "Engineering Excellence"}
                </span>
              </div>

              {/* High-Contrast Light + Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 text-slate-100 font-['Cairo',sans-serif]">
                {current.title.includes(" ") ? (
                  <>
                    {current.title.substring(0, current.title.lastIndexOf(" "))}{" "}
                    <span className="font-black block text-white">
                      {current.title.substring(current.title.lastIndexOf(" ") + 1)}
                    </span>
                  </>
                ) : (
                  <span className="font-black block">{current.title}</span>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Action Buttons with Geometric Balance Style */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#projects"
                  className="px-6 py-3.5 text-xs font-bold bg-sky-700 text-white rounded-none hover:bg-sky-800 uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                >
                  EXPLORE PROJECTS
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 text-xs font-bold border border-slate-600 text-slate-200 rounded-none hover:bg-slate-800 uppercase tracking-widest transition-colors"
                >
                  REQUEST CONSULTATION
                </a>
              </div>
            </div>

            {/* Geometric Balance Stat Metric Cards (Left Border Accent) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-slate-800">
              <div className="p-5 sm:p-6 bg-slate-800/90 border-l-4 border-sky-600 shadow-sm rounded-none">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-mono">
                  {siteData.settings.stats?.totalCapacityMW || "112.5"} <span className="text-sm font-medium text-sky-400">MW</span>
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Managed Capacity
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-slate-800/90 border-l-4 border-slate-600 shadow-sm rounded-none">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-mono">
                  {siteData.settings.stats?.projectsCompleted || "130"}+
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Institutional Projects
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Stage & Active Projects Status (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Visual Image Stage with Precise Architectural Frame */}
            <div className="relative bg-slate-800 border border-slate-700 overflow-hidden shadow-2xl rounded-none flex-grow min-h-[300px] sm:min-h-[360px]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-slate-900/90 text-sky-400 text-[11px] font-mono font-bold uppercase tracking-wider border border-slate-700">
                  KATHMANDU, NEPAL
                </span>
              </div>

              {/* Slider Prev/Next Overlays */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1 z-20">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="p-2.5 bg-slate-950/80 hover:bg-sky-700 text-white rounded-none border border-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="p-2.5 bg-slate-950/80 hover:bg-sky-700 text-white rounded-none border border-slate-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Projects Banner - Geometric Balance Reference Component */}
            <div className="bg-slate-800 border border-slate-700 text-white p-6 flex items-center justify-between border-l-4 border-sky-500 rounded-none">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-1 font-mono">
                  Slide Stage
                </h4>
                <p className="text-sm text-slate-200 font-semibold truncate max-w-xs">
                  {current.title}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-light text-slate-400">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Architectural Precision Bar */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-6">
            <span>REGISTRATION: <strong>GOV NEPAL #2021-ENG</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">STANDARDS: <strong>FIDIC & NEA COMPLIANT</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span>ENGINEERING RATIO:</span>
            <span className="text-sky-400 font-bold">100% TECHNICAL PRECISION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
