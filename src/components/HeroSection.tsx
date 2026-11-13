import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { ArrowRight, CheckCircle2, Video, Calendar, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { region, openTrialBooking } = useAcademy();

  const scrollToDemo = () => {
    const el = document.getElementById('classroom-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FCFCFA] to-white pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust badge with country flags */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#0E6245] bg-[#0E6245]/8 px-3 py-1.5 rounded-md border border-[#0E6245]/20">
              <span className="flex items-center gap-1 font-semibold">
                <span>🇺🇸</span>
                <span>🇨🇦</span>
                <span>🇦🇪</span>
                <span>🇵🇰</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-[#0E6245]/40" />
              <span>Dedicated Classes for Muslim Families in {region.name}</span>
            </div>

            {/* Headline with balanced text wrap */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#14241E] leading-[1.15]" style={{ textWrap: 'balance' }}>
              Learn the Holy Quran from home with certified 1-on-1 teachers.
            </h1>

            {/* Subtitle in plain, parent-friendly English */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Live 30-minute video classes tailored to your child’s pace and your family’s time zone.
              From absolute beginners learning the Arabic letters to fluent Quran reading and memorization.
              Male and female tutors available.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={openTrialBooking}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0E6245] hover:bg-[#0b4d36] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start with 3 Free Classes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToDemo}
                className="px-5 py-3.5 text-sm sm:text-base font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#D49A3D]" />
                <span>Try Noorani Qaida Guide</span>
              </button>
            </div>

            {/* Quiet reassurance text */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Female teachers for girls & kids</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Flexible times in {region.primaryTimezone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity visual asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 bg-stone-100">
              <img
                src="/src/assets/images/hero_quran_learning_1794404765769.jpg"
                alt="Young student reading the Holy Quran peacefully with Rehal book stand in a calm home environment"
                className="w-full h-auto object-cover aspect-16/10"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay highlight card */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-stone-200/80 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0E6245]/10 flex items-center justify-center text-[#0E6245]">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">One Student · One Teacher</p>
                    <p className="text-[11px] text-stone-500">Live 30-min focused video lesson</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#0E6245] bg-[#0E6245]/10 px-2.5 py-1 rounded-md">
                  Free Trial
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-benefit trust row below hero */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E6245] flex items-center justify-center mb-3">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Your Local Time Zone</h3>
            <p className="text-xs text-stone-500 mt-1">
              Classes available morning, afternoon, or evening in US, Canada, Dubai & Pakistan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E6245] flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Certified & Vetted Tutors</h3>
            <p className="text-xs text-stone-500 mt-1">
              Graduates of recognized Islamic universities, certified Huffaz and Qaris fluent in English & Urdu.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E6245] flex items-center justify-center mb-3">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Male & Female Tutors</h3>
            <p className="text-xs text-stone-500 mt-1">
              Choose an experienced female teacher for your daughters or younger children anytime.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E6245] flex items-center justify-center mb-3">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Try 3 Classes for Free</h3>
            <p className="text-xs text-stone-500 mt-1">
              See how your child responds to the teacher before deciding on any monthly plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
