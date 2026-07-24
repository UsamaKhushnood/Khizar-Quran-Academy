<script setup lang="ts">
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggler from "@/components/common/ThemeToggler.vue";
</script>

<template>
  <header
    class="flex h-(--header-height) shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
  >
    <div class="flex w-full items-center gap-1 px-3 lg:gap-2">
      <SidebarTrigger />

      <h1 class="text-base font-medium">
        {{ $route.meta.title }}
      </h1>
      <div class="ml-auto flex items-center gap-2">
        <ThemeToggler />
      </div>
    </div>
  </header>
</template>
