<template>
  <div class="flex-1 bg-white flex flex-col lg:flex-row">
    <!-- Left Column: Academy Side Banner -->
    <div class="lg:w-1/2 bg-gradient-to-br from-[#0B4A34] via-[#0E6245] to-[#14241E] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
      <div class="w-full lg:w-11/12 xl:w-5/6 mx-auto flex-1 flex flex-col justify-center">
        <div class="flex items-center gap-3 mb-10">
          <span class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-serif text-xl shadow-xs">
            خ
          </span>
          <div>
            <span class="text-xl font-bold tracking-tight block">Khizar Quran Academy</span>
            <span class="text-xs text-emerald-200">Student & Family Portal</span>
          </div>
        </div>

        <Badge variant="outline" class="w-fit px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4 border-white/15">
          Welcome Back
        </Badge>

        <h1 class="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.15] text-white mb-5">
          Continue your Quran learning journey.
        </h1>

        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8">
          Sign in to manage your student lessons, schedule classes with certified tutors, and access live video sessions.
        </p>

        <div class="space-y-4 pt-6 border-t border-white/15">
          <div class="flex items-start gap-3">
            <CheckCircle2 class="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div class="text-xs sm:text-sm text-emerald-50">
              <strong class="text-white">Live 1-on-1 Lessons:</strong> Dedicated attention from your assigned teacher.
            </div>
          </div>

          <div class="flex items-start gap-3">
            <ShieldCheck class="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div class="text-xs sm:text-sm text-emerald-50">
              <strong class="text-white">Google Meet & Zoom:</strong> Secure, easy classroom links in your browser.
            </div>
          </div>

          <div class="flex items-start gap-3">
            <HeartHandshake class="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <div class="text-xs sm:text-sm text-emerald-50">
              <strong class="text-white">Direct Coordinator Support:</strong> Help is always one message away.
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-11/12 xl:w-5/6 mx-auto pt-8 mt-8 border-t border-white/10 text-xs text-emerald-200/90 flex items-center gap-2">
        <Phone class="w-3.5 h-3.5 text-emerald-300" />
        <span>Need help logging in? Call or WhatsApp +92 331 4278863</span>
      </div>
    </div>

    <!-- Right Column: CForm with Common Form Components -->
    <div class="lg:w-1/2 bg-[#FCFCFA] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
      <div class="w-full sm:w-10/12 md:w-3/4 lg:w-11/12 xl:w-4/5 mx-auto">
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
            Sign In to Your Account
          </h2>
          <p class="text-xs sm:text-sm text-stone-600 mt-2">
            Enter your email and password to access your classes and setup.
          </p>
        </div>

        <div v-if="errorMsg" class="mb-6 p-4 rounded-xl bg-red-50 border-l-4 border-red-500 text-xs text-red-700 font-medium">
          {{ errorMsg }}
        </div>

        <CForm :initialValues="form" :onSubmit="onSubmit" :schema="schema">
          <div class="space-y-5">
            <CField label="Email Address" name="email" required label-class="text-xs font-bold text-stone-800 uppercase tracking-wider">
              <CInput
                id="email"
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                class="h-11 bg-white border-stone-300 rounded-xl"
              />
            </CField>

            <CField label="Password" name="password" required label-class="text-xs font-bold text-stone-800 uppercase tracking-wider">
              <PasswordInput
                id="password"
                v-model="form.password"
                placeholder="Your password"
                class="h-11 bg-white border-stone-300 rounded-xl"
              />
            </CField>

            <Button
              type="submit"
              :disabled="loading"
              class="w-full py-3.5 h-auto px-6 rounded-xl font-bold text-sm text-white bg-[#0E6245] hover:bg-[#0b4d36] shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>{{ loading ? 'Signing In...' : 'Sign In' }}</span>
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>
        </CForm>

        <div class="mt-8 pt-6 border-t border-stone-200 text-center text-xs text-stone-600">
          <span>Don't have an account yet? </span>
          <RouterLink to="/signup" class="font-bold text-[#0E6245] hover:underline">
            Sign Up for Free
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { email, helpers, required } from '@vuelidate/validators';
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, HeartHandshake, Phone } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CForm from '@/components/common/form/CForm.vue';
import CField from '@/components/common/form/CField.vue';
import CInput from '@/components/common/form/CInput.vue';
import PasswordInput from '@/components/common/form/PasswordInput.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

const loading = ref(false);
const errorMsg = ref('');

const form = reactive({
  email: '',
  password: '',
});

const schema = {
  email: {
    required: helpers.withMessage('Please enter your email address.', required),
    email: helpers.withMessage('Please enter a valid email address.', email),
  },
  password: {
    required: helpers.withMessage('Please enter your password.', required),
  },
};

async function onSubmit() {
  errorMsg.value = '';
  loading.value = true;
  try {
    const ok = await store.handleLogin(form.email.trim(), form.password);
    if (ok) {
      router.push('/onboarding');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      errorMsg.value = 'Invalid email or password.';
    }
  } catch (err: any) {
    errorMsg.value = err?.message || 'Login failed.';
  } finally {
    loading.value = false;
  }
}
</script>
