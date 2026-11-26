<template>
  <ConfigProvider>
    <div class="min-h-screen flex flex-col bg-[#FCFCFA] text-[#14241E] overflow-x-hidden">
      <RegionBar />
      <Navbar />
      <main class="flex-1">
        <RouterView />
      </main>
      <Footer />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'reka-ui';
import RegionBar from '@/components/academy/RegionBar.vue';
import Navbar from '@/components/academy/Navbar.vue';
import Footer from '@/components/academy/Footer.vue';
</script>
