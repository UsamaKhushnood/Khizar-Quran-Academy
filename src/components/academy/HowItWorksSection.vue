<template>
  <section id="how-it-works" class="py-16 md:py-24 bg-white border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
          Simple 4-Step Process
        </p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          How learning with Khizar Quran Academy works.
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          We designed our process to be completely straightforward. No complicated software, no hidden costs, and total flexibility for parents.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CCard
          v-for="(step, idx) in steps"
          :key="step.num"
          hide-header
          class="relative p-6 rounded-2xl bg-[#FCFCFA] border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between py-6 gap-0"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="w-10 h-10 rounded-xl bg-[#0E6245]/10 text-[#0E6245] flex items-center justify-center">
                <component :is="step.icon" class="w-5 h-5" />
              </span>
              <span class="text-2xl font-mono font-bold text-stone-300">
                {{ step.num }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-[#14241E] mb-2">
              {{ step.title }}
            </h3>
            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {{ step.desc }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#0E6245]">
            <span>Step {{ idx + 1 }} of 4</span>
          </div>
        </CCard>
      </div>

      <div class="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0E6245] to-[#144733] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div class="space-y-1 text-center sm:text-left">
          <h4 class="text-xl font-bold">Ready to try your first lesson for free?</h4>
          <p class="text-sm text-emerald-100">
            Set up your student profile in 60 seconds and meet your teacher tomorrow.
          </p>
        </div>
        <Button
          @click="openTrialBooking"
          class="px-6 py-3 h-auto bg-white text-[#0E6245] hover:bg-emerald-50 font-semibold text-sm rounded-xl shadow-sm whitespace-nowrap flex items-center gap-2"
        >
          <span>Book 3 Free Classes</span>
          <ArrowRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { UserPlus, CalendarCheck, Video, CreditCard, ArrowRight } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import CCard from '@/components/common/CCard.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

const steps = computed(() => [
  {
    num: '01',
    title: 'Create Your Free Account',
    desc: 'Takes less than a minute. Sign up with just your name, email, and password. No credit card or payment info is ever required.',
    icon: UserPlus,
  },
  {
    num: '02',
    title: 'Select Teacher & Time',
    desc: `Pick your preference for a male or female teacher, and choose morning, afternoon, or evening slots in ${store.region.primaryTimezone}.`,
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
    title: 'Flat $30 Monthly Tuition',
    desc: 'If you love the experience, continue on our simple $30/month flat plan (4 days a week, 30 min each at your chosen time). Cancel or pause anytime.',
    icon: CreditCard,
  },
]);

function openTrialBooking() {
  router.push(store.currentUser ? '/onboarding' : '/signup');
}
</script>
