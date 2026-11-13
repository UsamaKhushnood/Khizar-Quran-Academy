import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { CourseLevel, TeacherGender } from '../types';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Clock, UserCheck } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const {
    region,
    isOnboardingOpen,
    setIsOnboardingOpen,
    handleAddStudentAndTrial,
  } = useAcademy();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [studentName, setStudentName] = useState('');
  const [ageGroup, setAgeGroup] = useState('8-12 years old');
  const [isAdult, setIsAdult] = useState(false);
  const [level, setLevel] = useState<CourseLevel>('noorani_qaida');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<TeacherGender>('female');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('5:00 PM – 5:30 PM');

  if (!isOnboardingOpen) return null;

  const handleNext = () => {
    if (step === 1 && !studentName.trim()) {
      return;
    }
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else {
      handleAddStudentAndTrial({
        name: studentName,
        age: isAdult ? 'Adult Learner' : ageGroup,
        isAdult,
        level,
        preferredTeacherGender,
        daysPerWeek,
        preferredTimeSlot,
        timezone: region.primaryTimezone,
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const timeSlots = [
    '3:30 PM – 4:00 PM',
    '4:00 PM – 4:30 PM',
    '5:00 PM – 5:30 PM',
    '5:30 PM – 6:00 PM',
    '6:30 PM – 7:00 PM',
    '7:30 PM – 8:00 PM',
    'Weekend Morning (10:00 AM – 10:30 AM)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-[#0E6245] to-[#164D39] text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
              Student Setup · Step {step} of 4
            </span>
            <h3 className="text-lg font-bold">
              {step === 1 && 'Who will be learning?'}
              {step === 2 && 'Select starting Quran level'}
              {step === 3 && 'Teacher preference & weekly days'}
              {step === 4 && 'Choose preferred class time'}
            </h3>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-1 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="w-full bg-stone-100 h-1.5 flex">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 transition-all duration-300 ${
                i <= step ? 'bg-[#0E6245]' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: Student Name & Age */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Student First Name (or Nickname)
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Rayan, Ayla, or Self"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#0E6245] focus:ring-1 focus:ring-[#0E6245]"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Student Age Group
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'Young Child (4-7 yrs)', adult: false },
                    { label: 'School Kid (8-12 yrs)', adult: false },
                    { label: 'Teenager (13-17 yrs)', adult: false },
                    { label: 'Adult Learner (18+)', adult: true },
                  ].map((item, idx) => {
                    const isSelected = isAdult === item.adult && ageGroup.includes(item.label.split(' ')[0]);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAgeGroup(item.label);
                          setIsAdult(item.adult);
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-[#0E6245] text-[#0E6245] ring-1 ring-[#0E6245]'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D49A3D] shrink-0" />
                <span>You can easily add siblings or other family members later in your portal.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Course Level */}
          {step === 2 && (
            <div className="space-y-3">
              {[
                {
                  id: 'noorani_qaida' as CourseLevel,
                  title: 'Noorani Qaida (Complete Beginner)',
                  desc: 'Learning Arabic alphabet, joint letters, and basic vowels from scratch.',
                },
                {
                  id: 'quran_reading' as CourseLevel,
                  title: 'Quran Reading with Tajweed (Nazra)',
                  desc: 'Knows letters; wants to recite the Holy Quran smoothly with Tajweed.',
                },
                {
                  id: 'hifz_memorization' as CourseLevel,
                  title: 'Quran Memorization (Hifz)',
                  desc: 'Memorizing Surahs or the complete Quran with dedicated daily revision.',
                },
                {
                  id: 'islamic_studies' as CourseLevel,
                  title: 'Islamic Studies & Duas for Kids',
                  desc: 'Salah (prayer), 6 Kalimahs, daily Duas, and Prophet stories for kids.',
                },
              ].map((c) => {
                const isSelected = level === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setLevel(c.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#0E6245] ring-1 ring-[#0E6245]'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[#0E6245] border-[#0E6245] text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#14241E]">{c.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">{c.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 3: Teacher Preference & Days per Week */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Preferred Teacher Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'female' as TeacherGender, label: 'Female Teacher', note: 'Recommended for girls & kids' },
                    { id: 'male' as TeacherGender, label: 'Male Teacher', note: 'Qari / Hafiz' },
                    { id: 'any' as TeacherGender, label: 'Either / Any', note: 'First available' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setPreferredTeacherGender(g.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        preferredTeacherGender === g.id
                          ? 'bg-emerald-50 border-[#0E6245] text-[#0E6245] ring-1 ring-[#0E6245]'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{g.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{g.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  How many days a week would you like to study?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDaysPerWeek(days)}
                      className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        daysPerWeek === days
                          ? 'bg-[#0E6245] text-white border-[#0E6245] font-bold shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 font-semibold hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-sm">{days} Days</div>
                      <div className="text-[10px] opacity-80">/ week</div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  3 days/week is chosen by most families for steady, comfortable progress.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Preferred Time Slot */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#0E6245] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Time Zone: <strong>{region.primaryTimezone}</strong></span>
                </div>
                <span className="text-[11px] font-bold">{region.flag} {region.name}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Select Convenient Daily 30-Minute Slot
                </label>
                <div className="space-y-2">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPreferredTimeSlot(slot)}
                      className={`w-full py-2.5 px-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        preferredTimeSlot === slot
                          ? 'bg-emerald-50 border-[#0E6245] text-[#0E6245] ring-1 ring-[#0E6245]'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{slot}</span>
                      {preferredTimeSlot === slot && <Check className="w-4 h-4 text-[#0E6245]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Your teacher will be confirmed for <strong>3 Free Trial Classes</strong> at this chosen time.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 bg-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={step === 1 && !studentName.trim()}
            className="px-5 py-2.5 bg-[#0E6245] hover:bg-[#0b4d36] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>{step === 4 ? 'Confirm & Book 3 Free Classes' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
