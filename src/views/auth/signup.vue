<template>
  <div class="min-h-[calc(100vh-140px)] bg-white flex flex-col lg:flex-row">
    <!-- Left Column: Academy Value Story -->
    <div class="lg:w-1/2 bg-gradient-to-br from-[#0B4A34] via-[#0E6245] to-[#14241E] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-3 mb-12">
          <span class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-serif text-xl shadow-xs">
            خ
          </span>
          <div>
            <span class="text-xl font-bold tracking-tight block">Khizar Quran Academy</span>
            <span class="text-xs text-emerald-200">Online 1-on-1 Quran Classes</span>
          </div>
        </div>

        <span class="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
          Admissions Open
        </span>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
          Start your family’s Quran journey with 3 free trial classes.
        </h1>

        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8 container">
          Live 30-minute private video lessons with certified, patient teachers. Tailored to your child’s pace and your family’s schedule.
        </p>

        <div class="space-y-4 pt-4 border-t border-white/15 container">
          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div class="text-xs sm:text-sm">
              <strong class="text-white">3 Free Trial Classes:</strong> Experience the lessons first with zero payment details required upfront.
            </div>
          </div>

          <div class="flex items-start gap-3">
            <ShieldCheck class="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div class="text-xs sm:text-sm">
              <strong class="text-white">Female & Male Scholars:</strong> Certified teachers with verified Tajweed Ijazah and gentle child pedagogy.
            </div>
          </div>

          <div class="flex items-start gap-3">
            <HeartHandshake class="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div class="text-xs sm:text-sm">
              <strong class="text-white">One Transparent Fee:</strong> $30 USD / PKR 10,000 monthly for 4 days a week after your trial.
            </div>
          </div>
        </div>
      </div>

      <div class="pt-10 mt-10 border-t border-white/10 text-xs text-emerald-200/90 space-y-2">
        <p class="italic">
          "The best among you are those who learn the Quran and teach it." — Sahih al-Bukhari
        </p>
        <div class="flex items-center gap-2 pt-1 text-white font-medium">
          <Phone class="w-3.5 h-3.5 text-emerald-300" />
          <span>Admissions Desk: +92 331 4278863</span>
        </div>
      </div>
    </div>

    <!-- Right Column: CForm with Common Form Components -->
    <div class="lg:w-1/2 bg-[#FCFCFA] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
      <div class="container w-full mx-auto">
        <button
          type="button"
          @click="router.push('/')"
          class="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-[#0E6245] mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div class="mb-8">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#14241E] tracking-tight">
            Create Your Account
          </h2>
          <p class="text-xs sm:text-sm text-stone-600 mt-2">
            Sign up with your basic details to book your child's 3 free trial classes. No payment info required.
          </p>
        </div>

        <div v-if="errorMsg" class="mb-6 p-4 rounded-xl bg-red-50 border-l-4 border-red-500 text-xs text-red-700 font-medium">
          {{ errorMsg }}
        </div>

        <CForm :initialValues="form" :onSubmit="onSubmit" :schema="schema">
          <div class="space-y-5">
            <CField label="Full Name" name="name" required label-class="text-xs font-bold text-stone-800 uppercase tracking-wider">
              <CInput
                id="name"
                v-model="form.name"
                type="text"
                placeholder="e.g. Fatima Tariq"
                class="h-12 bg-white border-stone-300 rounded-xl"
              />
            </CField>

            <CField label="Email Address" name="email" required label-class="text-xs font-bold text-stone-800 uppercase tracking-wider">
              <CInput
                id="email"
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                class="h-12 bg-white border-stone-300 rounded-xl"
              />
            </CField>

            <CField label="Password" name="password" required label-class="text-xs font-bold text-stone-800 uppercase tracking-wider">
              <PasswordInput
                id="password"
                v-model="form.password"
                placeholder="Minimum 6 characters"
                class="h-12 bg-white border-stone-300 rounded-xl"
              />
            </CField>

            <div class="pt-2">
              <label class="flex items-start gap-3 text-xs text-stone-700 cursor-pointer select-none">
                <Checkbox v-model="termsAccepted" class="mt-0.5" />
                <span class="leading-relaxed">
                  I agree to the
                  <RouterLink to="/terms" class="font-bold text-[#0E6245] hover:underline">
                    Terms and Conditions
                  </RouterLink>
                  and
                  <RouterLink to="/privacy" class="font-bold text-[#0E6245] hover:underline">
                    Privacy Policy
                  </RouterLink>
                  .
                </span>
              </label>
            </div>

            <Button
              type="submit"
              :disabled="loading || !termsAccepted"
              class="w-full py-4 h-auto px-6 rounded-xl font-bold text-sm text-white bg-[#0E6245] hover:bg-[#0b4d36] shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>{{ loading ? 'Creating Account...' : 'Sign Up & Continue to Free Classes' }}</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>
        </CForm>

        <div class="mt-8 pt-6 border-t border-stone-200 text-center text-xs text-stone-600">
          <span>Already have an account? </span>
          <RouterLink to="/login" class="font-bold text-[#0E6245] hover:underline">
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, HeartHandshake, Phone } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CForm from '@/components/common/form/CForm.vue';
import CField from '@/components/common/form/CField.vue';
import CInput from '@/components/common/form/CInput.vue';
import PasswordInput from '@/components/common/form/PasswordInput.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

const loading = ref(false);
const termsAccepted = ref(false);
const errorMsg = ref('');

const form = reactive({
  name: '',
  email: '',
  password: '',
});

const schema = {
  name: {
    required: helpers.withMessage('Please enter your full name.', required),
  },
  email: {
    required: helpers.withMessage('Please enter your email address.', required),
    email: helpers.withMessage('Please enter a valid email address.', email),
  },
  password: {
    required: helpers.withMessage('Please enter a password.', required),
    minLength: helpers.withMessage('Password must be at least 6 characters.', minLength(6)),
  },
};

async function onSubmit() {
  if (!termsAccepted.value) {
    const msg = 'You must agree to the Terms and Conditions and Privacy Policy to continue.';
    errorMsg.value = msg;
    toast.error(msg);
    return;
  }

  errorMsg.value = '';
  loading.value = true;
  try {
    await store.handleRegister({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    router.push('/onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err: any) {
    errorMsg.value = err?.message || 'Signup failed. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}
</script>
