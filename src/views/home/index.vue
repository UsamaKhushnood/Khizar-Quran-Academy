<template>
  <div>
    <HeroSection />
    <HowItWorksSection />
    <CoursesSection />
    <ClassroomDemoSection />
    <PricingSection />
    <TeachersSection />
    <ParentReviewsSection />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import HeroSection from '@/components/academy/HeroSection.vue';
import HowItWorksSection from '@/components/academy/HowItWorksSection.vue';
import CoursesSection from '@/components/academy/CoursesSection.vue';
import ClassroomDemoSection from '@/components/academy/ClassroomDemoSection.vue';
import PricingSection from '@/components/academy/PricingSection.vue';
import TeachersSection from '@/components/academy/TeachersSection.vue';
import ParentReviewsSection from '@/components/academy/ParentReviewsSection.vue';
import FaqSection from '@/components/academy/FaqSection.vue';

const route = useRoute();

function scrollToTargetSection() {
  const section = route.meta?.section as string | undefined;
  if (!section) return;
  setTimeout(() => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

onMounted(scrollToTargetSection);
watch(() => route.fullPath, scrollToTargetSection);
</script>
