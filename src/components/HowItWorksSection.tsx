import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { UserPlus, CalendarCheck, Video, CreditCard, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { region, openTrialBooking } = useAcademy();

  const steps = [
    {
      num: '01',
      title: 'Create Your Free Account',
      desc: 'Takes less than a minute. Sign up with just your name, email, and phone number. No payment info or credit card is ever required.',
      icon: UserPlus,
    },
    {
      num: '02',
      title: 'Select Teacher & Time',
      desc: `Pick your preference for a male or female teacher, and choose morning, afternoon, or evening slots in ${region.primaryTimezone}.`,
      icon: CalendarCheck,
    },
    {
      num: '03',
      title: 'Take 3 Free Classes',
      desc: 'Meet your dedicated teacher on a 30-minute private video call. See how comfortable your child feels and evaluate our teaching quality.',
      icon: Video,
    },
    {
      num: '04',
      title: 'Simple Monthly Plan',
      desc: 'If you love the experience, continue on a simple monthly plan based on how many days a week you want to study. Change or pause anytime.',
      icon: CreditCard,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
            Simple 4-Step Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
            How learning with Khizar Quran Academy works.
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            We designed our process to be completely straightforward. No complicated software, no hidden costs, and total flexibility for parents.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-[#FCFCFA] border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#0E6245]/10 text-[#0E6245] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-2xl font-mono font-bold text-stone-300">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#14241E] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#0E6245]">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0E6245] to-[#144733] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Ready to try your first lesson for free?</h4>
            <p className="text-sm text-emerald-100">
              Set up your student profile in 60 seconds and meet your teacher tomorrow.
            </p>
          </div>
          <button
            onClick={openTrialBooking}
            className="px-6 py-3 bg-white text-[#0E6245] hover:bg-emerald-50 font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Book 3 Free Classes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
