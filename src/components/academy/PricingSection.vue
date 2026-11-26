<template>
  <section id="pricing" class="py-16 md:py-24 bg-white border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-12">
        <Badge variant="outline" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles class="w-3.5 h-3.5 text-[#0E6245]" />
          <span>One Clear Price · No Complicated Tiers</span>
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          Simple, Transparent Monthly Tuition
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          Every course is taught 1-on-1 for <strong>4 days a week</strong> at your child’s own chosen time.
          Includes <strong>3 free trial classes</strong> before you pay a single penny.
        </p>

        <div class="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-stone-100 border border-stone-200 max-w-fit mx-auto">
          <span class="text-[11px] font-semibold text-stone-500 px-2 flex items-center gap-1">
            <Globe class="w-3 h-3 text-[#0E6245]" />
            <span>Currency:</span>
          </span>
          <button
            v-for="c in Object.values(CURRENCIES)"
            :key="c.id"
            type="button"
            @click="selectedCurrencyId = c.id"
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer',
              c.id === currentCurrency.id
                ? 'bg-white text-[#0E6245] shadow-xs ring-1 ring-stone-200'
                : 'text-stone-600 hover:text-stone-900',
            ]"
          >
            <span>{{ c.flag }}</span>
            <span>{{ c.currencyCode }}</span>
          </button>
        </div>
      </div>

      <div class="container mx-auto">
        <CCard
          hide-header
          class="rounded-3xl bg-gradient-to-b from-[#FCFCFA] to-white border-2 border-[#0E6245] shadow-xl p-8 sm:p-10 relative overflow-hidden gap-0"
        >
          <div class="absolute top-0 right-0 bg-[#0E6245] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-xs">
            4 Days / Week · 1-on-1 Classes
          </div>

          <div class="space-y-6">
            <div>
              <Badge class="text-xs font-bold uppercase tracking-wider text-[#0E6245] bg-[#0E6245]/10 hover:bg-[#0E6245]/15 border-0 px-3 py-1 rounded-full">
                All Courses Included
              </Badge>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-[#14241E] mt-3">
                Monthly Full-Tuition Plan
              </h3>
              <p class="text-xs sm:text-sm text-stone-600 mt-1">
                Valid for Noorani Qaida, Quran with Tajweed, Hifz, or Islamic Studies.
              </p>
            </div>

            <div class="py-4 border-y border-stone-200/80">
              <div class="flex items-baseline gap-1.5">
                <span class="text-2xl sm:text-3xl font-bold text-stone-700">
                  {{ currentCurrency.symbol }}
                </span>
                <span class="text-5xl sm:text-6xl font-black text-[#14241E] font-mono tracking-tight tabular-nums">
                  {{ currentCurrency.price }}
                </span>
                <span class="text-sm font-semibold text-stone-500">
                  / month per student
                </span>
              </div>
              <p class="text-xs text-stone-500 mt-2 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Region: {{ currentCurrency.country }} ({{ currentCurrency.currencyCode }}) · {{ currentCurrency.note }}</span>
              </p>
            </div>

            <div class="space-y-3 text-xs sm:text-sm text-stone-700">
              <div v-for="item in deliverables" :key="item.title" class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-100 text-[#0E6245] flex items-center justify-center shrink-0 mt-0.5">
                  <Check class="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <strong>{{ item.title }}</strong> {{ item.desc }}
                </div>
              </div>
            </div>

            <div class="pt-2">
              <Button
                @click="router.push('/signup')"
                class="w-full py-4 h-auto px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#0E6245] hover:bg-[#0b4d36] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Book 3 Free Trial Classes</span>
                <ArrowRight class="w-5 h-5" />
              </Button>
              <p class="text-[11px] text-center text-stone-500 mt-2.5">
                No credit card required upfront · Billed monthly via 2Checkout recurring card billing
              </p>
            </div>
          </div>
        </CCard>
      </div>

      <div class="container mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-stone-600">
        <div class="flex flex-col items-center gap-1.5">
          <ShieldCheck class="w-6 h-6 text-[#0E6245]" />
          <span class="font-bold text-stone-900">Secure Card Billing</span>
          <span>Processed securely via 2Checkout (Verifone)</span>
        </div>

        <div class="flex flex-col items-center gap-1.5">
          <Calendar class="w-6 h-6 text-[#0E6245]" />
          <span class="font-bold text-stone-900">Flexible Rescheduling</span>
          <span>Inform your teacher if you need to adjust class time</span>
        </div>

        <div class="flex flex-col items-center gap-1.5">
          <Clock class="w-6 h-6 text-[#0E6245]" />
          <span class="font-bold text-stone-900">Cancel or Pause Anytime</span>
          <span>No long-term contracts or hidden cancellation fees</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Check, ShieldCheck, ArrowRight, Sparkles, Clock, Calendar, Globe } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CCard from '@/components/common/CCard.vue';

interface CurrencyOption {
  id: string;
  country: string;
  flag: string;
  currencyCode: string;
  symbol: string;
  price: string;
  note: string;
}

const CURRENCIES: Record<string, CurrencyOption> = {
  pk: { id: 'pk', country: 'Pakistan', flag: '🇵🇰', currencyCode: 'PKR', symbol: 'PKR ', price: '10,000', note: 'Direct Pakistani Bank / Payoneer / Card' },
  us: { id: 'us', country: 'United States', flag: '🇺🇸', currencyCode: 'USD', symbol: '$', price: '30', note: 'International Visa / MasterCard / 2Checkout' },
  uk: { id: 'uk', country: 'United Kingdom', flag: '🇬🇧', currencyCode: 'USD', symbol: '$', price: '30', note: 'Fixed $30 USD monthly rate' },
  ca: { id: 'ca', country: 'Canada', flag: '🇨🇦', currencyCode: 'CAD', symbol: 'CA$', price: '40', note: 'Standard Canadian rate' },
  ae: { id: 'ae', country: 'Dubai / UAE', flag: '🇦🇪', currencyCode: 'AED', symbol: 'AED ', price: '135', note: 'AED equivalent of PKR 10,000' },
  other: { id: 'other', country: 'International', flag: '🌐', currencyCode: 'USD', symbol: '$', price: '30', note: 'Standard Global USD Rate' },
};

const deliverables = [
  { title: '4 Live Classes Every Week:', desc: '16 individual one-on-one sessions per month.' },
  { title: '30 Minutes Each:', desc: 'Focused, attentive 1-on-1 video lessons over Google Meet or Zoom.' },
  { title: "Student's Chosen Schedule:", desc: "Choose morning, afternoon, or evening slots matching your family's routine." },
  { title: 'Male or Female Teacher:', desc: 'Selected strictly by your preference for your son or daughter.' },
  { title: '3 Free Trial Classes:', desc: 'Experience the teaching quality completely free before paying.' },
];

const router = useRouter();
const selectedCurrencyId = ref('us');
const currentCurrency = computed(() => CURRENCIES[selectedCurrencyId.value] || CURRENCIES.us);

onMounted(() => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Karachi') || tz.includes('Pakistan')) {
      selectedCurrencyId.value = 'pk';
    } else if (['Toronto', 'Vancouver', 'Edmonton', 'Winnipeg', 'Halifax', 'Canada'].some((c) => tz.includes(c))) {
      selectedCurrencyId.value = 'ca';
    } else if (tz.includes('Dubai') || tz.includes('Muscat')) {
      selectedCurrencyId.value = 'ae';
    } else if (tz.includes('London')) {
      selectedCurrencyId.value = 'uk';
    } else {
      selectedCurrencyId.value = 'us';
    }
  } catch {
    selectedCurrencyId.value = 'us';
  }
});
</script>
