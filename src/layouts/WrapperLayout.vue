<template>
  <ConfigProvider>
    <div class="min-h-screen flex flex-col bg-[#FCFCFA] text-[#14241E] overflow-x-hidden">
      <RegionBar />
      <Navbar v-if="!route.meta?.hideNavbar" />
      <main class="flex-1 flex flex-col">
        <RouterView />
      </main>
      <Footer v-if="!route.meta?.hideFooter" />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ConfigProvider } from 'reka-ui';
import RegionBar from '@/components/academy/RegionBar.vue';
import Navbar from '@/components/academy/Navbar.vue';
import Footer from '@/components/academy/Footer.vue';

const route = useRoute();
</script>
