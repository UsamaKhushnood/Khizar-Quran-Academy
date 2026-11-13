/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { RegionBar } from './components/RegionBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CoursesSection } from './components/CoursesSection';
import { ClassroomDemoSection } from './components/ClassroomDemoSection';
import { PricingSection } from './components/PricingSection';
import { TeachersSection } from './components/TeachersSection';
import { ParentReviewsSection } from './components/ParentReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DashboardView } from './components/DashboardView';
import { AdminPortalView } from './components/AdminPortalView';

const MainAppContent: React.FC = () => {
  const { currentView } = useAcademy();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFA] text-[#14241E]">
      <RegionBar />
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <HowItWorksSection />
            <CoursesSection />
            <ClassroomDemoSection />
            <PricingSection />
            <TeachersSection />
            <ParentReviewsSection />
            <FaqSection />
          </>
        )}
        {currentView === 'portal' && <DashboardView />}
        {currentView === 'admin' && <AdminPortalView />}
      </main>

      <Footer />

      {/* Global Modals for Registration & Student Setup */}
      <AuthModal />
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <MainAppContent />
    </AcademyProvider>
  );
}
