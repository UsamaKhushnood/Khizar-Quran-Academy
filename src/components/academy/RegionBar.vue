<template>
  <div class="bg-[#14241E] text-[#E6E4DC] text-xs py-1.5 sm:py-2 px-3 sm:px-6 border-b border-[#23382F]">
    <div class="container mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <div class="flex items-center gap-1.5 sm:gap-2 text-stone-200 min-w-0">
        <Clock class="w-3.5 h-3.5 text-[#D49A3D] shrink-0" />
        <span class="hidden sm:inline font-medium text-xs">
          Pakistan Local Time:
        </span>
        <span class="font-mono font-bold text-white bg-black/30 px-2 py-0.5 rounded text-[11px] sm:text-xs tracking-wider whitespace-nowrap">
          {{ pakistanTime || 'Loading...' }} PKT
        </span>
        <span class="hidden md:inline text-stone-400 text-[11px]">
          · Academy Headquarters (Lahore, Pakistan)
        </span>
      </div>

      <div class="hidden lg:flex items-center gap-2 text-stone-300 text-[11px]">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span class="text-[#D49A3D] font-medium">3 Free Trial Classes</span>
        <span>· Live 1-on-1 Classes with Real Teachers</span>
      </div>

      <div class="flex items-center gap-3 sm:gap-4 shrink-0">
        <a
          href="https://wa.me/923314278863"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition-colors text-[11px] sm:text-xs font-medium"
          title="Chat on WhatsApp"
        >
          <IconBrandWhatsapp class="w-4 h-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <a
          href="tel:+923314278863"
          class="flex items-center gap-1.5 text-white hover:text-emerald-300 transition-colors text-[11px] sm:text-xs font-medium"
          title="Call Owner / Admissions Office"
        >
          <Phone class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
          <span class="font-mono font-semibold">+92 331 4278863</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Clock, Phone } from '@lucide/vue';
import { IconBrandWhatsapp } from '@tabler/icons-vue';

const pakistanTime = ref('');
let intervalId: ReturnType<typeof setInterval> | null = null;

function updateTime() {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    pakistanTime.value = formatter.format(new Date());
  } catch {
    pakistanTime.value = new Date().toLocaleTimeString();
  }
}

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
