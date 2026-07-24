<script setup>
import { ref, computed } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CSelect from "@/components/common/form/CSelect.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GripVertical,
  CheckCircle2,
  Loader2,
  Plus,
  MoreVertical,
  Columns3,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "@lucide/vue";

// Active Tab
const activeTab = ref("outline");

// Filter / View Options
const selectedColumnOption = ref("all");
const columnOptions = [
  { label: "All Columns", value: "all" },
  { label: "Hide Reviewer", value: "hide_reviewer" },
  { label: "Hide Targets", value: "hide_targets" },
];

const rowsPerPage = ref("10");
const rowsPerPageOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
];

const reviewerOptions = [
  { label: "Eddie Lake", value: "Eddie Lake" },
  { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
  { label: "Sarah Chen", value: "Sarah Chen" },
  { label: "Alex Rivera", value: "Alex Rivera" },
];

// Table Data
const items = ref([
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "in_process",
    target: 18,
    limit: 5,
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "done",
    target: 29,
    limit: 24,
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "done",
    target: 10,
    limit: 13,
    reviewer: "Eddie Lake",
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "done",
    target: 27,
    limit: 23,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 5,
    header: "Design",
    type: "Narrative",
    status: "in_process",
    target: 2,
    limit: 16,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 6,
    header: "Capabilities",
    type: "Narrative",
    status: "in_process",
    target: 20,
    limit: 8,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 7,
    header: "Integration with existing systems",
    type: "Narrative",
    status: "in_process",
    target: 19,
    limit: 21,
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 8,
    header: "Innovation and Advantages",
    type: "Narrative",
    status: "done",
    target: 25,
    limit: 26,
    reviewer: "",
  },
  {
    id: 9,
    header: "Overview of EMR's Innovative Solutions",
    type: "Technical content",
    status: "done",
    target: 7,
    limit: 23,
    reviewer: "",
  },
  {
    id: 10,
    header: "Advanced Algorithms and Machine Learning",
    type: "Narrative",
    status: "done",
    target: 30,
    limit: 28,
    reviewer: "",
  },
]);

// Row Selection
const selectedRowIds = ref([]);

const isAllSelected = computed(() => {
  return (
    items.value.length > 0 &&
    selectedRowIds.value.length === items.value.length
  );
});

const toggleSelectAll = (checked) => {
  if (checked) {
    selectedRowIds.value = items.value.map((item) => item.id);
  } else {
    selectedRowIds.value = [];
  }
};

const toggleRowSelection = (id, checked) => {
  if (checked) {
    if (!selectedRowIds.value.includes(id)) {
      selectedRowIds.value.push(id);
    }
  } else {
    selectedRowIds.value = selectedRowIds.value.filter((rowId) => rowId !== id);
  }
};

// Add Section Action
const addSection = () => {
  const newId = items.value.length + 1;
  items.value.push({
    id: newId,
    header: `New Section ${newId}`,
    type: "Narrative",
    status: "in_process",
    target: 10,
    limit: 10,
    reviewer: "",
  });
};
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Top Header Bar / Navigation Tabs & Actions -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <!-- Navigation Tabs -->
      <div
        class="inline-flex items-center gap-1 p-1 bg-muted/40 border border-border rounded-xl w-fit"
      >
        <button
          @click="activeTab = 'outline'"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
            activeTab === 'outline'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          Outline
        </button>
        <button
          @click="activeTab = 'past_performance'"
          :class="[
            'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
            activeTab === 'past_performance'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          Past Performance
          <span
            class="px-1.5 py-0.2 bg-muted text-muted-foreground rounded-full text-[10px]"
            >3</span
          >
        </button>
        <button
          @click="activeTab = 'key_personnel'"
          :class="[
            'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
            activeTab === 'key_personnel'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          Key Personnel
          <span
            class="px-1.5 py-0.2 bg-muted text-muted-foreground rounded-full text-[10px]"
            >2</span
          >
        </button>
        <button
          @click="activeTab = 'focus_documents'"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
            activeTab === 'focus_documents'
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          Focus Documents
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <div class="w-[180px]">
          <CSelect
            v-model="selectedColumnOption"
            placeholder="Customize Columns"
            :options="columnOptions"
          >
            <template #prefix>
              <Columns3 class="size-3.5 mr-1.5 text-muted-foreground" />
            </template>
          </CSelect>
        </div>
        <Button size="sm" @click="addSection" class="gap-1 rounded-lg">
          <Plus class="size-4" />
          Add Section
        </Button>
      </div>
    </div>

    <!-- Main Data Table -->
    <div class="border rounded-xl bg-background overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow class="bg-transparent hover:bg-transparent border-b">
            <TableHead class="w-8 px-2 text-center"></TableHead>
            <TableHead class="w-8 px-2">
              <Checkbox
                :checked="isAllSelected"
                @update:checked="toggleSelectAll"
              />
            </TableHead>
            <TableHead class="font-medium text-muted-foreground text-xs"
              >Header</TableHead
            >
            <TableHead class="font-medium text-muted-foreground text-xs"
              >Section Type</TableHead
            >
            <TableHead class="font-medium text-muted-foreground text-xs"
              >Status</TableHead
            >
            <TableHead class="font-medium text-muted-foreground text-xs"
              >Target</TableHead
            >
            <TableHead class="font-medium text-muted-foreground text-xs"
              >Limit</TableHead
            >
            <TableHead class="font-medium text-muted-foreground text-xs"
              >Reviewer</TableHead
            >
            <TableHead class="w-10 px-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in items"
            :key="row.id"
            :class="[
              'group transition-colors',
              selectedRowIds.includes(row.id) ? 'bg-muted/30' : '',
            ]"
          >
            <!-- Drag Handle -->
            <TableCell class="w-8 px-2 text-center">
              <GripVertical
                class="size-4 text-muted-foreground/40 group-hover:text-muted-foreground cursor-grab inline-block"
              />
            </TableCell>

            <!-- Checkbox -->
            <TableCell class="w-8 px-2">
              <Checkbox
                :checked="selectedRowIds.includes(row.id)"
                @update:checked="(val) => toggleRowSelection(row.id, val)"
              />
            </TableCell>

            <!-- Header Title -->
            <TableCell class="font-medium text-sm text-foreground">
              {{ row.header }}
            </TableCell>

            <!-- Section Type Badge -->
            <TableCell>
              <span
                class="inline-block px-3 py-1 text-xs rounded-full border border-border/80 bg-muted/30 text-foreground font-normal"
              >
                {{ row.type }}
              </span>
            </TableCell>

            <!-- Status -->
            <TableCell>
              <div class="flex items-center gap-1.5 text-xs font-medium">
                <template v-if="row.status === 'done'">
                  <CheckCircle2 class="size-4 text-emerald-500 shrink-0" />
                  <span>Done</span>
                </template>
                <template v-else>
                  <Loader2
                    class="size-4 text-muted-foreground shrink-0 animate-spin opacity-70"
                  />
                  <span>In Process</span>
                </template>
              </div>
            </TableCell>

            <!-- Target -->
            <TableCell class="text-sm font-medium text-foreground">
              {{ row.target }}
            </TableCell>

            <!-- Limit -->
            <TableCell class="text-sm font-medium text-foreground">
              {{ row.limit }}
            </TableCell>

            <!-- Reviewer -->
            <TableCell class="w-[200px]">
              <template v-if="row.reviewer">
                <span class="text-sm text-foreground">{{ row.reviewer }}</span>
              </template>
              <template v-else>
                <div class="w-[160px]">
                  <CSelect
                    v-model="row.reviewer"
                    placeholder="Assign reviewer"
                    :options="reviewerOptions"
                  />
                </div>
              </template>
            </TableCell>

            <!-- Actions Menu -->
            <TableCell class="w-10 px-2 text-right">
              <Button
                variant="ghost"
                size="icon"
                class="size-8 text-muted-foreground hover:text-foreground"
              >
                <MoreVertical class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <!-- Footer / Pagination Bar -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-t text-xs text-muted-foreground gap-3"
      >
        <div>{{ selectedRowIds.length }} of 30 row(s) selected.</div>
        <div class="flex items-center gap-4">
          <!-- Rows per page -->
          <div class="flex items-center gap-2">
            <span>Rows per page</span>
            <div class="w-[70px]">
              <CSelect v-model="rowsPerPage" :options="rowsPerPageOptions" />
            </div>
          </div>

          <!-- Page indicator -->
          <div>Page 1 of 3</div>

          <!-- Pagination buttons -->
          <div class="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              class="size-7 p-0"
              disabled
            >
              <ChevronsLeft class="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              class="size-7 p-0"
              disabled
            >
              <ChevronLeft class="size-3.5" />
            </Button>
            <Button variant="outline" size="icon" class="size-7 p-0">
              <ChevronRight class="size-3.5" />
            </Button>
            <Button variant="outline" size="icon" class="size-7 p-0">
              <ChevronsRight class="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
