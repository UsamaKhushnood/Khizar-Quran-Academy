import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { REGIONS_DATA } from '../data/academyData';
import { RegionId } from '../types';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { region, setRegionById, openTrialBooking } = useAcademy();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
            Transparent Monthly Tuition
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
            Simple plans based on days per week.
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            All classes are 30 minutes, 1-on-1 with your dedicated teacher.
            Try 3 free trial classes before any payment. No long contracts, cancel or pause anytime.
          </p>

          {/* Region Switcher Pills within Pricing */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-stone-100 border border-stone-200">
            {(Object.keys(REGIONS_DATA) as RegionId[]).map((regKey) => {
              const reg = REGIONS_DATA[regKey];
              const isSelected = reg.id === region.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setRegionById(reg.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#0E6245] shadow-xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <span>{reg.flag}</span>
                  <span>{reg.name} ({reg.currencyCode})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {region.plans.map((plan, idx) => {
            const isPopular = plan.daysPerWeek === 3;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'bg-[#FCFCFA] border-2 border-[#0E6245] shadow-xl relative'
                    : 'bg-white border border-stone-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0E6245] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#14241E]">
                      {plan.daysPerWeek} Days / Week
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                      {plan.classesPerMonth} classes every month (30 min each)
                    </p>
                  </div>

                  {/* Price display with Tabular Numerals */}
                  <div className="my-5 pb-5 border-b border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-stone-700">
                        {region.currencySymbol}
                      </span>
                      <span className="text-4xl font-extrabold text-[#14241E] font-mono tabular-nums tracking-tight">
                        {plan.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ month</span>
                    </div>
                    <p className="text-[11px] text-[#D49A3D] font-semibold mt-2">
                      {plan.recommendedFor}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 text-xs text-stone-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>One student with one teacher</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Male or female teacher choice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Flexible time in {region.primaryTimezone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Monthly progress feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Make-up classes for missed days</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={openTrialBooking}
                    className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPopular
                        ? 'bg-[#0E6245] hover:bg-[#0b4d36] text-white shadow-md'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    <span>Try 3 Classes Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-stone-400 mt-2">
                    Zero payment required today
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 p-5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0E6245] shrink-0" />
            <div className="text-xs sm:text-sm text-stone-700">
              <strong className="font-bold text-stone-900">Family Peace of Mind Guarantee: </strong>
              If you or your child are not completely delighted after your free trial classes, you owe nothing.
            </div>
          </div>
          <div className="text-xs text-stone-500 font-mono whitespace-nowrap">
            Support: {region.supportPhone}
          </div>
        </div>
      </div>
    </section>
  );
};
