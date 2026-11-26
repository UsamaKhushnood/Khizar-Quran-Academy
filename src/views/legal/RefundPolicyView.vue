<template>
  <div class="min-h-screen bg-[#FCFCFA] text-[#14241E]">
    <div class="bg-[#14241E] text-white border-b border-stone-800 py-12 md:py-16 px-4 sm:px-6">
      <div class="container mx-auto">
        <div class="flex items-center gap-2 text-xs text-stone-400 mb-6">
          <button type="button" @click="router.push('/')" class="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span>Legal</span>
          <span>/</span>
          <span class="text-[#D49A3D] font-semibold">Refund Policy</span>
        </div>

        <div class="container">
          <Badge class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <RefreshCw class="w-3.5 h-3.5" />
            <span>Transparent Satisfaction Guarantee</span>
          </Badge>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Refund & Cancellation Policy
          </h1>
          <p class="text-sm sm:text-base text-stone-300 leading-relaxed">
            We stand behind our teaching quality. Review our 3-trial risk-free policy, 7-day money-back guarantee, and simple cancellation procedures.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-6 text-xs text-stone-400 border-t border-stone-800 pt-4">
            <span><strong>Effective Date:</strong> November 2026</span>
            <span><strong>Applies to:</strong> All Courses ($30/mo)</span>
            <span><strong>Billing Partner:</strong> 2Checkout / Verifone (2Subscribe)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside class="hidden lg:block lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            <div class="border-l-2 border-stone-200 pl-4 space-y-2.5 text-xs text-stone-600">
              <p class="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-2">Policy Sections</p>
              <button v-for="sec in toc" :key="sec.id" type="button" @click="scrollToSection(sec.id)" class="block text-left hover:text-[#0E6245] transition-colors cursor-pointer">
                {{ sec.label }}
              </button>
            </div>

            <div class="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-3">
              <p class="font-bold text-amber-900">Need billing or refund help?</p>
              <p class="text-stone-600 leading-relaxed">We process requests within 24 hours. Contact our billing coordinator directly.</p>
              <div class="pt-1 space-y-1.5 text-stone-700 font-medium">
                <div class="flex items-center gap-2"><Phone class="w-3.5 h-3.5 text-[#D49A3D]" /><span>+92 331 4278863</span></div>
                <div class="flex items-center gap-2"><Mail class="w-3.5 h-3.5 text-[#D49A3D]" /><span>billing@khizarquranacademy.com</span></div>
              </div>
            </div>
          </div>
        </aside>

        <main class="lg:col-span-8 space-y-10 text-sm sm:text-base text-stone-700 leading-relaxed">
          <div class="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs sm:text-sm text-amber-950 space-y-2">
            <div class="flex items-center gap-2 font-bold text-amber-900">
              <CheckCircle2 class="w-4 h-4 text-[#D49A3D]" />
              <span>Risk-Free Guarantee Summary</span>
            </div>
            <p>
              You never pay a single penny before your <strong>3 free trial classes</strong>. If you decide to enroll on our flat <strong>$30/month plan</strong> and are unsatisfied for any reason, you can request a <strong>100% full refund within 7 days</strong>.
            </p>
          </div>

          <section id="ref-trials" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">1. 3 Free Trial Classes Before Any Payment</h2>
            <p>To ensure total confidence and mutual comfort between student and teacher, Khizar Quran Academy provides 3 complete, live 30-minute one-on-one sessions completely free of charge.</p>
            <ul class="list-disc pl-6 space-y-1.5 text-stone-600 text-sm">
              <li>No credit card, debit card, or banking details are collected before or during the trial.</li>
              <li>If you choose not to continue after the 3 trial lessons, you owe nothing.</li>
              <li>Your account incurs zero automatic renewal or surprise charges.</li>
            </ul>
          </section>

          <section id="ref-guarantee" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">2. 7-Day 100% Money-Back Guarantee</h2>
            <p>Once you complete your trials and make your first monthly payment ($30 USD flat fee, or PKR 10,000 / CAD 40 / AED 135 depending on your region):</p>
            <p class="text-stone-600 text-sm">You are protected by our <strong>7-Day Full Refund Guarantee</strong>. If you feel the teaching method, schedule, or pacing does not fit your family's needs, contact us within 7 days of your payment date, and we will issue a complete 100% refund immediately via 2Checkout / Verifone.</p>
          </section>

          <section id="ref-cancel" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">3. Cancel or Pause Anytime — No Long-Term Contracts</h2>
            <p>Tuition is billed on a month-to-month basis (Verifone 2Subscribe plan). There are no long-term contracts, annual lock-ins, or cancellation penalties:</p>
            <ul class="list-disc pl-6 space-y-1.5 text-stone-600 text-sm">
              <li>You may cancel or pause your subscription at any time before your next monthly renewal date.</li>
              <li>Upon cancellation, your classes continue until the end of the current paid billing cycle.</li>
              <li>No future charges will be billed to your payment card.</li>
            </ul>
          </section>

          <section id="ref-makeup" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">4. Class Rescheduling & Teacher Change Guarantee</h2>
            <p>We understand family schedules, school exams, illness, and travel:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs">
                <strong class="text-stone-900 block mb-1">Make-Up Lessons</strong>
                If you notify your coordinator at least 4 hours in advance, your missed lesson will be rescheduled at your convenience.
              </div>
              <div class="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs">
                <strong class="text-stone-900 block mb-1">Teacher Replacement Guarantee</strong>
                If your child does not feel 100% comfortable with an assigned instructor, we will immediately reassign another certified teacher at no cost.
              </div>
            </div>
          </section>

          <section id="ref-process" class="space-y-3 scroll-mt-24 pt-2">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">5. How to Request a Refund</h2>
            <p>To request a refund or cancel your subscription, simply contact our billing desk with your registered email:</p>
            <div class="p-6 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-sm">
              <p class="font-bold text-stone-900">Khizar Quran Academy Billing Desk</p>
              <p class="text-stone-600">Email: billing@khizarquranacademy.com (or support@khizarquranacademy.com)</p>
              <p class="text-stone-600">Direct Phone / WhatsApp: +92 331 4278863</p>
              <p class="text-stone-500 text-xs pt-2">Refunds are credited back to the original card used on 2Checkout (Verifone) within 3 to 5 business days.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft, RefreshCw, CheckCircle2, Phone, Mail } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';

const router = useRouter();

const toc = [
  { id: 'ref-trials', label: '1. Zero Risk: 3 Free Trials' },
  { id: 'ref-guarantee', label: '2. 7-Day Money-Back Guarantee' },
  { id: 'ref-cancel', label: '3. Subscription Cancellation Anytime' },
  { id: 'ref-makeup', label: '4. Rescheduling & Missed Lessons' },
  { id: 'ref-process', label: '5. How to Request a Refund' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>
