<template>
  <section id="teachers" class="py-16 md:py-24 bg-[#FCFCFA] border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-14">
        <Badge variant="outline" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
          <Users class="w-3.5 h-3.5 text-[#0E6245]" />
          <span>Certified Teaching Faculty</span>
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          Qualified Male & Female Teachers Available
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          We understand that comfort and proper Islamic etiquette are essential for your family.
          Choose dedicated female teachers for daughters and sisters, and certified male scholars for sons and brothers.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <CCard
          hide-header
          class="rounded-2xl bg-white border-stone-200/90 shadow-xs hover:shadow-md transition-all p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group gap-0"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 opacity-60 group-hover:scale-105 transition-transform" />
          <div class="relative z-10 space-y-5">
            <div class="flex items-center justify-between gap-3">
              <span class="w-12 h-12 rounded-xl bg-emerald-100/70 text-[#0E6245] flex items-center justify-center shadow-xs">
                <GraduationCap class="w-6 h-6" />
              </span>
              <Badge class="text-xs font-bold uppercase tracking-wider text-[#0E6245] bg-[#0E6245]/10 hover:bg-[#0E6245]/15 border-0 px-2.5 py-1 rounded-full">
                Dedicated Sister Faculty
              </Badge>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-[#14241E]">
                Certified Female Teachers
              </h3>
              <p class="text-xs sm:text-sm text-[#0E6245] font-semibold mt-0.5">
                Alimahs & Hafizat with gentle, child-friendly pedagogy
              </p>
              <p class="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Specially assigned for young children, girls, and adult female students who prefer
                learning in a completely private, comfortable, and supportive 1-on-1 environment.
              </p>
            </div>

            <div class="space-y-2.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
              <div v-for="pt in femaleHighlights" :key="pt.title" class="flex items-start gap-2.5">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{{ pt.title }}</strong> {{ pt.desc }}</span>
              </div>
            </div>
          </div>

          <div class="relative z-10 pt-6 mt-6 border-t border-stone-100">
            <Button
              variant="secondary"
              @click="openTrialBooking"
              class="w-full py-3 h-auto px-4 rounded-xl font-semibold text-xs sm:text-sm bg-stone-100 hover:bg-[#0E6245] text-stone-800 hover:text-white flex items-center justify-center gap-2 group-hover:bg-[#0E6245] group-hover:text-white"
            >
              <span>Request a Female Teacher in 3 Free Classes</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>
        </CCard>

        <CCard
          hide-header
          class="rounded-2xl bg-white border-stone-200/90 shadow-xs hover:shadow-md transition-all p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group gap-0"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full z-0 opacity-60 group-hover:scale-105 transition-transform" />
          <div class="relative z-10 space-y-5">
            <div class="flex items-center justify-between gap-3">
              <span class="w-12 h-12 rounded-xl bg-amber-100/70 text-[#9E6D18] flex items-center justify-center shadow-xs">
                <Award class="w-6 h-6" />
              </span>
              <Badge class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 hover:bg-amber-100 border-0 px-2.5 py-1 rounded-full">
                Certified Qaris & Scholars
              </Badge>
            </div>

            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-[#14241E]">
                Certified Male Instructors
              </h3>
              <p class="text-xs sm:text-sm text-amber-800 font-semibold mt-0.5">
                Sanad & Ijazah Holders in Tajweed & Hifz Mentorship
              </p>
              <p class="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Dedicated for boys, young men, and adult brothers aiming to master accurate recitation,
                complex Tajweed rules, and systematic Quran memorization (Hifz).
              </p>
            </div>

            <div class="space-y-2.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
              <div v-for="pt in maleHighlights" :key="pt.title" class="flex items-start gap-2.5">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>{{ pt.title }}</strong> {{ pt.desc }}</span>
              </div>
            </div>
          </div>

          <div class="relative z-10 pt-6 mt-6 border-t border-stone-100">
            <Button
              variant="secondary"
              @click="openTrialBooking"
              class="w-full py-3 h-auto px-4 rounded-xl font-semibold text-xs sm:text-sm bg-stone-100 hover:bg-[#0E6245] text-stone-800 hover:text-white flex items-center justify-center gap-2 group-hover:bg-[#0E6245] group-hover:text-white"
            >
              <span>Request a Male Teacher in 3 Free Classes</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>
        </CCard>
      </div>

      <CCard hide-header class="p-8 sm:p-10 rounded-2xl bg-white border-stone-200/90 shadow-xs gap-0">
        <div class="container mb-8">
          <h4 class="text-xl font-bold text-[#14241E]">
            Our Rigorous Teacher Selection Process
          </h4>
          <p class="text-xs sm:text-sm text-stone-600 mt-1">
            Only the top 5% of applicants join Khizar Quran Academy after multiple rounds of evaluation.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="pillar in pillars" :key="pillar.title" class="space-y-2">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 text-[#0E6245] flex items-center justify-center">
              <component :is="pillar.icon" class="w-5 h-5" />
            </div>
            <h5 class="text-sm font-bold text-stone-900">{{ pillar.title }}</h5>
            <p class="text-xs text-stone-600 leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
            <Sparkles class="w-4 h-4 text-[#D49A3D] shrink-0" />
            <span>
              Select your preferred teacher gender when registering — <strong>no credit card required</strong> for your first 3 trial sessions.
            </span>
          </div>
          <Button
            @click="openTrialBooking"
            class="px-5 py-2.5 h-auto text-xs font-bold text-white bg-[#0E6245] hover:bg-[#0b4d36] rounded-xl shadow-xs shrink-0"
          >
            Start 3 Free Trial Classes
          </Button>
        </div>
      </CCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  Users,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Award,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  Headphones,
  GraduationCap,
} from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CCard from '@/components/common/CCard.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

function openTrialBooking() {
  router.push(store.currentUser ? '/onboarding' : '/signup');
}

const femaleHighlights = [
  { title: 'Ideal for Kids & Sisters:', desc: 'Gentle patience for Noorani Qaida and first-time Arabic readers.' },
  { title: 'Full Privacy & Etiquette:', desc: 'Conducted with Islamic modest guidelines over Google Meet or Zoom.' },
  { title: 'Bilingual Communication:', desc: 'Fluent in English & Urdu to connect easily with children in western schools.' },
  { title: 'Tajweed Precision:', desc: 'Trained to correct pronunciation without making students anxious.' },
];

const maleHighlights = [
  { title: 'Authentic Pronunciation (Makharij):', desc: 'Rigorous training in heavy, light, and throat letters.' },
  { title: 'Structured Hifz Coaching:', desc: 'Daily Sabaq (new lesson), Sabqi (recent), and Manzil (revision) logs.' },
  { title: 'Engaging Role Models:', desc: 'Inspiring male mentors who keep young boys focused, disciplined, and motivated.' },
  { title: 'Flexible Scheduling:', desc: 'Morning, afternoon, and evening slots matched to your time zone.' },
];

const pillars = [
  { icon: ShieldCheck, title: 'Background Checked', desc: 'Complete identity and character vetting to ensure your children are safe and respected in every session.' },
  { icon: BookOpen, title: 'Verified Tajweed Ijazah', desc: 'Certified scholars tested rigorously for Makharij, rules of Waqf, Noon Sakinah, and authentic recitation.' },
  { icon: Headphones, title: 'Clear English & Urdu', desc: 'Trained specifically to communicate patiently with kids raised in the USA, Canada, and Gulf countries.' },
  { icon: HeartHandshake, title: 'Teacher Change Guarantee', desc: 'If the teacher-student rapport isn’t 100% comfortable, you can switch teachers immediately without hassle.' },
];
</script>
