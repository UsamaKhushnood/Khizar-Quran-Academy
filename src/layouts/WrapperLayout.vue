<template>
  <ConfigProvider>
    <ThemeToggler class="fixed top-3 right-3" />
    <RouterView></RouterView>
  </ConfigProvider>
</template>
<script setup>
import { ConfigProvider } from "reka-ui";
import { useColorMode } from "@vueuse/core";
import ThemeToggler from "@/components/common/ThemeToggler.vue";

const mode = useColorMode({
  initialValue: "light",
});
</script>
