<script setup lang="ts">
import {
  IconTrendingUp,
  IconShoppingCart,
  IconUsers,
  IconActivity,
} from "@tabler/icons-vue";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cards = [
  {
    title: "Total Sales",
    value: "$45,231.89",
    badge: "Revenue",
    badgeIcon: IconTrendingUp,
    footerTitle: "+20.1% from last month",
    footerDesc: "Across all orders",
  },
  {
    title: "Total Orders",
    value: "2,350",
    badge: "Orders",
    badgeIcon: IconShoppingCart,
    footerTitle: "+180.1% from last month",
    footerDesc: "Including all statuses",
  },
  {
    title: "Total Users",
    value: "12,234",
    badge: "Users",
    badgeIcon: IconUsers,
    footerTitle: "+19% from last month",
    footerDesc: "All registered accounts",
  },
  {
    title: "Active Now",
    value: "573",
    badge: "Active",
    badgeIcon: IconActivity,
    footerTitle: "+201 since last hour",
    footerDesc: "Current online users",
  },
];
</script>

<template>
  <div
    class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
  >
    <Card v-for="(card, index) in cards" :key="index" class="@container/card">
      <CardHeader>
        <CardDescription>{{ card.title }}</CardDescription>
        <CardTitle
          class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >
          {{ card.value }}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <component :is="card.badgeIcon" class="size-4" />
            {{ card.badge }}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter class="flex-col items-start gap-1.5 text-sm">
        <div class="line-clamp-1 flex gap-2 font-medium">
          {{ card.footerTitle }}
        </div>
        <div class="text-muted-foreground">{{ card.footerDesc }}</div>
      </CardFooter>
    </Card>
  </div>
</template>
