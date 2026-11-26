<template>
  <section id="courses" class="py-16 md:py-24 bg-[#FCFCFA] border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2">
          Structured Islamic Curriculum
        </p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          From absolute beginner to fluent recitation.
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          Every child and adult learns differently. Our teachers adjust to each student’s speed, ensuring sound Tajweed foundations without rushing.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <CCard
          v-for="course in COURSES_CATALOG"
          :key="course.id"
          hide-header
          @click="selectedCourseId = course.id"
          :class="[
            'p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between py-6 gap-0',
            selectedCourseId === course.id
              ? 'bg-white border-[#0E6245] shadow-lg ring-1 ring-[#0E6245]/20'
              : 'bg-white/80 hover:bg-white border-stone-200/90 shadow-xs hover:shadow-md',
          ]"
        >
          <div>
            <div class="flex items-center justify-between gap-3 mb-3">
              <Badge class="text-xs font-bold text-[#0E6245] bg-[#0E6245]/10 hover:bg-[#0E6245]/15 border-0 px-2.5 py-1 rounded-md">
                {{ course.badge }}
              </Badge>
              <div class="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <Clock class="w-3.5 h-3.5" />
                <span>{{ course.duration }}</span>
              </div>
            </div>

            <h3 class="text-xl font-bold text-[#14241E] mb-1">
              {{ course.title }}
            </h3>
            <p class="text-xs font-medium text-[#D49A3D] mb-3">
              {{ course.subtitle }}
            </p>
            <p class="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
              {{ course.description }}
            </p>

            <div class="space-y-2 mb-6">
              <p class="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Key Outcomes:
              </p>
              <div
                v-for="(outcome, idx) in course.learningOutcomes"
                :key="idx"
                class="flex items-start gap-2 text-xs text-stone-700"
              >
                <Check class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{{ outcome }}</span>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div class="flex items-center gap-1.5 text-xs text-stone-500">
              <Users class="w-3.5 h-3.5 text-stone-400" />
              <span>{{ course.audience }}</span>
            </div>
            <button
              type="button"
              @click.stop="openTrialBooking"
              class="text-xs font-bold text-[#0E6245] hover:text-[#0b4d36] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Start This Course</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </CCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Check, Clock, Users, ArrowRight } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import CCard from '@/components/common/CCard.vue';
import { COURSES_CATALOG } from '@/data/academyData';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();
const selectedCourseId = ref('noorani_qaida');

function openTrialBooking() {
  router.push(store.currentUser ? '/onboarding' : '/signup');
}
</script>
