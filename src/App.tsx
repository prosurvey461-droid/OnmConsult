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

  // Listen for /admin URL route, #admin hash, and ?project= deep-links
  useEffect(() => {
    if (loading) return;

    const handleUrlRoutes = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const urlParams = new URLSearchParams(window.location.search);
      const projectIdParam = urlParams.get('project') || urlParams.get('p');
      
      // Admin route handling
      if (path.includes('/admin') || hash === '#admin' || hash === '#/admin') {
        if (auth.isAuthenticated) {
          setAdminDrawerOpen(true);
        } else {
          setLoginModalOpen(true);
        }
      }

      // Project deep linking from URL search param (?project=proj-1) or hash (#project-proj-1)
      if (projectIdParam) {
        const found = siteData.projects.find(p => p.id.toLowerCase() === projectIdParam.toLowerCase());
        if (found) {
          setSelectedProject(found);
        }
      } else if (hash.startsWith('#project-')) {
        const pId = hash.replace('#project-', '');
        const found = siteData.projects.find(p => p.id.toLowerCase() === pId.toLowerCase());
        if (found) {
          setSelectedProject(found);
        }
      }
    };

    handleUrlRoutes();
    window.addEventListener('popstate', handleUrlRoutes);
    window.addEventListener('hashchange', handleUrlRoutes);

    return () => {
      window.removeEventListener('popstate', handleUrlRoutes);
      window.removeEventListener('hashchange', handleUrlRoutes);
    };
  }, [loading, siteData.projects, auth.isAuthenticated, setLoginModalOpen, setAdminDrawerOpen]);

  // Selected project for detailed view modal & SEO indexing
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic SEO & Structured Data for Active Project
  useEffect(() => {
    const existingScript = document.getElementById('project-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (selectedProject) {
      const pageTitle = `${selectedProject.title} (${selectedProject.capacity || selectedProject.category}) | omsconsults Nepal`;
      document.title = pageTitle;

      // Update description meta tag
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${selectedProject.title}: ${selectedProject.description || selectedProject.details || ''} - Engineering & design by omsconsults, Kathmandu Nepal.`);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && selectedProject.image) ogImage.setAttribute('content', selectedProject.image);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `${window.location.origin}/?project=${encodeURIComponent(selectedProject.id)}`);

      // Inject Schema.org Project JSON-LD Structured Data
      const script = document.createElement('script');
      script.id = 'project-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": selectedProject.title,
        "headline": selectedProject.title,
        "description": selectedProject.description || selectedProject.details,
        "image": selectedProject.image,
        "creator": {
          "@type": "Organization",
          "name": "omsconsults",
          "url": "https://omsconsults.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "omsconsults",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800"
          }
        },
        "locationCreated": {
          "@type": "Place",
          "name": selectedProject.location || "Nepal"
        },
        "genre": selectedProject.category,
        "dateCreated": selectedProject.year || "2023",
        "keywords": `hydropower Nepal, ${selectedProject.title}, engineering design, ${selectedProject.category}`
      });
      document.head.appendChild(script);

      // Update URL query string without reloading page
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.get('project') !== selectedProject.id) {
        currentUrl.searchParams.set('project', selectedProject.id);
        window.history.pushState({ projectId: selectedProject.id }, '', currentUrl.toString());
      }
    } else {
      // Revert to site defaults
      document.title = "omsconsults | Engineering Design, Hydropower & Construction Supervision";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'omsconsults delivers engineering design, feasibility studies, detailed hydropower & solar PV systems design, hydraulic analysis, and FIDIC construction supervision in Kathmandu, Nepal.');
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', 'omsconsults | Engineering Design & Construction Supervision');
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200');

      // Clear ?project= parameter from URL
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.has('project')) {
        currentUrl.searchParams.delete('project');
        window.history.pushState({}, '', currentUrl.pathname + (currentUrl.hash || ''));
      }
    }

    return () => {
      const s = document.getElementById('project-jsonld');
      if (s) s.remove();
    };
  }, [selectedProject]);

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
