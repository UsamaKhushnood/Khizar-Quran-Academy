import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import WrapperLayout from "@/layouts/WrapperLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (!to.meta?.section) return { top: 0, behavior: "smooth" };
  },
  routes: [
    {
      path: "/",
      component: WrapperLayout,
      children: [
        {
          path: "",
          name: "home",
          meta: { title: "Khizar Quran Academy | Online 1-on-1 Quran Classes" },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "courses",
          name: "courses",
          meta: { title: "Courses | Khizar Quran Academy", section: "courses" },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "how-it-works",
          name: "how-it-works",
          meta: { title: "How It Works | Khizar Quran Academy", section: "how-it-works" },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "pricing",
          name: "pricing",
          meta: { title: "Pricing | Khizar Quran Academy", section: "pricing" },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "teachers",
          name: "teachers",
          meta: { title: "Teachers | Khizar Quran Academy", section: "teachers" },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "faqs",
          alias: ["/faq"],
          name: "faqs",
          meta: { title: "FAQs | Khizar Quran Academy", section: "faq" },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "login",
          alias: ["/signin"],
          name: "login",
          meta: { title: "Sign In | Khizar Quran Academy", hideNavbar: true, hideFooter: true },
          component: () => import("@/views/auth/login.vue"),
        },
        {
          path: "signup",
          alias: ["/register", "/book-free-classes", "/join"],
          name: "signup",
          meta: { title: "Book 3 Free Classes | Khizar Quran Academy", hideNavbar: true, hideFooter: true },
          component: () => import("@/views/auth/signup.vue"),
        },
        {
          path: "onboarding",
          alias: ["/enroll"],
          name: "onboarding",
          meta: { title: "Student Onboarding | Khizar Quran Academy" },
          component: () => import("@/views/onboarding/index.vue"),
        },
        {
          path: "portal",
          name: "portal",
          meta: { title: "Parent & Student Portal | Khizar Quran Academy" },
          component: () => import("@/views/portal/index.vue"),
        },
        {
          path: "privacy",
          alias: ["/privacy-policy"],
          name: "privacy",
          meta: { title: "Privacy Policy | Khizar Quran Academy" },
          component: () => import("@/views/legal/PrivacyPolicyView.vue"),
        },
        {
          path: "terms",
          alias: ["/terms-and-conditions", "/terms-of-service"],
          name: "terms",
          meta: { title: "Terms and Conditions | Khizar Quran Academy" },
          component: () => import("@/views/legal/TermsView.vue"),
        },
        {
          path: "refund",
          alias: ["/refund-policy", "/refunds"],
          name: "refund",
          meta: { title: "Refund Policy | Khizar Quran Academy" },
          component: () => import("@/views/legal/RefundPolicyView.vue"),
        },
        {
          path: "no-permission",
          name: "403",
          meta: { title: "No Permission | Khizar Quran Academy" },
          component: () => import("@/views/no-permission.vue"),
        },
        {
          path: ":pathMatch(.*)*",
          name: "404",
          meta: { title: "Page Not Found | Khizar Quran Academy" },
          component: () => import("@/views/page-not-found.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta?.title || "Khizar Quran Academy";
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
