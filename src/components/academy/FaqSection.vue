<template>
  <section id="faq" class="py-16 md:py-24 bg-[#FAF9F5] border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <p class="text-xs font-semibold uppercase tracking-wider text-[#0E6245] mb-2 flex items-center justify-center gap-1.5">
          <HelpCircle class="w-4 h-4 text-[#D49A3D]" />
          <span>Common Questions</span>
        </p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p class="mt-3 text-sm text-stone-600 leading-relaxed">
          Everything you need to know about our one-to-one classes, teachers, and trial lessons.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, idx) in FAQ_ITEMS"
          :key="idx"
          class="rounded-xl border border-stone-200/90 bg-white overflow-hidden transition-all shadow-xs"
        >
          <button
            type="button"
            @click="openIndex = openIndex === idx ? null : idx"
            class="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors"
          >
            <span class="text-sm sm:text-base font-bold text-[#14241E]">
              {{ item.q }}
            </span>
            <ChevronDown
              :class="[
                'w-4 h-4 text-stone-500 transition-transform duration-200 shrink-0',
                openIndex === idx ? 'rotate-180 text-[#0E6245]' : '',
              ]"
            />
          </button>
          <div
            v-if="openIndex === idx"
            class="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100"
          >
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, HelpCircle } from '@lucide/vue';
import { FAQ_ITEMS } from '@/data/academyData';

const openIndex = ref<number | null>(0);
</script>
