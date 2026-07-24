import { defineStore } from "pinia";
import { resetAllPiniaStores } from "./index";
import { toast } from "vue-sonner";
import api from "../helpers/axios";
import VueCookies from "vue-cookies";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    isLoggedIn: false,
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn || VueCookies.isKey("token"),
  },
  actions: {
    Login(form) {
      return api
        .post("/admin/login", {
          login: form.email,
          password: form.password,
        })
        .then((response) => {
          // Old API returns { user, access_token }
          const user = response.data.user;
          const token = response.data.access_token;

          VueCookies.set("token", token);
          this.user = user;
          this.isLoggedIn = true;

          toast.success("Login Successfully");
          router.push("/");
        });
    },

    Logout() {
      return api
        .post("/logout", { token: VueCookies.get("token") })
        .catch(() => {
          // Ignore logout API errors, still clear local state
        })
        .finally(() => {
          this.Reset();
        });
    },

    Reset() {
      VueCookies.remove("token");
      this.user = {};
      this.isLoggedIn = false;
      resetAllPiniaStores();
      router.push("/login");
    },
  },
  persist: true,
});
