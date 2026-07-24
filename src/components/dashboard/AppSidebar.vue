<script setup lang="ts">
import {
  IconCalendarEvent,
  IconInnerShadowTop,
  IconLayoutList,
  IconUsers,
  IconFlag,
  IconActivity,
} from "@tabler/icons-vue";

import NavMain from "@/components/dashboard/NavMain.vue";
import NavUser from "@/components/dashboard/NavUser.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Settings } from "@lucide/vue";

const data = {
  user: {
    name: "Super Admin",
    email: "admin@yourcompany.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/",
    //   icon: IconDashboard,
    // },
    {
      title: "User Management",
      url: "/users",
      icon: IconUsers,
    },
    {
      title: "Listing Management",
      url: "/listings",
      icon: IconLayoutList,
    },
    {
      title: "Booking Management",
      url: "/bookings",
      icon: IconCalendarEvent,
    },
    {
      title: "Flagged Messages",
      url: "/flagged-messages",
      icon: IconFlag,
    },
    {
      title: "Activity Logs",
      url: "/activity-logs",
      icon: IconActivity,
    },
  ],
};
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <a href="#">
              <IconInnerShadowTop class="!size-5" />
              <span class="text-base font-semibold">Acme Inc.</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent class="pt-4">
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <SidebarGroup>
        <SidebarGroupContent class="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <RouterLink to="/platform-settings">
                <SidebarMenuButton
                  tooltip="Platform Settings"
                  :isActive="$route.path === '/platform-settings'"
                >
                  <Settings />
                  <span>Platform Settings</span>
                </SidebarMenuButton>
              </RouterLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
