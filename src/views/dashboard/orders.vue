<template>
  <div>
    <!-- Widgets Status Tabs -->
    <div class="flex items-center gap-4 mb-4">
      <!-- Toolbar: search -->
      <div class="flex items-center gap-2">
        <div class="relative w-70">
          <Search
            class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            placeholder="Search Order ID or Customer..."
            class="pl-8 pr-7"
          />
          <button
            v-if="searchQuery"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            @click="searchQuery = ''"
          >
            <X class="size-3.5" />
          </button>
        </div>
      </div>

      <Tabs v-model="activeStatus" @update:model-value="filterByStatus">
        <TabsList>
          <TabsTrigger value="all">
            All Orders
            <!-- <Badge variant="outline" class="font-semibold text-muted-foreground ml-1">
              {{ mockOrders.length }}
            </Badge> -->
          </TabsTrigger>

          <TabsTrigger
            v-for="opt in statusCounts"
            :key="opt.status"
            :value="opt.status"
          >
            {{ opt.title }}
            <!-- <Badge class="font-semibold px-1 ml-1" :class="[opt.bg, opt.color]">
              {{ opt.count }}
            </Badge> -->
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Orders Table -->
    <CDataTable
      :fields="fields"
      :items="filteredOrders"
      :loading="loading"
      :total="filteredOrders.length"
      :items-per-page="10"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      @sort="handleSort"
    >
      <!-- Status -->
      <template #status="{ data }">
        <StatusBadge :status="data.status" />
      </template>

      <!-- Actions -->
      <template #actions>
        <Button size="xs" variant="outline">View</Button>
      </template>
    </CDataTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CDataTable from "@/components/common/CDataTable.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/common/StatusBadge.vue";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Hash,
  UserRound,
  Calendar,
  CircleCheck,
  CircleDollarSign,
  X,
} from "@lucide/vue";

const ORDER_STATUS_CONFIG = {
  progress: {
    status: "progress",
    title: "In Progress",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  accepted: {
    status: "accepted",
    title: "Accepted",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  cancelled: {
    status: "cancelled",
    title: "Cancelled",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
};

// Table fields structure
const fields = [
  {
    key: "created_at",
    icon: Calendar,
    label: "Date",
    type: "date",
    sortable: true,
    collapse: true,
    width: "160px",
  },
  {
    key: "customer_name",
    icon: UserRound,
    label: "Customer",
    sortable: true,
  },
  { key: "items_summary", label: "Items/Products", collapse: true },
  {
    key: "total",
    label: "Total",
    sortable: true,
    class: "justify-end",
    width: "140px",
    type: "currency",
  },
  {
    key: "status",
    icon: CircleCheck,
    label: "Status",
    sortable: true,
    width: "160px",
  },
];

const activeStatus = ref("all");
const searchQuery = ref("");
const sortBy = ref("order_number");
const sortDir = ref("desc");
const loading = ref(false);

// Mock Orders Data
const mockOrders = ref([
  {
    id: 1,
    order_number: "ORD-2026-001",
    customer_name: "Ali Raza",
    customer_company: "Raza Textiles Ltd",
    created_at: "2026-07-08",
    items_summary: "100x Cotton Yarn Rolls, 50x Silk Spools",
    total: 125000,
    status: "progress",
  },
  {
    id: 2,
    order_number: "ORD-2026-002",
    customer_name: "Sajjad Ahmad",
    customer_company: "Lahore Garments Co",
    created_at: "2026-07-07",
    items_summary: "200x Denim Fabric Yards",
    total: 340000,
    status: "progress",
  },
  {
    id: 3,
    order_number: "ORD-2026-003",
    customer_name: "Bilal Butt",
    customer_company: "Butt Distributors",
    created_at: "2026-07-06",
    items_summary: "500x Polyester Threads",
    total: 75000,
    status: "accepted",
  },
  {
    id: 4,
    order_number: "ORD-2026-004",
    customer_name: "Usman Khan",
    customer_company: "Khyber Fabrics",
    created_at: "2026-07-05",
    items_summary: "300x Woolen Blankets",
    total: 620000,
    status: "progress",
  },
  {
    id: 5,
    order_number: "ORD-2026-005",
    customer_name: "Faisal Shah",
    customer_company: "Shah Silk Mills",
    created_at: "2026-07-04",
    items_summary: "50x Premium Linen Reels",
    total: 95000,
    status: "cancelled",
  },
]);

// Computed status counts for Tabs
const statusCounts = computed(() => {
  const counts = {};
  mockOrders.value.forEach((o) => {
    counts[o.status] = (counts[o.status] || 0) + 1;
  });

  return Object.values(ORDER_STATUS_CONFIG).map((cfg) => ({
    status: cfg.status,
    title: cfg.title,
    color: cfg.color,
    bg: cfg.bg,
    count: counts[cfg.status] || 0,
  }));
});

// Filter & Sort logic
const filteredOrders = computed(() => {
  let list = [...mockOrders.value];

  // 1. Status Filter
  if (activeStatus.value !== "all") {
    list = list.filter((o) => o.status === activeStatus.value);
  }

  // 2. Search Query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    list = list.filter(
      (o) =>
        o.order_number.toLowerCase().includes(query) ||
        o.customer_name.toLowerCase().includes(query) ||
        o.customer_company.toLowerCase().includes(query) ||
        o.items_summary.toLowerCase().includes(query),
    );
  }

  // 3. Sorting
  list.sort((a, b) => {
    let fieldA = a[sortBy.value];
    let fieldB = b[sortBy.value];

    if (typeof fieldA === "string") {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }

    if (fieldA < fieldB) return sortDir.value === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDir.value === "asc" ? 1 : -1;
    return 0;
  });

  return list;
});

const filterByStatus = (statusVal) => {
  activeStatus.value = statusVal;
};

const handleSort = (field) => {
  if (sortBy.value === field.key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field.key;
    sortDir.value = "asc";
  }
};
</script>
