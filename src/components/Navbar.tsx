import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { BookOpen, User, LogOut, Menu, X, ArrowRight, LayoutDashboard, Shield, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentView,
    setCurrentView,
    setIsAuthOpen,
    setAuthMode,
    openTrialBooking,
    handleLogout,
    region,
  } = useAcademy();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 py-2.5 sm:py-3.5">
        {/* Zone 1: Brand Wordmark (Single clean text element) */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-left font-bold tracking-tight text-[#14241E] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer min-w-0"
        >
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0E6245] text-white flex items-center justify-center font-serif text-base sm:text-lg shadow-xs shrink-0">
            خ
          </span>
          <span className="flex flex-col min-w-0">
            <span className="text-sm sm:text-lg font-bold leading-tight truncate">Khizar Quran Academy</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0E6245] font-semibold hidden xs:block">
              1-on-1 Online Classes
            </span>
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => scrollToSection('courses')}
            className="hover:text-[#0E6245] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Courses
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#0E6245] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-[#0E6245] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Monthly Plans
          </button>
          <button
            onClick={() => scrollToSection('classroom-demo')}
            className="hover:text-[#0E6245] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-[#0E6245]"
          >
            <BookOpen className="w-4 h-4 text-[#D49A3D]" />
            <span>Noorani Qaida</span>
          </button>
          <button
            onClick={() => scrollToSection('teachers')}
            className="hover:text-[#0E6245] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Qualified Teachers
          </button>
        </nav>

        {/* Zone 3: Action Area & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Admin Switcher (Desktop) */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
            className={`hidden md:inline-flex px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
              currentView === 'admin'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'text-stone-600 hover:text-stone-900 border-stone-200 hover:bg-stone-50'
            }`}
            title="Open Academy Admin & Enrollment Management Portal"
          >
            {currentView === 'admin' ? 'Exit Admin' : 'Admin'}
          </button>

          {/* Logged-In User Actions */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setCurrentView(currentView === 'portal' ? 'home' : 'portal')}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-lg bg-[#0E6245] text-white hover:bg-[#0b4d36] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap shrink-0"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{currentView === 'portal' ? 'Website' : 'Student Portal'}</span>
                <span className="sm:hidden">Portal</span>
              </button>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                }}
                className="hidden sm:inline-flex px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:text-[#0E6245] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5 mr-1 inline" />
                Log In
              </button>
              <button
                onClick={openTrialBooking}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#0E6245] hover:bg-[#0b4d36] rounded-lg transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span>Free Trial</span>
                <span className="hidden sm:inline">Classes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button (Touch Target >= 44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 focus:outline-hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Smooth, Accessible & Complete) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-5 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Logged in notification on mobile */}
          {currentUser && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-emerald-800 font-bold">Logged In As</p>
                <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Log Out
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            <button
              onClick={() => scrollToSection('courses')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Courses & Syllabus
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              How It Works (Google Meet / Zoom)
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Monthly Plans & Fees ({region.currencyCode})
            </button>
            <button
              onClick={() => scrollToSection('classroom-demo')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#0E6245] hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#D49A3D]" />
              <span>Noorani Qaida Pronunciation Guide</span>
            </button>
            <button
              onClick={() => scrollToSection('teachers')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Male & Female Teachers
            </button>
          </div>

          {/* Portal Switchers */}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView(currentView === 'portal' ? 'home' : 'portal');
                }}
                className="w-full py-3 text-center text-sm font-bold bg-[#0E6245] text-white rounded-xl shadow-xs"
              >
                {currentView === 'portal' ? 'Back to Website' : 'Open Student Portal'}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('login');
                    setIsAuthOpen(true);
                  }}
                  className="py-2.5 text-center text-xs font-semibold border border-stone-300 rounded-xl text-stone-700 bg-white"
                >
                  Student Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openTrialBooking();
                  }}
                  className="py-2.5 text-center text-xs font-bold bg-[#0E6245] text-white rounded-xl shadow-xs"
                >
                  Book 3 Free Classes
                </button>
              </div>
            )}

            {/* Admin Portal Toggle */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView(currentView === 'admin' ? 'home' : 'admin');
              }}
              className="w-full py-2.5 text-center text-xs font-bold border border-amber-300 bg-amber-50 text-amber-900 rounded-xl flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>{currentView === 'admin' ? 'Exit Admin View' : 'Open Academy Admin Portal'}</span>
            </button>
          </div>

          {/* Direct WhatsApp Call link */}
          <div className="pt-2 text-center">
            <a
              href={`tel:${region.supportPhone.replace(/[^0-9+]/g, '')}`}
              className="text-xs text-stone-500 hover:text-[#0E6245] inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Coordinator Hotline: {region.supportPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
