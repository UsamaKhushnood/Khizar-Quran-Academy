<template>
  <section id="classroom-demo" class="py-16 md:py-24 bg-[#FAF9F5] border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-12">
        <Badge variant="outline" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E6245] uppercase tracking-wider mb-3 bg-[#0E6245]/10 border-0 px-3 py-1 rounded-md">
          <Sparkles class="w-3.5 h-3.5 text-[#D49A3D]" />
          <span>Interactive Tajweed & Pronunciation Tool</span>
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          Explore our interactive Noorani Qaida alphabet guide.
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          Try clicking any Arabic letter below to hear authentic human pronunciation and review articulation points (<em>Makharij</em>).
          In our academy, certified teachers work with your child 1-on-1 over <strong>Google Meet or Zoom</strong> to perfect each sound.
        </p>
      </div>

      <div class="bg-[#14241E] rounded-2xl shadow-xl border border-stone-800 overflow-hidden text-stone-100">
        <div class="bg-[#0D1814] px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span class="font-semibold text-white">Noorani Qaida & Makharij Pronunciation Demo</span>
          </div>

          <div class="flex items-center gap-3 text-stone-300">
            <div class="flex items-center gap-1.5 bg-[#14241E] px-3 py-1 rounded-lg border border-stone-700 text-[11px]">
              <Video class="w-3.5 h-3.5 text-emerald-400" />
              <span>Live 1-on-1 Classes Held on <strong>Google Meet & Zoom</strong></span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
          <div class="lg:col-span-5 p-5 sm:p-6 bg-[#162921] flex flex-col justify-between space-y-6">
            <div>
              <div class="relative rounded-xl overflow-hidden border border-stone-700 bg-stone-900 aspect-16/10 shadow-lg">
                <img
                  :src="classroomImgSrc"
                  @error="onImgError"
                  alt="One-on-one Quran learning over video call"
                  class="w-full h-full object-cover"
                  referrerpolicy="no-referrer"
                />
                <div class="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs flex items-center justify-between">
                  <span class="text-stone-300">Live 1-on-1 via Google Meet / Zoom</span>
                  <span class="text-emerald-400 font-semibold">30 Min Lessons</span>
                </div>
              </div>

              <div class="mt-5 p-4 rounded-xl bg-[#0D1814] border border-stone-700">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Selected Letter</p>
                    <h4 class="text-xl font-bold text-white">
                      {{ selectedLetter.name }} ({{ selectedLetter.transliteration }})
                    </h4>
                  </div>
                  <div class="w-16 h-16 rounded-xl bg-[#0E6245]/40 border border-[#0E6245] flex items-center justify-center text-4xl font-arabic text-emerald-300 shadow-xs">
                    {{ selectedLetter.arabic }}
                  </div>
                </div>

                <div class="mt-4 pt-3 border-t border-stone-800 space-y-2 text-xs">
                  <div>
                    <span class="text-stone-400 font-medium">Makhraj (Articulation Origin):</span>
                    <p class="text-emerald-300 font-semibold mt-0.5">{{ selectedLetter.makhraj }}</p>
                  </div>
                  <div>
                    <span class="text-stone-400 font-medium">Teacher’s Guidance Tip:</span>
                    <p class="text-stone-300 mt-0.5 leading-relaxed">{{ selectedLetter.tip }}</p>
                  </div>
                </div>

                <Button
                  @click="handleLetterClick(selectedLetter)"
                  class="mt-4 w-full py-2.5 h-auto bg-[#0E6245] hover:bg-[#0b4d36] text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 shadow-xs"
                >
                  <Volume2 :class="['w-4 h-4', isPlayingAudio ? 'animate-bounce text-emerald-300' : '']" />
                  <span>Play Audio Pronunciation ({{ selectedLetter.name }})</span>
                </Button>
              </div>
            </div>

            <div class="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 text-xs space-y-1">
              <div class="flex items-center gap-1.5 text-stone-200 font-medium">
                <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>How 1-on-1 sessions work:</span>
              </div>
              <p class="text-stone-400 text-[11px] leading-relaxed">
                Your child shares the screen with their teacher on Google Meet or Zoom, repeating sounds until pronunciation is confident and accurate.
              </p>
            </div>
          </div>

          <div class="lg:col-span-7 p-5 sm:p-6 bg-[#0E1B15] flex flex-col justify-between">
            <div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <div>
                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>Noorani Qaida Letters</span>
                    <span class="text-[11px] font-normal text-stone-400">(Click any letter to hear recitation)</span>
                  </h3>
                </div>

                <div class="flex items-center gap-1 bg-[#14241E] p-1 rounded-lg border border-stone-800 text-xs">
                  <button
                    v-for="tab in filterTabs"
                    :key="tab.id"
                    type="button"
                    @click="activeFilter = tab.id"
                    :title="tab.title"
                    :class="[
                      'px-2.5 py-1 rounded transition-colors cursor-pointer',
                      activeFilter === tab.id ? 'bg-[#0E6245] text-white font-semibold' : 'text-stone-400 hover:text-white',
                    ]"
                  >
                    {{ tab.label }}
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3 py-5" dir="rtl">
                <button
                  v-for="item in filteredLetters"
                  :key="item.id"
                  type="button"
                  @click="handleLetterClick(item)"
                  :class="[
                    'group p-3 rounded-xl transition-all flex flex-col items-center justify-center cursor-pointer border',
                    selectedLetter.id === item.id
                      ? 'bg-[#0E6245] border-[#D49A3D] text-white ring-2 ring-[#D49A3D]/40 shadow-lg scale-105'
                      : 'bg-[#14241E] hover:bg-[#1C332A] border-stone-800 text-stone-200 hover:border-emerald-700/50',
                  ]"
                >
                  <span class="text-3xl sm:text-4xl font-arabic leading-tight select-none group-hover:scale-110 transition-transform">
                    {{ item.arabic }}
                  </span>
                  <span class="text-[10px] text-stone-400 font-sans mt-1 group-hover:text-stone-200">
                    {{ item.transliteration }}
                  </span>
                </button>
              </div>
            </div>

            <div class="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-2 text-xs text-stone-300">
                <Info class="w-4 h-4 text-[#D49A3D] shrink-0" />
                <span>
                  New students can try 3 classes for free before deciding on any monthly study plan.
                </span>
              </div>
              <Button
                @click="openTrialBooking"
                class="px-5 py-2.5 h-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg whitespace-nowrap shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>Book 3 Free Classes</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Volume2, Sparkles, Video, CheckCircle2, Info, ArrowRight } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NOORANI_QAIDA_LESSON_1 } from '@/data/academyData';
import type { QaidaItem } from '@/types/academy';
import { soundManager } from '@/utils/audioSound';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

const selectedLetter = ref<QaidaItem>(NOORANI_QAIDA_LESSON_1[0]);
const activeFilter = ref<'all' | 'heavy' | 'throat' | 'lips'>('all');
const isPlayingAudio = ref(false);
const classroomImgSrc = ref('/images/classroom.jpg');

const filterTabs = [
  { id: 'all' as const, label: 'All 29', title: 'All 29 Arabic Letters' },
  { id: 'heavy' as const, label: 'Heavy', title: "Bold / Heavy letters (Musta'liyah)" },
  { id: 'throat' as const, label: 'Throat', title: 'Throat letters (Halqiyyah)' },
  { id: 'lips' as const, label: 'Lips', title: 'Lip letters (Shafawiyyah)' },
];

const filteredLetters = computed(() =>
  NOORANI_QAIDA_LESSON_1.filter((item) => {
    if (activeFilter.value === 'heavy') {
      return ['خ', 'ص', 'ض', 'ط', 'ظ', 'غ', 'ق'].includes(item.arabic);
    }
    if (activeFilter.value === 'throat') {
      return ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'].includes(item.arabic);
    }
    if (activeFilter.value === 'lips') {
      return ['ب', 'م', 'و', 'ف'].includes(item.arabic);
    }
    return true;
  })
);

function handleLetterClick(item: QaidaItem) {
  selectedLetter.value = item;
  isPlayingAudio.value = true;
  soundManager.playLetter(item.audioFile, item.fullArabicName, item.name);
  setTimeout(() => {
    isPlayingAudio.value = false;
  }, 1200);
}

function onImgError() {
  if (!classroomImgSrc.value.includes('classroom_one_on_one')) {
    classroomImgSrc.value = '/images/classroom_one_on_one_1794404766060.jpg';
  }
}

function openTrialBooking() {
  router.push(store.currentUser ? '/onboarding' : '/signup');
}
</script>
