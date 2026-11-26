<template>
  <section id="pricing" class="py-16 md:py-24 bg-white border-b border-stone-200">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="container mx-auto text-center mb-12">
        <Badge variant="primary" class="mb-3 px-3 py-1">
          <Sparkles class="w-3.5 h-3.5 mr-1" />
          <span>One Clear Price · No Complicated Tiers</span>
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-[#14241E] tracking-tight">
          Simple, Transparent Monthly Tuition
        </h2>
        <p class="mt-3 text-base text-stone-600 leading-relaxed">
          Every course is taught 1-on-1 for <strong>4 days a week</strong> at your child’s own chosen time.
          Includes <strong>3 free trial classes</strong> before you pay a single penny.
        </p>
      </div>

      <div class="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
        <CCard
          hide-header
          class="rounded-3xl bg-gradient-to-b from-[#FCFCFA] to-white border-2 border-[#0E6245] shadow-xl p-6 sm:p-10 gap-0"
        >
          <div class="space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="primary" class="px-3 py-1 uppercase tracking-wider font-bold">
                All Courses Included
              </Badge>
              <Badge variant="default" class="px-3 py-1 font-semibold">
                4 Days / Week · 1-on-1
              </Badge>
            </div>

            <div>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-[#14241E]">
                Monthly Full-Tuition Plan
              </h3>
              <p class="text-xs sm:text-sm text-stone-600 mt-1">
                Valid for Noorani Qaida, Quran with Tajweed, Hifz, or Islamic Studies.
              </p>
            </div>

            <div class="py-5 px-5 rounded-2xl bg-[#F7F6F2] border border-stone-200/80">
              <div class="flex items-baseline gap-1.5 flex-wrap">
                <span class="text-2xl sm:text-3xl font-bold text-[#0E6245]">
                  {{ currentCurrency.symbol }}
                </span>
                <span class="text-5xl sm:text-6xl font-black text-[#14241E] font-mono tracking-tight tabular-nums">
                  {{ currentCurrency.price }}
                </span>
                <span class="text-sm font-semibold text-stone-500">
                  / month per student
                </span>
              </div>
              <p class="text-xs text-stone-600 mt-2.5 flex items-center gap-2">
                <Globe class="w-3.5 h-3.5 text-[#0E6245] shrink-0" />
                <span>
                  {{ currentCurrency.flag }} {{ currentCurrency.country }} ({{ currentCurrency.currencyCode }}) · {{ currentCurrency.note }}
                </span>
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

      <div class="w-full lg:w-3/4 mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-stone-600">
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
import { useAcademyStore } from '@/stores/academy.store';

interface CurrencyOption {
  id: string;
  regionId: 'pakistan' | 'usa' | 'canada' | 'uae';
  country: string;
  flag: string;
  currencyCode: string;
  symbol: string;
  price: string;
  note: string;
}

const CURRENCIES: Record<string, CurrencyOption> = {
  pk: { id: 'pk', regionId: 'pakistan', country: 'Pakistan', flag: '🇵🇰', currencyCode: 'PKR', symbol: 'PKR ', price: '10,000', note: 'Direct Pakistani Bank / Payoneer / Card' },
  us: { id: 'us', regionId: 'usa', country: 'United States', flag: '🇺🇸', currencyCode: 'USD', symbol: '$', price: '30', note: 'International Visa / MasterCard / 2Checkout' },
  uk: { id: 'uk', regionId: 'usa', country: 'United Kingdom', flag: '🇬🇧', currencyCode: 'USD', symbol: '$', price: '30', note: 'Fixed $30 USD monthly rate' },
  ca: { id: 'ca', regionId: 'canada', country: 'Canada', flag: '🇨🇦', currencyCode: 'CAD', symbol: 'CA$', price: '40', note: 'Standard Canadian rate' },
  ae: { id: 'ae', regionId: 'uae', country: 'Dubai / UAE', flag: '🇦🇪', currencyCode: 'AED', symbol: 'AED ', price: '135', note: 'AED equivalent of PKR 10,000' },
};

const deliverables = [
  { title: '4 Live Classes Every Week:', desc: '16 individual one-on-one sessions per month.' },
  { title: '30 Minutes Each:', desc: 'Focused, attentive 1-on-1 video lessons over Google Meet or Zoom.' },
  { title: "Student's Chosen Schedule:", desc: "Choose morning, afternoon, or evening slots matching your family's routine." },
  { title: 'Male or Female Teacher:', desc: 'Selected strictly by your preference for your son or daughter.' },
  { title: '3 Free Trial Classes:', desc: 'Experience the teaching quality completely free before paying.' },
];

const router = useRouter();
const store = useAcademyStore();
const detectedCurrencyId = ref('us');
const currentCurrency = computed(() => CURRENCIES[detectedCurrencyId.value] || CURRENCIES.us);

function detectRegionCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Karachi') || tz.includes('Pakistan')) {
      return 'pk';
    }
    if (['Toronto', 'Vancouver', 'Edmonton', 'Winnipeg', 'Halifax', 'Canada'].some((c) => tz.includes(c))) {
      return 'ca';
    }
    if (tz.includes('Dubai') || tz.includes('Muscat') || tz.includes('Qatar') || tz.includes('Riyadh')) {
      return 'ae';
    }
    if (tz.includes('London')) {
      return 'uk';
    }
  } catch {
    // fallback to US
  }
  return 'us';
}

onMounted(() => {
  const id = detectRegionCurrency();
  detectedCurrencyId.value = id;
  const currency = CURRENCIES[id];
  if (currency) {
    store.setRegionById(currency.regionId);
  }
});
</script>
