<template>
  <div class="min-h-screen bg-[#F7F6F2] text-[#14241E] pb-20">
    <div class="bg-[#14241E] text-white py-6 px-4 sm:px-6 border-b border-stone-800">
      <div class="container mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs text-[#D49A3D] font-semibold uppercase tracking-wider mb-1">
            <span>Parent & Student Portal</span>
            <span>·</span>
            <span class="flex items-center gap-1 text-stone-300">
              <Globe class="w-3.5 h-3.5 text-emerald-400" />
              <span>{{ store.region.flag }} {{ store.region.name }} ({{ store.region.primaryTimezone }})</span>
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Assalamu Alaikum, {{ store.currentUser?.name || 'Parent' }}
          </h1>
          <p class="text-xs sm:text-sm text-stone-300 mt-0.5">
            Review your enrolled students, class times, and Google Meet / Zoom links.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Button
            @click="router.push('/onboarding')"
            class="px-3.5 py-2 h-auto text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle class="w-3.5 h-3.5" />
            <span>Enroll Another Child / Student</span>
          </Button>
          <Button
            variant="ghost"
            @click="router.push('/')"
            class="px-3 py-2 h-auto text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
          >
            Browse Website
          </Button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 pt-8 space-y-8">
      <div v-if="store.students.length > 1" class="flex items-center gap-2 overflow-x-auto pb-2">
        <span class="text-xs font-bold text-stone-500 mr-1">Select Student:</span>
        <button
          v-for="st in store.students"
          :key="st.id"
          type="button"
          @click="selectedStudentId = st.id"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
            currentStudent?.id === st.id
              ? 'bg-[#0E6245] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50',
          ]"
        >
          {{ st.name }} ({{ st.level === 'noorani_qaida' ? 'Qaida' : 'Quran' }})
        </button>
      </div>

      <CCard v-if="currentStudent" hide-header class="p-6 sm:p-8 rounded-2xl bg-white border-stone-200/90 shadow-sm space-y-6 gap-0">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <StatusBadge :status="currentStudent.status === 'trial_pending' ? 'pending' : 'active'">
                <span>
                  {{
                    currentStudent.status === 'trial_pending'
                      ? 'Trial Class Scheduled'
                      : currentStudent.status === 'enrolled_monthly'
                      ? 'Enrolled Monthly'
                      : 'Trial Active (3 Free Classes)'
                  }}
                </span>
              </StatusBadge>
              <span class="text-xs text-stone-500">
                Enrolled on <strong>{{ currentStudent.enrollmentDate || 'Nov 11, 2026' }}</strong>
              </span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#14241E] tracking-tight">
              {{ currentStudent.name }}
            </h2>
            <p class="text-sm font-semibold text-[#0E6245] mt-0.5">
              {{ getCourseTitle(currentStudent.level) }} · {{ currentStudent.age }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              :href="currentStudent.meetingLink || 'https://meet.google.com'"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 rounded-xl bg-[#0E6245] hover:bg-[#0b4d36] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video class="w-4 h-4" />
              <span>Join via {{ currentStudent.meetingPlatform || 'Google Meet' }}</span>
              <ExternalLink class="w-3.5 h-3.5 opacity-80" />
            </a>

            <Button
              v-if="studentClass"
              variant="outline"
              @click="openReschedule(studentClass.id)"
              class="px-4 py-3.5 h-auto rounded-xl border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw class="w-3.5 h-3.5" />
              <span>Reschedule Time</span>
            </Button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div class="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div class="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
              <User class="w-3.5 h-3.5 text-[#0E6245]" />
              <span>Assigned Teacher</span>
            </div>
            <h4 class="text-sm font-bold text-stone-900">
              {{ currentStudent.assignedTeacherName || 'Ustadha Ayesha Siddiqua' }}
            </h4>
            <p class="text-xs text-stone-500 mt-0.5">
              {{ currentStudent.assignedTeacherGender === 'female' ? 'Certified Female Instructor' : 'Certified Male Qari' }}
            </p>
          </div>

          <div class="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div class="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
              <Clock class="w-3.5 h-3.5 text-[#0E6245]" />
              <span>Daily Class Time</span>
            </div>
            <h4 class="text-sm font-bold text-stone-900 font-mono">
              {{ currentStudent.preferredTimeSlot || '5:30 PM – 6:00 PM' }}
            </h4>
            <p class="text-xs text-stone-500 mt-0.5">
              {{ currentStudent.timezone || store.region.primaryTimezone }}
            </p>
          </div>

          <div class="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div class="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
              <Calendar class="w-3.5 h-3.5 text-[#0E6245]" />
              <span>Weekly Schedule</span>
            </div>
            <h4 class="text-sm font-bold text-stone-900">
              {{ currentStudent.daysPerWeek }} Days / Week
            </h4>
            <p class="text-xs text-stone-500 mt-0.5">30 minutes per class (1-on-1)</p>
          </div>

          <div class="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div class="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
              <CreditCard class="w-3.5 h-3.5 text-[#0E6245]" />
              <span>Monthly Tuition</span>
            </div>
            <h4 class="text-sm font-bold text-stone-900 font-mono">
              {{ store.region.currencySymbol }}{{ planPrice.toLocaleString() }} / mo
            </h4>
            <p class="text-xs text-stone-500 mt-0.5">
              {{
                currentStudent.status === 'trial_pending' || currentStudent.status === 'trial_active'
                  ? '3 Free Classes First'
                  : 'Simple monthly billing'
              }}
            </p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Video class="w-4 h-4" />
            </div>
            <div>
              <p class="text-xs font-bold text-[#0E6245]">
                Class Link ({{ currentStudent.meetingPlatform }}):
              </p>
              <a
                :href="currentStudent.meetingLink"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-stone-700 underline font-mono break-all hover:text-[#0E6245]"
              >
                {{ currentStudent.meetingLink }}
              </a>
            </div>
          </div>

          <a
            :href="whatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <MessageCircle class="w-3.5 h-3.5" />
            <span>WhatsApp Coordinator</span>
          </a>
        </div>
      </CCard>

      <CCard v-else hide-header class="p-8 rounded-2xl bg-white border-stone-200/90 text-center space-y-4">
        <h2 class="text-xl font-bold text-[#14241E]">No Students Enrolled Yet</h2>
        <p class="text-sm text-stone-600">Complete your student profile to book 3 free trial classes.</p>
        <Button @click="router.push('/onboarding')" class="bg-[#0E6245] hover:bg-[#0b4d36] text-white">
          Book 3 Free Trial Classes
        </Button>
      </CCard>

      <CCard hide-header class="p-5 rounded-2xl bg-white border-stone-200/90 shadow-xs">
        <div class="flex items-center gap-3">
          <ShieldCheck class="w-6 h-6 text-[#0E6245] shrink-0" />
          <div class="text-xs text-stone-600">
            <strong class="text-stone-900 font-bold">Simple Parent Policy: </strong>
            Classes are held directly over Google Meet or Zoom. You can change your study days or pause classes at any time by messaging your teacher or calling
            <strong>{{ store.region.supportPhone }}</strong>.
          </div>
        </div>
      </CCard>
    </div>

    <CDialog
      ref="rescheduleDialog"
      title="Reschedule Class Time"
      :description="`Pick a new day and convenient 30-minute time slot in ${store.region.primaryTimezone}.`"
      @create="confirmReschedule"
    >
      <div class="space-y-4 py-2">
        <CSelect
          v-model="newRescheduleDate"
          :options="dayOptions"
          placeholder="Select Day"
          show-label
        />
        <CSelect
          v-model="newRescheduleTime"
          :options="timeOptions"
          placeholder="Select 30-Min Time Slot"
          show-label
        />
      </div>
    </CDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Calendar,
  Clock,
  User,
  PlusCircle,
  ExternalLink,
  Video,
  CreditCard,
  RotateCcw,
  Globe,
  MessageCircle,
  ShieldCheck,
} from '@lucide/vue';
import { Button } from '@/components/ui/button';
import CCard from '@/components/common/CCard.vue';
import CDialog from '@/components/common/CDialog.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import CSelect from '@/components/common/form/CSelect.vue';
import { useAcademyStore } from '@/stores/academy.store';

const router = useRouter();
const store = useAcademyStore();

const selectedStudentId = ref(store.students[0]?.id || '');
const rescheduleModalClassId = ref<string | null>(null);
const newRescheduleTime = ref('6:00 PM – 6:30 PM');
const newRescheduleDate = ref('Tomorrow');
const rescheduleDialog = ref<InstanceType<typeof CDialog> | null>(null);

const dayOptions = [
  { label: 'Tomorrow', value: 'Tomorrow' },
  { label: 'In 2 Days', value: 'In 2 Days' },
  { label: 'This Saturday', value: 'This Saturday' },
  { label: 'This Sunday', value: 'This Sunday' },
];

const timeOptions = [
  '4:00 PM – 4:30 PM',
  '5:00 PM – 5:30 PM',
  '5:30 PM – 6:00 PM',
  '6:00 PM – 6:30 PM',
  '7:00 PM – 7:30 PM',
  '8:00 PM – 8:30 PM',
].map((t) => ({ label: t, value: t }));

const currentStudent = computed(
  () => store.students.find((s) => s.id === selectedStudentId.value) || store.students[0]
);

const studentClass = computed(
  () => store.classes.find((c) => (currentStudent.value ? c.studentId === currentStudent.value.id : true)) || store.classes[0]
);

const planPrice = computed(
  () => store.region.plans.find((p) => p.daysPerWeek === (currentStudent.value?.daysPerWeek || 3))?.monthlyPrice || 65
);

const whatsAppUrl = computed(() => {
  const phone = store.region.supportPhone.replace(/[^0-9]/g, '');
  const name = encodeURIComponent(currentStudent.value?.name || 'Student');
  return `https://wa.me/${phone}?text=Assalamu%20Alaikum,%20I%20am%20inquiring%20regarding%20my%20child%20${name}'s%20Quran%20classes`;
});

function getCourseTitle(lvl: string) {
  switch (lvl) {
    case 'noorani_qaida':
      return 'Noorani Qaida for Beginners';
    case 'quran_reading':
    case 'nazra_tajweed':
      return 'Quran Reading with Tajweed (Nazra)';
    case 'hifz_memorization':
    case 'hifz_program':
      return 'Quran Memorization (Hifz)';
    case 'islamic_studies':
      return 'Islamic Studies & Duas for Kids';
    default:
      return 'Quran Learning Program';
  }
}

function openReschedule(classId: string) {
  rescheduleModalClassId.value = classId;
  rescheduleDialog.value?.show();
}

function confirmReschedule() {
  if (rescheduleModalClassId.value) {
    store.rescheduleClass(
      rescheduleModalClassId.value,
      newRescheduleDate.value,
      newRescheduleTime.value.split('–')[0].trim()
    );
    rescheduleModalClassId.value = null;
    rescheduleDialog.value?.hide();
  }
}
</script>
