import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { REGIONS_DATA } from '../data/academyData';
import { RegionId } from '../types';
import { Phone, Mail, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setRegionById, setCurrentView } = useAcademy();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14241E] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#0E6245] text-white flex items-center justify-center font-serif text-lg">
                خ
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                Khizar Quran Academy
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Live one-to-one Quran classes held over video call for children and adults. Connecting Muslim families across the USA, Canada, Dubai, and Pakistan with real, certified teachers.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>support@khizarquranacademy.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>USA · Canada · UAE (Dubai) · Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 3: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quran Programs
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => scrollTo('courses')} className="hover:text-white transition-colors cursor-pointer">Noorani Qaida for Kids</button></li>
              <li><button onClick={() => scrollTo('courses')} className="hover:text-white transition-colors cursor-pointer">Nazra Quran with Tajweed</button></li>
              <li><button onClick={() => scrollTo('courses')} className="hover:text-white transition-colors cursor-pointer">Quran Memorization (Hifz)</button></li>
              <li><button onClick={() => scrollTo('courses')} className="hover:text-white transition-colors cursor-pointer">Islamic Studies & Duas</button></li>
              <li><button onClick={() => scrollTo('courses')} className="hover:text-white transition-colors cursor-pointer">Adult Quran Reading</button></li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Academy
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors cursor-pointer">How It Works</button></li>
              <li><button onClick={() => scrollTo('classroom-demo')} className="hover:text-white transition-colors cursor-pointer">Noorani Qaida Tool</button></li>
              <li><button onClick={() => scrollTo('teachers')} className="hover:text-white transition-colors cursor-pointer">Male & Female Teachers</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors cursor-pointer">Monthly Plans & Fees</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors cursor-pointer">3 Free Trial Classes</button></li>
              <li><button onClick={() => setCurrentView('admin')} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-semibold">Admin Portal</button></li>
            </ul>
          </div>

          {/* Col 5: Local Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Regional Desks
            </h4>
            <div className="space-y-2 text-xs">
              {(Object.keys(REGIONS_DATA) as RegionId[]).map((key) => {
                const r = REGIONS_DATA[key];
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRegionById(r.id);
                      scrollTo('pricing');
                    }}
                    className="flex items-center justify-between w-full p-1.5 rounded hover:bg-stone-800 text-left transition-colors cursor-pointer text-stone-300 hover:text-white"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{r.flag}</span>
                      <span>{r.name}</span>
                    </span>
                    <span className="font-mono text-[11px] text-stone-400">{r.currencyCode}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Khizar Quran Academy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>May Allah bless every student on their journey of learning the Holy Quran.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
