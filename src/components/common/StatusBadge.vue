<template>
  <Badge :variant="getVariant()" class="flex items-center gap-1">
    <component :is="getIcon()" class="w-4 h-4" v-if="getIcon()" />
    <slot>
      <span class="capitalize">
        {{ props.status?.replace("_", " ") || "Unknown" }}
      </span>
    </slot>
  </Badge>
</template>

<script setup>
import { Badge } from "@/components/ui/badge";
import {
  CircleCheck,
  Loader,
  X as XIcon,
  AlertCircle,
  Archive,
  Ban,
  CheckCircle2,
  Clock,
  FileText,
} from "@lucide/vue";

const props = defineProps({
  status: { type: null, required: true },
});

// Function to return variant based on status
const getVariant = () => {
  switch (props.status?.toLowerCase()) {
    // Danger/Red
    case "overdue":
    case "rejected":
    case "reject":
    case "closed":
    case "close":
    case "high risk":
    case "cancelled":
      return "danger";

    // Warning/Yellow/Orange
    case "pending":
    case "processing":
    case "ordered":
    case "progress":
    case "in_progress":
    case "in progress":
      return "pending";

    // Info/Blue
    case "shipped":
    case "its_on_the_way":
      return "secondary";

    // Success/Green
    case "active":
    case "approved":
    case "accepted":
    case "completed":
    case "assigned":
    case "healthy":
    case "delivered":
      return "success";

    // Neutral/Gray
    case "inactive":
    case "draft":
    case "archived":
    case "refunded":
      return "neutral";

    default:
      return "primary";
  }
};

// Function to return icon based on status
const getIcon = () => {
  switch (props.status?.toLowerCase()) {
    // Success Icons
    case "active":
    case "approved":
    case "accepted":
    case "assigned":
    case "healthy":
    case "completed":
    case "delivered":
      return CircleCheck;

    // Pending/Process Icons
    case "pending":
    case "processing":
    case "ordered":
    case "progress":
    case "in_progress":
    case "in progress":
      return Loader;

    // Transit Icons
    case "shipped":
    case "its_on_the_way":
      return Archive;

    // Refunded
    case "refunded":
      return FileText;

    // Error/Danger Icons
    case "overdue":
      return AlertCircle;
    case "cancelled":
    case "rejected":
    case "reject":
    case "closed":
    case "close":
    case "high risk":
      return XIcon;

    // Neutral Icons
    case "inactive":
      return Ban;
    case "draft":
      return FileText;
    case "archived":
      return Archive;

    default:
      return CircleCheck;
  }
};
</script>
