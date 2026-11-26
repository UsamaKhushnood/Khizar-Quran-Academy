<template>
  <section class="py-16 md:py-24 bg-[#FCFCFA] border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-14">
        <Badge variant="outline" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
          <ShieldCheck class="w-3.5 h-3.5 text-[#0E6245]" />
          <span>Academy Standards & Guarantees</span>
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          Our Commitments to Every Enrolled Family
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          We hold ourselves to the highest standards of Islamic education, safety, and pedagogical excellence for students living in the USA, Canada, Dubai, and Pakistan.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <CCard
          v-for="(c, idx) in commitments"
          :key="idx"
          hide-header
          class="p-7 rounded-2xl bg-white border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-0"
        >
          <div>
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-[#0E6245] flex items-center justify-center mb-5 shadow-xs">
              <component :is="c.icon" class="w-6 h-6 stroke-[1.8]" />
            </div>

            <h3 class="text-base sm:text-lg font-bold text-[#14241E] mb-2">
              {{ c.title }}
            </h3>

            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {{ c.desc }}
            </p>
          </div>

          <div class="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-[#0E6245]">
            <CheckCircle2 class="w-4 h-4 text-emerald-600" />
            <span>Verified Academy Guarantee</span>
          </div>
        </CCard>
      </div>

      <div class="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0E6245] to-[#144733] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div class="space-y-1 text-center sm:text-left">
          <h4 class="text-lg sm:text-xl font-bold">
            Ready to experience our classes firsthand?
          </h4>
          <p class="text-xs sm:text-sm text-emerald-100">
            Book 3 free trial sessions with a certified male or female teacher today.
          </p>
        </div>

        <Button
          @click="openTrialBooking"
          class="px-6 py-3 h-auto rounded-xl bg-white text-[#0E6245] hover:bg-stone-100 font-bold text-xs sm:text-sm shadow-md shrink-0"
        >
          Start 3 Free Trial Classes
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ShieldCheck, HeartHandshake, CheckCircle2, Video, Clock, Award, Sparkles } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CCard from '@/components/common/CCard.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

function openTrialBooking() {
  router.push(store.currentUser ? '/onboarding' : '/signup');
}

const commitments = [
  { icon: Video, title: 'Dedicated 1-on-1 Video Lessons', desc: 'Every session is strictly one student with one dedicated teacher. No crowded group calls or divided attention.' },
  { icon: HeartHandshake, title: 'Gentle, Encouraging Pedagogy', desc: 'Our teachers build genuine love for the Quran. Pronunciation is corrected patiently without making young learners anxious.' },
  { icon: ShieldCheck, title: 'Female Faculty for Sisters & Kids', desc: 'Alimahs and Hafizat available specifically for daughters, young children, and adult sisters respecting full Islamic modesty.' },
  { icon: Award, title: 'Certified Ijazah & Tajweed Holders', desc: 'Scholars and Hafiz mentors vetted for authentic Makharaj, Tajweed rules, and clear bilingual English/Urdu communication.' },
  { icon: Clock, title: 'Flexible Schedules in Your Timezone', desc: 'Morning, afternoon, and evening slots 4 days a week tailored to school hours across the USA, Canada, UAE, and Pakistan.' },
  { icon: Sparkles, title: '3 Free Trial Classes Before Paying', desc: 'Test the teaching quality with 3 full live 30-minute classes. No credit card required upfront.' },
];
</script>
