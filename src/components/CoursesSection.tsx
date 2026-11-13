import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { COURSES_CATALOG } from '../data/academyData';
import { Check, Clock, Users, ArrowRight } from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { openTrialBooking } = useAcademy();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('noorani_qaida');

  return (
    <section id="courses" className="py-16 md:py-24 bg-[#FCFCFA] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
            Structured Islamic Curriculum
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
            From absolute beginner to fluent recitation.
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Every child and adult learns differently. Our teachers adjust to each student’s speed, ensuring sound Tajweed foundations without rushing.
          </p>
        </div>

        {/* 4 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {COURSES_CATALOG.map((course) => {
            const isSelected = selectedCourseId === course.id;
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#0E6245] shadow-lg ring-1 ring-[#0E6245]/20'
                    : 'bg-white/80 hover:bg-white border-stone-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-[#0E6245] bg-[#0E6245]/10 px-2.5 py-1 rounded-md">
                      {course.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#14241E] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs font-medium text-[#D49A3D] mb-3">
                    {course.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Key Outcomes:
                    </p>
                    {course.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    <span>{course.audience}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openTrialBooking();
                    }}
                    className="text-xs font-bold text-[#0E6245] hover:text-[#0b4d36] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Start This Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
