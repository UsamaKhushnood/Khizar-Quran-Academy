<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FCFCFA] to-white pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-200/80">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <Badge variant="outline" class="inline-flex items-center gap-2 text-xs font-semibold text-[#0E6245] bg-[#0E6245]/8 px-3 py-1.5 rounded-md border-[#0E6245]/20">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live 1-on-1 Online Quran Classes with Certified Teachers</span>
          </Badge>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#14241E] leading-[1.15] text-balance">
            Learn the Holy Quran from home with certified 1-on-1 teachers.
          </h1>

          <p class="text-base sm:text-lg text-stone-600 leading-relaxed container">
            Live 30-minute video classes tailored to your child’s pace and your family’s time zone.
            From absolute beginners learning the Arabic letters to fluent Quran reading and memorization.
            Male and female tutors available.
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              @click="openTrialBooking"
              class="px-6 py-3.5 h-auto text-sm sm:text-base font-semibold text-white bg-[#0E6245] hover:bg-[#0b4d36] rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Start with 3 Free Classes</span>
              <ArrowRight class="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              @click="scrollToDemo"
              class="px-5 py-3.5 h-auto text-sm sm:text-base font-semibold text-stone-800 bg-white hover:bg-stone-50 border-stone-300 rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <BookOpen class="w-4 h-4 text-[#D49A3D]" />
              <span>Try Noorani Qaida Guide</span>
            </Button>
          </div>

          <div class="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-500 font-medium">
            <div class="flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>No credit card required</span>
            </div>
            <div class="flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>Female teachers for girls & kids</span>
            </div>
            <div class="flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              <span>Flexible times at your chosen schedule</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 bg-stone-100">
            <img
              :src="heroImgSrc"
              @error="onImgError"
              alt="Young student reading the Holy Quran peacefully with Rehal book stand in a calm home environment"
              class="w-full h-auto object-cover aspect-16/10"
              referrerpolicy="no-referrer"
            />

            <div class="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-stone-200/80 shadow-md flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#0E6245]/10 flex items-center justify-center text-[#0E6245]">
                  <Video class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-bold text-stone-900">One Student · One Teacher</p>
                  <p class="text-[11px] text-stone-500">Live 30-min focused video lesson</p>
                </div>
              </div>
              <Badge class="text-[11px] font-bold text-[#0E6245] bg-[#0E6245]/10 hover:bg-[#0E6245]/15 border-0 px-2.5 py-1 rounded-md">
                Free Trial
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <CCard
          v-for="benefit in benefits"
          :key="benefit.title"
          hide-header
          class="p-4 rounded-xl bg-white border-stone-200/80 shadow-xs py-4 gap-0"
        >
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E6245] flex items-center justify-center mb-3">
            <component :is="benefit.icon" class="w-4 h-4" />
          </div>
          <h3 class="text-sm font-bold text-stone-900">{{ benefit.title }}</h3>
          <p class="text-xs text-stone-500 mt-1">{{ benefit.desc }}</p>
        </CCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, CheckCircle2, Video, Calendar, ShieldCheck, HeartHandshake, BookOpen } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CCard from '@/components/common/CCard.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

const heroImgSrc = ref('/images/hero.jpg');

function onImgError() {
  if (!heroImgSrc.value.includes('hero_quran_learning')) {
    heroImgSrc.value = '/images/hero_quran_learning_1794404765769.jpg';
  }
}

function openTrialBooking() {
  router.push(store.currentUser ? '/onboarding' : '/signup');
}

function scrollToDemo() {
  document.getElementById('classroom-demo')?.scrollIntoView({ behavior: 'smooth' });
}

const benefits = [
  {
    icon: Calendar,
    title: 'Your Local Time Zone',
    desc: 'Classes available morning, afternoon, or evening in US, Canada, Dubai & Pakistan.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified & Vetted Tutors',
    desc: 'Graduates of recognized Islamic universities, certified Huffaz and Qaris fluent in English & Urdu.',
  },
  {
    icon: HeartHandshake,
    title: 'Male & Female Tutors',
    desc: 'Choose an experienced female teacher for your daughters or younger children anytime.',
  },
  {
    icon: CheckCircle2,
    title: 'Try 3 Classes for Free',
    desc: 'See how your child responds to the teacher before deciding on any monthly plan.',
  },
];
</script>
