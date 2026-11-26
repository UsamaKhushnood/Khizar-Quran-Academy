<template>
  <footer class="bg-[#14241E] text-stone-300 pt-16 pb-12 border-t border-stone-800">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
        <div class="space-y-4">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-lg bg-[#0E6245] text-white flex items-center justify-center font-serif text-lg">
              خ
            </span>
            <span class="text-xl font-bold tracking-tight text-white">
              Khizar Quran Academy
            </span>
          </div>

          <p class="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Live 1-on-1 Quran classes held over video call for children and adults. Connecting Muslim families in the USA, Canada, Dubai, and Pakistan with certified, patient teachers.
          </p>

          <div class="pt-2 text-xs text-stone-300 space-y-2">
            <a href="tel:+923314278863" class="flex items-center gap-2 hover:text-white transition-colors">
              <Phone class="w-3.5 h-3.5 text-emerald-400" />
              <span class="font-mono">+92 331 4278863</span>
            </a>
            <a
              href="https://wa.me/923314278863"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageSquare class="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Admissions: +92 331 4278863</span>
            </a>
            <div class="flex items-center gap-2 text-stone-400">
              <Mail class="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>support@khizarquranacademy.com</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">
            Quran Courses
          </h4>
          <ul class="space-y-2 text-xs text-stone-400">
            <li>
              <button type="button" @click="go('/courses')" class="hover:text-white transition-colors cursor-pointer text-left">
                Noorani Qaida (Beginners)
              </button>
            </li>
            <li>
              <button type="button" @click="go('/courses')" class="hover:text-white transition-colors cursor-pointer text-left">
                Quran Reading with Tajweed & Nazra
              </button>
            </li>
            <li>
              <button type="button" @click="go('/courses')" class="hover:text-white transition-colors cursor-pointer text-left">
                Hifz — Quran Memorization
              </button>
            </li>
            <li>
              <button type="button" @click="go('/courses')" class="hover:text-white transition-colors cursor-pointer text-left">
                Islamic Studies & Duas for Kids
              </button>
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">
            Navigation
          </h4>
          <ul class="space-y-2 text-xs text-stone-400">
            <li>
              <button type="button" @click="go('/courses')" class="hover:text-white transition-colors cursor-pointer">
                Courses
              </button>
            </li>
            <li>
              <button type="button" @click="go('/how-it-works')" class="hover:text-white transition-colors cursor-pointer">
                How Classes Work
              </button>
            </li>
            <li>
              <button type="button" @click="scrollToSection('classroom-demo')" class="hover:text-white transition-colors cursor-pointer">
                Interactive Tajweed Tool
              </button>
            </li>
            <li>
              <button type="button" @click="go('/pricing')" class="hover:text-white transition-colors cursor-pointer">
                Single Monthly Plan (4 Days/Wk)
              </button>
            </li>
            <li>
              <button type="button" @click="go('/faqs')" class="hover:text-white transition-colors cursor-pointer">
                Frequently Asked Questions
              </button>
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">
            Policies & Legal
          </h4>
          <p class="text-xs text-stone-400 leading-relaxed">
            Transparent terms and disclosures for student safety, family satisfaction, and secure card processing.
          </p>
          <div class="space-y-2.5 pt-1 text-xs">
            <button
              type="button"
              @click="go('/privacy')"
              class="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Shield class="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
            <button
              type="button"
              @click="go('/terms')"
              class="flex items-center gap-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <FileText class="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Terms and Conditions</span>
            </button>
            <button
              type="button"
              @click="go('/refund')"
              class="flex items-center gap-2 text-[#D49A3D] hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RefreshCw class="w-3.5 h-3.5" />
              <span>Refund Policy</span>
            </button>
          </div>
          <div class="pt-2 text-[11px] text-stone-500">
            <span>Secure card processing via 2Checkout / Verifone</span>
          </div>
        </div>
      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© {{ currentYear }} Khizar Quran Academy (khizarquranacademy.com). All rights reserved.</p>
        <div class="flex items-center gap-4 text-xs">
          <button type="button" @click="go('/privacy')" class="hover:text-stone-300 cursor-pointer">
            Privacy Policy
          </button>
          <span>·</span>
          <button type="button" @click="go('/terms')" class="hover:text-stone-300 cursor-pointer">
            Terms and Conditions
          </button>
          <span>·</span>
          <button type="button" @click="go('/refund')" class="hover:text-stone-300 cursor-pointer">
            Refund Policy
          </button>
          <span>·</span>
          <a href="tel:+923314278863" class="hover:text-stone-300">
            +92 331 4278863
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Phone, Mail, MessageSquare, Shield, FileText, RefreshCw } from '@lucide/vue';

const router = useRouter();
const currentYear = new Date().getFullYear();

function go(path: string) {
  router.push(path);
}

async function scrollToSection(id: string) {
  await router.push('/');
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 80);
}
</script>
