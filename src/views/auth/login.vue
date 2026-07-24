<template>
  <main class="space-y-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <GalleryVerticalEnd />
      <h1 class="text-xl font-bold">Welcome to Acme Inc.</h1>
      <p class="text-muted-foreground text-sm">
        Don't have an account?
        <RouterLink to="/signup" class="underline hover:text-primary">
          Sign up
        </RouterLink>
      </p>
    </div>
    <CForm :initialValues="form" :onSubmit="login" :schema="schema">
      <div class="space-y-6">
        <CField label="Email" name="email">
          <CInput
            id="email"
            v-model="form.email"
            placeholder="Enter your email address"
            type="text"
          />
        </CField>
        <CField label="Password" name="password">
          <PasswordInput
            id="password"
            v-model="form.password"
            placeholder="Enter password"
          />
        </CField>
        <div>
          <Button :loading="loading" class="w-full mt-3" type="submit">
            Login
          </Button>
          <Button
            variant="outline"
            class="w-full mt-3"
            type="button"
            @click="getRedirectionUrl"
          >
            <GoogleIcon /> Login with Google
          </Button>
        </div>
      </div>
    </CForm>
    <p class="px-6 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our
      <RouterLink class="underline hover:text-primary" href="#"
        >Terms of Service</RouterLink
      >
      and
      <RouterLink class="underline hover:text-primary" href="#"
        >Privacy Policy</RouterLink
      >.
    </p>
  </main>
</template>

<script setup>
import { ref, reactive } from "vue";
import { email, helpers, required } from "@vuelidate/validators";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";
import { GalleryVerticalEnd } from "@lucide/vue";
import CField from "@/components/common/form/CField.vue";
import CForm from "@/components/common/form/CForm.vue";
import CInput from "@/components/common/form/CInput.vue";
import PasswordInput from "@/components/common/form/PasswordInput.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";

const authStore = useAuthStore();

const loading = ref(false);
const redirecting = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const schema = {
  email: {
    email: helpers.withMessage("Type a valid email", email),
    required: helpers.withMessage("Email is required", required),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
};

const login = () => {
  loading.value = true;
  authStore.Login(form).finally(() => {
    loading.value = false;
  });
};

const getRedirectionUrl = () => {
  redirecting.value = true;
  if (typeof authStore.GetRedirectionUrl === "function") {
    authStore.GetRedirectionUrl().finally(() => {
      redirecting.value = false;
    });
  } else {
    redirecting.value = false;
  }
};
</script>
