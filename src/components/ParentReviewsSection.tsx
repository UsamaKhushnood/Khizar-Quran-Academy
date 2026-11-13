import React from 'react';
import { PARENT_REVIEWS } from '../data/academyData';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const ParentReviewsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
            Trusted by Families Worldwide
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
            Loved by parents across USA, Canada, UAE & Pakistan.
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Hear directly from mothers and fathers who watch their children’s love for the Quran blossom week after week.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PARENT_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#FCFCFA] border border-stone-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  “{review.feedback}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/70">
                <h4 className="text-sm font-bold text-[#14241E] flex items-center gap-1.5">
                  <span>{review.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </h4>
                <p className="text-xs text-[#0E6245] font-semibold mt-0.5">
                  {review.location}
                </p>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                  <span>{review.child}</span>
                  <span>Enrolled for {review.monthsEnrolled}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
