import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { TEACHERS_LIST } from '../data/academyData';
import { Star, Award, Globe, ArrowRight, UserCheck } from 'lucide-react';

export const TeachersSection: React.FC = () => {
  const { openTrialBooking } = useAcademy();
  const [filterGender, setFilterGender] = useState<'all' | 'female' | 'male'>('all');

  const filteredTeachers = TEACHERS_LIST.filter(t => {
    if (filterGender === 'female') return t.gender === 'female';
    if (filterGender === 'male') return t.gender === 'male';
    return true;
  });

  return (
    <section id="teachers" className="py-16 md:py-24 bg-[#FCFCFA] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
            Certified Faculty
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
            Meet our qualified male and female teachers.
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Every instructor at Khizar Quran Academy has undergone background verification, Tajweed testing, and child-safe training.
          </p>

          {/* Gender Filter Tabs */}
          <div className="mt-6 inline-flex items-center gap-1.5 p-1 rounded-lg bg-stone-100 border border-stone-200 text-xs">
            <button
              onClick={() => setFilterGender('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                filterGender === 'all' ? 'bg-[#0E6245] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Teachers
            </button>
            <button
              onClick={() => setFilterGender('female')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                filterGender === 'female' ? 'bg-[#0E6245] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Female Teachers Only
            </button>
            <button
              onClick={() => setFilterGender('male')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                filterGender === 'male' ? 'bg-[#0E6245] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Male Teachers Only
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-stone-200 shadow-xs bg-stone-100">
                <img
                  src={teacher.image}
                  alt={`Portrait of ${teacher.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0E6245] bg-[#0E6245]/10 px-2 py-0.5 rounded">
                    {teacher.gender === 'female' ? 'Female Instructor' : 'Male Instructor'}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{teacher.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#14241E]">
                  {teacher.name}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {teacher.title} · {teacher.experienceYears}+ years experience
                </p>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {teacher.bio}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-stone-500">
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span className="truncate max-w-[190px]">{teacher.education}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-stone-400" />
                    <span>{teacher.languages.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openTrialBooking}
                    className="text-xs font-bold text-[#0E6245] hover:text-[#0b4d36] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Trial with {teacher.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teacher standard reassurance */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-500 flex items-center justify-center gap-2">
            <UserCheck className="w-4 h-4 text-[#0E6245]" />
            <span>All teachers are trained in English communication for North American and Gulf diaspora students.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
