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
          <span class="text-emerald-400 font-semibold">Privacy Policy</span>
        </div>

        <div class="container">
          <Badge class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E6245] text-emerald-200 text-xs font-semibold mb-4 border border-emerald-700/60">
            <Shield class="w-3.5 h-3.5" />
            <span>Student Privacy & Data Protection</span>
          </Badge>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p class="text-sm sm:text-base text-stone-300 leading-relaxed">
            We take the privacy and safety of our students and their families very seriously. This policy describes how Khizar Quran Academy collects, uses, and safeguards your personal information.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-6 text-xs text-stone-400 border-t border-stone-800 pt-4">
            <span><strong>Effective Date:</strong> November 2026</span>
            <span><strong>Applies to:</strong> khizarquranacademy.com</span>
            <span><strong>Compliance:</strong> COPPA & Child Safety Standards</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside class="hidden lg:block lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            <div class="border-l-2 border-stone-200 pl-4 space-y-2.5 text-xs text-stone-600">
              <p class="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-2">Table of Contents</p>
              <button v-for="sec in toc" :key="sec.id" type="button" @click="scrollToSection(sec.id)" class="block text-left hover:text-[#0E6245] transition-colors cursor-pointer">
                {{ sec.label }}
              </button>
            </div>

            <div class="p-5 rounded-2xl bg-[#0E6245]/5 border border-[#0E6245]/20 text-xs space-y-3">
              <p class="font-bold text-[#0E6245]">Questions about your privacy?</p>
              <p class="text-stone-600 leading-relaxed">
                Our admissions and data protection officer is available to help parents at any time.
              </p>
              <div class="pt-1 space-y-1.5 text-stone-700 font-medium">
                <div class="flex items-center gap-2"><Phone class="w-3.5 h-3.5 text-[#0E6245]" /><span>+92 331 4278863</span></div>
                <div class="flex items-center gap-2"><Mail class="w-3.5 h-3.5 text-[#0E6245]" /><span>support@khizarquranacademy.com</span></div>
              </div>
            </div>
          </div>
        </aside>

        <main class="lg:col-span-8 space-y-10 text-sm sm:text-base text-stone-700 leading-relaxed">
          <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 leading-relaxed">
            <strong>Summary in Plain English:</strong> We collect only what is strictly necessary to schedule your 1-on-1 Quran classes. We never sell your personal data, we never record private student video calls without explicit parental permission, and credit card payments are handled securely by Verifone / 2Checkout.
          </div>

          <section id="sec-1" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">1. Information We Collect</h2>
            <p>When you create an account or request trial classes on <strong>khizarquranacademy.com</strong>, we collect only the information necessary to provide Quran tutoring services:</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li><strong>Parent or Guardian Name:</strong> Used to identify account ownership and billing contact.</li>
              <li><strong>Email Address:</strong> Used for account login, class schedule updates, and payment receipts.</li>
              <li><strong>Phone / WhatsApp Number:</strong> Used by your academic coordinator for class reminders and urgent teacher communications.</li>
              <li><strong>Student Information:</strong> First name, approximate age, and current Quran reading level (e.g. Noorani Qaida beginner or Hifz).</li>
              <li><strong>Class Preferences:</strong> Preferred time zone, preferred time slot, and teacher gender preference (male or female teacher).</li>
            </ul>
            <p class="text-xs text-stone-500 italic mt-2">We do NOT collect government identification, social security numbers, or sensitive financial data on our servers.</p>
          </section>

          <section id="sec-2" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">2. How We Use Your Information</h2>
            <p>We use your information exclusively for educational and administrative purposes:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs">
                <strong class="text-stone-900 block mb-1">Class Matching & Scheduling</strong>
                Matching your student with a verified female or male teacher in your exact time zone.
              </div>
              <div class="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs">
                <strong class="text-stone-900 block mb-1">Lesson Coordination</strong>
                Sending Google Meet or Zoom classroom links prior to each scheduled lesson.
              </div>
              <div class="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs">
                <strong class="text-stone-900 block mb-1">Progress Reports</strong>
                Sharing teacher feedback on Tajweed rules and Surah memorization progress with parents.
              </div>
              <div class="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 text-xs">
                <strong class="text-stone-900 block mb-1">Billing Administration</strong>
                Processing monthly tuition after trial completion with 2Checkout / Verifone.
              </div>
            </div>
          </section>

          <section id="sec-3" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">3. Student Safety & Children's Privacy (COPPA Compliance)</h2>
            <p>Many of our students are under the age of 18. Protecting young learners is our highest priority:</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li>Accounts must be created and supervised by a <strong>parent or adult legal guardian</strong>.</li>
              <li>Teachers are subject to strict vetting, character references, and identity checks before interacting with students.</li>
              <li>Parents are always encouraged to sit in or observe their child's video lessons at any time.</li>
              <li>We do not display students' full legal identities or personal contact information publicly.</li>
            </ul>
          </section>

          <section id="sec-4" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">4. Payment Security & 2Checkout / Verifone</h2>
            <p>All credit and debit card transactions for subscriptions and monthly tuition are processed externally by <strong>2Checkout (Verifone)</strong>, an authorized PCI-DSS Level 1 certified payment service provider.</p>
            <p class="text-sm text-stone-600">Khizar Quran Academy never stores, handles, or accesses your credit card number, CVV code, or card expiration details. All payment processing occurs under industry-standard TLS/SSL encryption directly on 2Checkout's secure payment infrastructure.</p>
          </section>

          <section id="sec-5" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">5. Live Video Class Privacy</h2>
            <p>Classes are conducted live over <strong>Google Meet or Zoom</strong> between one student and their assigned teacher.</p>
            <ul class="list-disc pl-6 space-y-2 text-stone-600 text-sm">
              <li>We do <strong>NOT</strong> record live video or audio sessions without explicit written consent from the parent.</li>
              <li>Meeting room links are unique, password-protected, and shared exclusively between the student's family and the designated teacher.</li>
              <li>Female tutors adhere strictly to Islamic modest dress codes, ensuring complete privacy and comfort for sisters and young girls.</li>
            </ul>
          </section>

          <section id="sec-6" class="space-y-3 scroll-mt-24 border-b border-stone-200 pb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">6. Data Retention & Your Rights</h2>
            <p>You retain complete control over your personal data. At any time, you have the right to:</p>
            <ul class="list-disc pl-6 space-y-1.5 text-stone-600 text-sm">
              <li>Request a copy of the personal information we hold about you.</li>
              <li>Request corrections to your contact information or student profile.</li>
              <li>Request the complete deletion of your account and student records upon discontinuing classes.</li>
            </ul>
          </section>

          <section id="sec-7" class="space-y-3 scroll-mt-24 pt-2">
            <h2 class="text-xl sm:text-2xl font-bold text-[#14241E]">7. Contact Our Privacy Officer</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or your child's data, please contact our administrative office:</p>
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
import { ArrowLeft, Shield, Phone, Mail } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';

const router = useRouter();

const toc = [
  { id: 'sec-1', label: '1. Information We Collect' },
  { id: 'sec-2', label: '2. How We Use Your Information' },
  { id: 'sec-3', label: "3. Student Safety & Children's Privacy" },
  { id: 'sec-4', label: '4. Payment Security & 2Checkout' },
  { id: 'sec-5', label: '5. Live Video Class Privacy' },
  { id: 'sec-6', label: '6. Data Retention & Deletion' },
  { id: 'sec-7', label: '7. Contact Our Privacy Officer' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
</script>
