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
          <span class="text-emerald-400 font-semibold">Terms and Conditions</span>
        </div>

        <div class="container">
          <Badge class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E6245] text-emerald-200 text-xs font-semibold mb-4 border border-emerald-700/60">
            <Scale class="w-3.5 h-3.5" />
            <span>Academic Agreement</span>
          </Badge>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms and Conditions
          </h1>
          <p class="text-sm sm:text-base text-stone-300 leading-relaxed">
            These terms govern student enrolment, class scheduling, attendance, and flat monthly tuition at Khizar Quran Academy.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-6 text-xs text-stone-400 border-t border-stone-800 pt-4">
            <span><strong>Effective Date:</strong> November 2026</span>
            <span><strong>Applies to:</strong> khizarquranacademy.com</span>
            <span><strong>Governing Law:</strong> International Online Education Standards</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside class="hidden lg:block lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            <div class="border-l-2 border-stone-200 pl-4 space-y-2.5 text-xs text-stone-600">
              <p class="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-2">Agreement Index</p>
              <button v-for="sec in toc" :key="sec.id" type="button" @click="scrollToSection(sec.id)" class="block text-left hover:text-[#0E6245] transition-colors cursor-pointer">
                {{ sec.label }}
              </button>
            </div>

            <div class="p-5 rounded-2xl bg-[#0E6245]/5 border border-[#0E6245]/20 text-xs space-y-3">
              <p class="font-bold text-[#0E6245]">Questions about our terms?</p>
              <p class="text-stone-600 leading-relaxed">Our admissions office is happy to explain any details to parents.</p>
              <div class="pt-1 space-y-1.5 text-stone-700 font-medium">
                <div class="flex items-center gap-2"><Phone class="w-3.5 h-3.5 text-[#0E6245]" /><span>+92 331 4278863</span></div>
                <div class="flex items-center gap-2"><Mail class="w-3.5 h-3.5 text-[#0E6245]" /><span>support@khizarquranacademy.com</span></div>
              </div>
            </div>
          </div>
        </aside>

        <main class="lg:col-span-8 space-y-10 text-sm sm:text-base text-stone-700 leading-relaxed">
          <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
            <div class="flex items-center gap-2 font-bold text-emerald-900">
              <CheckCircle2 class="w-4 h-4 text-[#0E6245]" />
              <span>Core Agreement Highlights</span>
            </div>
            <p>
              Khizar Quran Academy delivers live 1-on-1 Quran education over video call. Every family receives 3 free trial classes before subscribing. Tuition is flat $30 USD / PKR 10,000 monthly for 4 days a week with zero long-term commitment.
            </p>
          </div>

          <section id="terms-1" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">1. Acceptance of Terms</h2>
            <p>By creating an account, registering for trial classes, or paying tuition on <strong>khizarquranacademy.com</strong>, you ("Parent", "Student", or "User") agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
            <p class="text-stone-600 text-sm">If registering on behalf of a minor child, you certify that you are the parent or legal adult guardian authorized to enroll the child.</p>
          </section>

          <section id="terms-2" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">2. Class Format & Free Trial Classes</h2>
            <p>All instruction is conducted live one-on-one (1 student, 1 certified teacher) via Google Meet or Zoom. Each lesson is exactly 30 minutes in length.</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li><strong>3 Free Classes:</strong> Every new student receives 3 full 30-minute trial classes with no payment details requested.</li>
              <li><strong>Schedule:</strong> Classes run 4 days per week at the student's chosen time slot agreed with the coordinator.</li>
              <li><strong>Tutor Selection:</strong> Parents may request a certified female teacher for daughters and younger kids, or a male scholar for sons and brothers.</li>
            </ul>
          </section>

          <section id="terms-3" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">3. Monthly Tuition & 2Checkout Payment Processing</h2>
            <p>Tuition is billed as a flat, single monthly fee of <strong>$30 USD per student per course</strong> (or PKR 10,000 for Pakistan, $40 CAD for Canada, and AED 135 for UAE):</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li>Payments are processed securely through our authorized payment partner, <strong>2Checkout (Verifone)</strong>, via recurring monthly subscription (2Subscribe plan).</li>
              <li>There are no registration fees, book fees, or hidden charges.</li>
              <li>You may cancel or pause your monthly subscription at any time without penalty prior to the next billing date.</li>
              <li>Covered by a <strong>7-Day Full Money-Back Guarantee</strong> after your first payment.</li>
            </ul>
          </section>

          <section id="terms-4" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">4. Attendance, Rescheduling & Make-Up Lessons</h2>
            <p>To maintain continuity and respect teachers' scheduled time:</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li>Students should join the video meeting punctually at their designated lesson time.</li>
              <li>If you need to reschedule a class due to illness, exams, or family travel, notify your coordinator at least 4 hours in advance to receive a make-up session.</li>
              <li>If a teacher is unable to attend due to technical or emergency reasons, the class will be rescheduled or covered by a qualified substitute.</li>
            </ul>
          </section>

          <section id="terms-5" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">5. Code of Conduct & Etiquette</h2>
            <p>The Quran is the sacred book of Allah, and our virtual classrooms uphold respectful Islamic decorum:</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li>Students and instructors are expected to interact with kindness, patience, and mutual respect.</li>
              <li>Modest dress code is observed in all sessions by both teachers and students.</li>
              <li>Classes must be conducted in a quiet, conducive home learning environment.</li>
            </ul>
          </section>

          <section id="terms-6" class="space-y-3 scroll-mt-24 pt-2">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">6. Contact & Academic Administration</h2>
            <p>For any questions regarding your enrollment, class schedule, or billing terms:</p>
            <div class="p-6 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 text-sm">
              <p class="font-bold text-stone-900">Khizar Quran Academy</p>
              <p class="text-stone-600">Email: support@khizarquranacademy.com</p>
              <p class="text-stone-600">Direct Phone / WhatsApp: +92 331 4278863</p>
              <p class="text-stone-500 text-xs pt-2">Website: khizarquranacademy.com</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft, CheckCircle2, Phone, Mail, Scale } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';

const router = useRouter();

const toc = [
  { id: 'terms-1', label: '1. Acceptance of Terms' },
  { id: 'terms-2', label: '2. Class Format & Free Trial' },
  { id: 'terms-3', label: '3. Monthly Tuition & 2Checkout Billing' },
  { id: 'terms-4', label: '4. Attendance & Make-Up Lessons' },
  { id: 'terms-5', label: '5. Student Conduct & Respect' },
  { id: 'terms-6', label: '6. Contact & Dispute Resolution' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>
