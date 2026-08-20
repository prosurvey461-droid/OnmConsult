import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AdminBar } from './components/AdminBar';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TeamSection } from './components/TeamSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { FaqsSection } from './components/FaqsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ProjectModal } from './components/ProjectModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminControlDrawer } from './components/AdminControlDrawer';
import { EditItemModal, EditModalType } from './components/EditItemModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Project } from './types';

export function App() {
  const { 
    loading, 
    siteData, 
    auth,
    setLoginModalOpen,
    setAdminDrawerOpen,
    saveProject, 
    saveTeamMember, 
    saveService, 
    saveFaq, 
    updateSlides, 
    updateAboutCards 
  } = useApp();

  // Listen for /admin URL route or #admin hash
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      
      if (path.includes('/admin') || hash === '#admin' || hash === '#/admin') {
        if (auth.isAuthenticated) {
          setAdminDrawerOpen(true);
        } else {
          setLoginModalOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [auth.isAuthenticated, setLoginModalOpen, setAdminDrawerOpen]);

  // Selected project for detailed view modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Unified item editing modal state for on-page quick edits
  const [editModalState, setEditModalState] = useState<{
    open: boolean;
    type: EditModalType;
    item: any;
    isNew: boolean;
  }>({
    open: false,
    type: 'project',
    item: null,
    isNew: false
  });

  const openEditor = (type: EditModalType, item: any = null, isNew = false) => {
    setEditModalState({
      open: true,
      type,
      item,
      isNew
    });
  };

  const handleSaveItem = async (data: any, isNew: boolean) => {
    switch (editModalState.type) {
      case 'project':
        await saveProject(data, isNew);
        break;
      case 'team':
        await saveTeamMember(data, isNew);
        break;
      case 'service':
        await saveService(data, isNew);
        break;
      case 'faq':
        await saveFaq(data, isNew);
        break;
      case 'slide':
        if (isNew) {
          await updateSlides([...siteData.heroSlides, { ...data, id: `slide-${Date.now()}` }]);
        } else {
          await updateSlides(siteData.heroSlides.map(s => s.id === data.id ? data : s));
        }
        break;
      case 'about':
        if (isNew) {
          await updateAboutCards([...siteData.aboutCards, { ...data, id: `about-${Date.now()}` }]);
        } else {
          await updateAboutCards(siteData.aboutCards.map(c => c.id === data.id ? data : c));
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold tracking-widest uppercase font-mono text-cyan-400">
          Loading Survey Pro Pvt. Ltd...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Sticky Admin Toolbar when Admin is signed in */}
      <AdminBar />

      {/* Main Corporate Navigation Header */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Carousel Slider */}
        <HeroSlider
          onEditSlide={(slide) => openEditor('slide', slide, false)}
          onNewSlide={() => openEditor('slide', null, true)}
        />

        {/* 2. About Us & Company Capabilities Section */}
        <AboutSection
          onEditCard={(card) => openEditor('about', card, false)}
          onNewCard={() => openEditor('about', null, true)}
        />

        {/* 3. Projects Showcase Portfolio */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onEditProject={(project) => openEditor('project', project, false)}
          onNewProject={() => openEditor('project', null, true)}
        />

        {/* 4. Our Leadership & Engineering Team */}
        <TeamSection
          onEditMember={(member) => openEditor('team', member, false)}
          onNewMember={() => openEditor('team', null, true)}
        />

        {/* 5. Professional Consulting Services & Scopes */}
        <ServicesSection
          onEditService={(service) => openEditor('service', service, false)}
          onNewService={() => openEditor('service', null, true)}
        />

        {/* 6. Technical Competencies & Expertise % */}
        <SkillsSection />

        {/* 7. Frequently Asked Questions */}
        <FaqsSection
          onEditFaq={(faq) => openEditor('faq', faq, false)}
          onNewFaq={() => openEditor('faq', null, true)}
        />

        {/* 8. Contact, Quote & Leads Form */}
        <ContactSection />
      </main>

      {/* Corporate Footer with Quick Navigation & Socials */}
      <Footer />

      {/* Scroll to Top Floating Action Button */}
      <ScrollToTop />

      {/* Floating Direct WhatsApp Support Widget */}
      <WhatsAppWidget />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Authentication Login Modal */}
      <AdminLoginModal />

      {/* Admin CMS Slide-over Management Drawer */}
      <AdminControlDrawer />

      {/* Quick Visual Edit Modal */}
      <EditItemModal
        isOpen={editModalState.open}
        type={editModalState.type}
        item={editModalState.item}
        isNew={editModalState.isNew}
        onClose={() => setEditModalState(prev => ({ ...prev, open: false }))}
        onSave={handleSaveItem}
      />
    </div>
  );
}

export default App;
