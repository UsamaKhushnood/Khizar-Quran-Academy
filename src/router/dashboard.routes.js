import DashboardLayout from "@/layouts/DashboardLayout.vue";

export default {
  path: "/",
  component: DashboardLayout,
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      meta: { title: "Dashboard" },
      component: () => import("@/views/dashboard/index.vue"),
    },
    {
      path: "users",
      name: "users",
      meta: { title: "User Management" },
      component: () => import("@/views/dashboard/index.vue"),
    },
    {
      path: "listings",
      name: "listings",
      meta: { title: "Listing Management" },
      component: () => import("@/views/dashboard/index.vue"),
    },
    {
      path: "bookings",
      name: "bookings",
      meta: { title: "Booking Management" },
      component: () => import("@/views/dashboard/index.vue"),
    },
    {
      path: "flagged-messages",
      name: "flagged-messages",
      meta: { title: "Flagged Messages" },
      component: () => import("@/views/dashboard/index.vue"),
    },
    {
      path: "activity-logs",
      name: "activity-logs",
      meta: { title: "Activity Logs" },
      component: () => import("@/views/dashboard/index.vue"),
    },
    {
      path: "platform-settings",
      name: "platform-settings",
      meta: { title: "Platform Settings" },
      component: () => import("@/views/dashboard/index.vue"),
    },
  ],
};
