<template>
  <Card :class="props.class">
    <CardHeader v-if="!hideHeader">
      <slot name="header">
        <CardTitle>
          <slot name="title">{{ title }}</slot>
        </CardTitle>
        <CardDescription v-if="description || $slots.description">
          <slot name="description">{{ description }}</slot>
        </CardDescription>
      </slot>
    </CardHeader>
    <CardContent v-if="$slots.default">
      <slot />
    </CardContent>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  class: {
    type: null,
    default: undefined,
  },
});
</script>
