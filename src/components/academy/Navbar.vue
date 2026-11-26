<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
    <div class="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
      <button
        type="button"
        @click="navigateTo('/')"
        class="flex items-center gap-2.5 text-left font-bold tracking-tight text-[#14241E] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer min-w-0"
      >
        <span class="w-8 h-8 rounded-lg bg-[#0E6245] text-white flex items-center justify-center font-serif text-lg shadow-xs shrink-0">
          خ
        </span>
        <span class="flex flex-col min-w-0">
          <span class="text-base sm:text-lg font-bold leading-tight truncate">Khizar Quran Academy</span>
          <span class="text-[10px] uppercase tracking-wider text-[#0E6245] font-semibold hidden sm:block">
            Online Quran Classes
          </span>
        </span>
      </button>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
        <button
          type="button"
          @click="navigateTo('/courses')"
          class="hover:text-[#0E6245] transition-colors whitespace-nowrap cursor-pointer"
        >
          Courses
        </button>
        <button
          type="button"
          @click="navigateTo('/how-it-works')"
          class="hover:text-[#0E6245] transition-colors whitespace-nowrap cursor-pointer"
        >
          How it works
        </button>
        <button
          type="button"
          @click="navigateTo('/faqs')"
          class="hover:text-[#0E6245] transition-colors whitespace-nowrap cursor-pointer"
        >
          FAQs
        </button>
      </nav>

      <div class="flex items-center gap-2 shrink-0">
        <Button
          @click="navigateTo('/signup')"
          class="px-3 py-2 sm:px-5 sm:py-2.5 h-auto text-xs sm:text-sm font-bold text-white bg-[#0E6245] hover:bg-[#0b4d36] rounded-xl shadow-xs hover:shadow-md flex items-center gap-1.5 whitespace-nowrap"
        >
          <span class="sm:hidden">Free Trial</span>
          <span class="hidden sm:inline">Book 3 Free Classes</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
          aria-label="Toggle Navigation Menu"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </Button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 shadow-lg">
      <button
        type="button"
        @click="navigateTo('/courses')"
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
      >
        Courses
      </button>
      <button
        type="button"
        @click="navigateTo('/how-it-works')"
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
      >
        How it works
      </button>
      <button
        type="button"
        @click="navigateTo('/faqs')"
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
      >
        FAQs
      </button>
      <div class="pt-2 border-t border-stone-100">
        <Button
          @click="navigateTo('/signup')"
          class="w-full py-3 h-auto text-center text-xs sm:text-sm font-bold bg-[#0E6245] hover:bg-[#0b4d36] text-white rounded-xl shadow-xs"
        >
          Book 3 Free Classes
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, X, ArrowRight } from '@lucide/vue';
import { Button } from '@/components/ui/button';

const router = useRouter();
const mobileMenuOpen = ref(false);

function navigateTo(path: string) {
  mobileMenuOpen.value = false;
  router.push(path);
}
</script>
