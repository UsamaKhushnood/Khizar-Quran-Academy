import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { NOORANI_QAIDA_LESSON_1 } from '../data/academyData';
import { QaidaItem } from '../types';
import { soundManager } from '../utils/audioSound';
import { Volume2, Sparkles, Video, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export const ClassroomDemoSection: React.FC = () => {
  const { openTrialBooking } = useAcademy();
  const [selectedLetter, setSelectedLetter] = useState<QaidaItem>(NOORANI_QAIDA_LESSON_1[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'heavy' | 'throat' | 'lips'>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter letters based on pedagogical categories
  const filteredLetters = NOORANI_QAIDA_LESSON_1.filter(item => {
    if (activeFilter === 'heavy') {
      return ['خ', 'ص', 'ض', 'ط', 'ظ', 'غ', 'ق'].includes(item.arabic);
    }
    if (activeFilter === 'throat') {
      return ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'].includes(item.arabic);
    }
    if (activeFilter === 'lips') {
      return ['ب', 'م', 'و', 'ف'].includes(item.arabic);
    }
    return true;
  });

  const handleLetterClick = (item: QaidaItem) => {
    setSelectedLetter(item);
    setIsPlayingAudio(true);
    soundManager.playLetter(item.audioFile, item.fullArabicName, item.name);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  return (
    <section id="classroom-demo" className="py-16 md:py-24 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with clear, authentic positioning */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E6245] uppercase tracking-wider mb-3 bg-[#0E6245]/10 px-3 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Interactive Tajweed & Pronunciation Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
            Explore our interactive Noorani Qaida alphabet guide.
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Try clicking any Arabic letter below to hear authentic human pronunciation and review articulation points (*Makharij*).
            In our academy, certified teachers work with your child 1-on-1 over <strong>Google Meet or Zoom</strong> to perfect each sound.
          </p>
        </div>

        {/* Main Noorani Qaida Interactive Showcase Container */}
        <div className="bg-[#14241E] rounded-2xl shadow-xl border border-stone-800 overflow-hidden text-stone-100">
          {/* Top Bar explaining class connection over Google Meet / Zoom */}
          <div className="bg-[#0D1814] px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">Noorani Qaida & Makharij Pronunciation Demo</span>
            </div>

            <div className="flex items-center gap-3 text-stone-300">
              <div className="flex items-center gap-1.5 bg-[#14241E] px-3 py-1 rounded-lg border border-stone-700 text-[11px]">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live 1-on-1 Classes Held on <strong>Google Meet & Zoom</strong></span>
              </div>
            </div>
          </div>

          {/* 2-Zone Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
            {/* Left 5 Cols: Selected Letter Articulation Point & Teacher Guidance */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#162921] flex flex-col justify-between space-y-6">
              <div>
                {/* Photo showcase with teacher and student */}
                <div className="relative rounded-xl overflow-hidden border border-stone-700 bg-stone-900 aspect-16/10 shadow-lg">
                  <img
                    src="/src/assets/images/classroom_one_on_one_1794404766060.jpg"
                    alt="One-on-one Quran learning over video call"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs flex items-center justify-between">
                    <span className="text-stone-300">Live 1-on-1 via Google Meet / Zoom</span>
                    <span className="text-emerald-400 font-semibold">30 Min Lessons</span>
                  </div>
                </div>

                {/* Selected Letter Spotlight Card */}
                <div className="mt-5 p-4 rounded-xl bg-[#0D1814] border border-stone-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Selected Letter</p>
                      <h4 className="text-xl font-bold text-white">
                        {selectedLetter.name} ({selectedLetter.transliteration})
                      </h4>
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-[#0E6245]/40 border border-[#0E6245] flex items-center justify-center text-4xl font-arabic text-emerald-300 shadow-xs">
                      {selectedLetter.arabic}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800 space-y-2 text-xs">
                    <div>
                      <span className="text-stone-400 font-medium">Makhraj (Articulation Origin):</span>
                      <p className="text-emerald-300 font-semibold mt-0.5">{selectedLetter.makhraj}</p>
                    </div>
                    <div>
                      <span className="text-stone-400 font-medium">Teacher’s Guidance Tip:</span>
                      <p className="text-stone-300 mt-0.5 leading-relaxed">{selectedLetter.tip}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLetterClick(selectedLetter)}
                    className="mt-4 w-full py-2.5 bg-[#0E6245] hover:bg-[#0b4d36] text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-emerald-300' : ''}`} />
                    <span>Play Audio Pronunciation ({selectedLetter.name})</span>
                  </button>
                </div>
              </div>

              {/* Learning Note */}
              <div className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-stone-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>How 1-on-1 sessions work:</span>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Your child shares the screen with their teacher on Google Meet or Zoom, repeating sounds until pronunciation is confident and accurate.
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Interactive 29 Arabic Letters Board */}
            <div className="lg:col-span-7 p-5 sm:p-6 bg-[#0E1B15] flex flex-col justify-between">
              <div>
                {/* Header & Filter Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Noorani Qaida Letters</span>
                      <span className="text-[11px] font-normal text-stone-400">(Click any letter to hear recitation)</span>
                    </h3>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-[#14241E] p-1 rounded-lg border border-stone-800 text-xs">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeFilter === 'all' ? 'bg-[#0E6245] text-white font-semibold' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      All 29
                    </button>
                    <button
                      onClick={() => setActiveFilter('heavy')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeFilter === 'heavy' ? 'bg-[#0E6245] text-white font-semibold' : 'text-stone-400 hover:text-white'
                      }`}
                      title="Bold / Heavy letters (Musta'liyah)"
                    >
                      Heavy
                    </button>
                    <button
                      onClick={() => setActiveFilter('throat')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeFilter === 'throat' ? 'bg-[#0E6245] text-white font-semibold' : 'text-stone-400 hover:text-white'
                      }`}
                      title="Throat letters (Halqiyyah)"
                    >
                      Throat
                    </button>
                    <button
                      onClick={() => setActiveFilter('lips')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeFilter === 'lips' ? 'bg-[#0E6245] text-white font-semibold' : 'text-stone-400 hover:text-white'
                      }`}
                      title="Lip letters (Shafawiyyah)"
                    >
                      Lips
                    </button>
                  </div>
                </div>

                {/* Letters Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3 py-5" dir="rtl">
                  {filteredLetters.map((item) => {
                    const isSelected = selectedLetter.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLetterClick(item)}
                        className={`group p-3 rounded-xl transition-all flex flex-col items-center justify-center cursor-pointer border ${
                          isSelected
                            ? 'bg-[#0E6245] border-[#D49A3D] text-white ring-2 ring-[#D49A3D]/40 shadow-lg scale-105'
                            : 'bg-[#14241E] hover:bg-[#1C332A] border-stone-800 text-stone-200 hover:border-emerald-700/50'
                        }`}
                      >
                        <span className="text-3xl sm:text-4xl font-arabic leading-tight select-none group-hover:scale-110 transition-transform">
                          {item.arabic}
                        </span>
                        <span className="text-[10px] text-stone-400 font-sans mt-1 group-hover:text-stone-200">
                          {item.transliteration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA Banner */}
              <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <Info className="w-4 h-4 text-[#D49A3D] shrink-0" />
                  <span>
                    New students can try 3 classes for free before deciding on any monthly study plan.
                  </span>
                </div>
                <button
                  onClick={openTrialBooking}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <span>Book 3 Free Classes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
