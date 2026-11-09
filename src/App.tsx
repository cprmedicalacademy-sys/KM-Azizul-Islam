import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';
import { CheckCircle2, Info } from 'lucide-react';

const MainPortfolioApp: React.FC = () => {
  const { notification } = usePortfolio();
  const [selectedServiceOrProject, setSelectedServiceOrProject] = useState<string | undefined>();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceOrProject = (itemTitle: string) => {
    setSelectedServiceOrProject(itemTitle);
    handleNavigate('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      {/* 3D Ambient Particle Background */}
      <ThreeBackground />

      {/* Floating System Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="px-4 py-2.5 rounded-xl bg-[#0c1017] border border-white/10 text-xs font-sans-ui text-slate-200 shadow-2xl flex items-center gap-2.5">
            <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <SkillsSection />
        <ExperienceEducationSection />
        <ServicesSection onSelectService={handleSelectServiceOrProject} />
        <ProjectsSection onContactAboutProject={handleSelectServiceOrProject} />
        <ContactSection initialServiceOrProject={selectedServiceOrProject} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Admin Dashboard CMS Modal */}
      <AdminDashboardModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolioApp />
    </PortfolioProvider>
  );
}
