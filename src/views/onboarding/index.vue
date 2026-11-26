<template>
  <div class="min-h-screen bg-[#FCFCFA] text-[#14241E]">
    <div class="bg-[#14241E] text-white border-b border-stone-800 py-10 md:py-12">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-2 text-xs text-stone-400 mb-4">
          <button
            type="button"
            @click="router.push('/')"
            class="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span>Admissions</span>
          <span>/</span>
          <span class="text-emerald-400 font-semibold">Student Onboarding</span>
        </div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge variant="default" class="mb-2">
              {{ completed ? 'Registration Complete' : '3 Free Trial Classes · No Card Required' }}
            </Badge>
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {{ completed ? 'Welcome to Khizar Quran Academy' : 'Set Up Your Student Profile' }}
            </h1>
            <p class="text-xs sm:text-sm text-stone-300 mt-1">
              {{
                completed
                  ? 'Your 3 free 1-on-1 trial classes have been scheduled.'
                  : 'Fill in the student details below to book 3 free 30-minute live classes with a certified teacher.'
              }}
            </p>
          </div>

          <div class="text-xs text-stone-400 flex items-center gap-2 shrink-0">
            <Phone class="w-3.5 h-3.5 text-emerald-400" />
            <span>Admissions: +92 331 4278863</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 py-10 md:py-12">
      <!-- Completion View -->
      <div v-if="completed" class="space-y-6">
        <div class="flex items-center gap-4 p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div class="w-14 h-14 rounded-2xl bg-[#0E6245] text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 class="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-emerald-950">
              Registration Complete! 3 Free Classes Booked
            </h2>
            <p class="text-xs sm:text-sm text-emerald-800 mt-1">
              <strong>{{ form.studentName }}</strong> is registered for 3 free trial sessions. Our academic coordinator will contact you via WhatsApp to finalize your exact meeting link.
            </p>
          </div>
        </div>

        <CCard title="Enrolment Summary" class="border-stone-200 rounded-2xl bg-white">
          <div class="space-y-3 text-xs sm:text-sm">
            <div class="flex justify-between py-1.5 border-b border-stone-100">
              <span class="text-stone-500">Student Name:</span>
              <span class="font-bold text-stone-900">{{ form.studentName }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-stone-100">
              <span class="text-stone-500">Student Age:</span>
              <span class="font-bold text-stone-900">{{ form.studentAge }} years</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-stone-100">
              <span class="text-stone-500">Selected Course:</span>
              <span class="font-bold text-stone-900">{{ selectedCourseLabel }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-stone-100">
              <span class="text-stone-500">Teacher Preference:</span>
              <span class="font-bold text-stone-900 capitalize">{{ form.teacherGender }} Teacher</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-stone-100">
              <span class="text-stone-500">Preferred Class Time:</span>
              <span class="font-bold text-stone-900">{{ form.preferredTime }}</span>
            </div>
            <div class="flex justify-between py-1.5 pt-2">
              <span class="text-stone-500">Tuition Rate:</span>
              <span class="font-bold text-[#0E6245]">$30 / month (after 3 free trial classes)</span>
            </div>
          </div>
        </CCard>

        <div class="flex flex-col sm:flex-row gap-3">
          <Button
            @click="router.push('/portal')"
            class="py-4 h-auto px-6 rounded-xl font-bold text-sm text-white bg-[#0E6245] hover:bg-[#0b4d36] shadow-md flex items-center justify-center gap-2"
          >
            <span>Open Student Portal</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            @click="router.push('/')"
            class="py-4 h-auto px-6 rounded-xl font-bold text-sm"
          >
            Return to Homepage
          </Button>
        </div>
      </div>

      <!-- Unified Onboarding Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-8">
          <CCard
            title="Student & Class Details"
            description="Complete all fields below to schedule your 3 free 1-on-1 trial sessions."
            class="border-stone-200 rounded-2xl bg-white shadow-xs"
          >
            <CForm :initialValues="form" :onSubmit="onSubmit" :schema="schema">
              <div class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CField label="Student Full Name" name="studentName" required>
                    <CInput
                      id="studentName"
                      v-model="form.studentName"
                      type="text"
                      placeholder="e.g. Ibrahim Qasim"
                      class="h-11 bg-white border-stone-300 rounded-xl"
                    />
                  </CField>

                  <CField label="Student Age (Years)" name="studentAge" required helper="Enter age in years (e.g. 8, or 25 for adults)">
                    <CInput
                      id="studentAge"
                      v-model="form.studentAge"
                      type="number"
                      min="3"
                      max="100"
                      placeholder="e.g. 8"
                      class="h-11 bg-white border-stone-300 rounded-xl"
                    />
                  </CField>
                </div>

                <CField label="Select Course" name="course" required>
                  <CRadioGroup v-model="form.course" :options="courseOptions" />
                </CField>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CField label="Preferred Class Time" name="preferredTime" required>
                    <CSelect
                      v-model="form.preferredTime"
                      :options="timeSlotOptions"
                      placeholder="Select time slot"
                      trigger-class="h-11 bg-white border-stone-300 rounded-xl"
                    />
                  </CField>

                  <CField label="Teacher Preference" name="teacherGender" required>
                    <CRadioGroup v-model="form.teacherGender" :options="teacherOptions" />
                  </CField>
                </div>

                <div class="pt-4 border-t border-stone-100 flex justify-end">
                  <Button
                    type="submit"
                    :disabled="submitting"
                    class="w-full sm:w-auto px-8 py-3.5 h-auto rounded-xl font-bold text-sm text-white bg-[#0E6245] hover:bg-[#0b4d36] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>{{ submitting ? 'Registering Student...' : 'Complete & Book 3 Free Classes' }}</span>
                    <ArrowRight class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CForm>
          </CCard>
        </div>

        <!-- Live Summary Sidebar -->
        <div class="lg:col-span-4 space-y-4">
          <CCard
            title="Trial Summary"
            description="Your selections update in real time."
            class="border-stone-200 rounded-2xl bg-white shadow-xs"
          >
            <div class="space-y-3 text-xs sm:text-sm">
              <div class="flex justify-between py-1.5 border-b border-stone-100">
                <span class="text-stone-500">Student</span>
                <span class="font-semibold text-stone-900">{{ form.studentName || '—' }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-stone-100">
                <span class="text-stone-500">Age</span>
                <span class="font-semibold text-stone-900">{{ form.studentAge ? `${form.studentAge} yrs` : '—' }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-stone-100">
                <span class="text-stone-500">Course</span>
                <span class="font-semibold text-stone-900 text-right">{{ selectedCourseLabel }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-stone-100">
                <span class="text-stone-500">Time Slot</span>
                <span class="font-semibold text-stone-900 text-right">{{ form.preferredTime }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-stone-100">
                <span class="text-stone-500">Teacher</span>
                <span class="font-semibold text-stone-900 capitalize">{{ form.teacherGender }} Teacher</span>
              </div>
              <div class="flex justify-between py-1.5 pt-2">
                <span class="text-stone-500">Trial Cost</span>
                <Badge variant="success">3 Classes Free</Badge>
              </div>
            </div>
          </CCard>

          <CCard hide-header class="p-5 rounded-2xl bg-emerald-50/70 border-emerald-200 text-xs space-y-2">
            <div class="flex items-center gap-2 font-bold text-[#0E6245]">
              <ShieldCheck class="w-4 h-4" />
              <span>No Credit Card Required</span>
            </div>
            <p class="text-stone-600 leading-relaxed">
              Take 3 full 30-minute 1-on-1 trial classes first. Monthly tuition ($30/mo) only starts if you decide to continue.
            </p>
          </CCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { helpers, minValue, maxValue, numeric, required } from '@vuelidate/validators';
import { toast } from 'vue-sonner';
import { CheckCircle2, ArrowRight, ArrowLeft, Phone, ShieldCheck } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CCard from '@/components/common/CCard.vue';
import CForm from '@/components/common/form/CForm.vue';
import CField from '@/components/common/form/CField.vue';
import CInput from '@/components/common/form/CInput.vue';
import CSelect from '@/components/common/form/CSelect.vue';
import CRadioGroup from '@/components/common/form/CRadioGroup.vue';
import { useAcademyStore } from '@/stores/academy.store';
import type { CourseLevel, TeacherGender } from '@/types/academy';

const courseOptions = [
  { label: 'Noorani Qaida (Beginner Level — Arabic letters & word connection)', value: 'noorani_qaida' },
  { label: 'Quran Reading with Tajweed & Nazra (Fluent recitation & Makharij)', value: 'nazra_tajweed' },
  { label: 'Hifz — Quran Memorization (Sabaq, Sabqi & Manzil)', value: 'hifz_program' },
  { label: 'Islamic Studies & Duas for Kids (Salah, Kalimahs & Seerah)', value: 'islamic_studies' },
];

const timeSlotOptions = [
  'Morning (8:00 AM – 11:00 AM)',
  'Afternoon (1:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 7:00 PM)',
  'Night (7:00 PM – 10:00 PM)',
  'Weekend Mornings',
].map((slot) => ({ label: slot, value: slot }));

const teacherOptions = [
  { label: 'Female Teacher (Alimah / Hafiza)', value: 'female' },
  { label: 'Male Teacher (Qari / Hafiz)', value: 'male' },
];

const router = useRouter();
const store = useAcademyStore();

const submitting = ref(false);
const completed = ref(false);

const form = reactive({
  studentName: store.currentUser?.name || '',
  studentAge: '8',
  course: 'noorani_qaida' as CourseLevel,
  preferredTime: 'Evening (4:00 PM – 7:00 PM)',
  teacherGender: 'female' as TeacherGender,
});

const schema = {
  studentName: {
    required: helpers.withMessage('Please enter the student name.', required),
  },
  studentAge: {
    required: helpers.withMessage('Please enter the student age.', required),
    numeric: helpers.withMessage('Age must be a valid number.', numeric),
    minValue: helpers.withMessage('Age must be at least 3 years.', minValue(3)),
    maxValue: helpers.withMessage('Age must be 100 or less.', maxValue(100)),
  },
  course: {
    required: helpers.withMessage('Please select a course.', required),
  },
  preferredTime: {
    required: helpers.withMessage('Please select a preferred time slot.', required),
  },
  teacherGender: {
    required: helpers.withMessage('Please select a teacher preference.', required),
  },
};

const selectedCourseLabel = computed(
  () => courseOptions.find((c) => c.value === form.course)?.label.split(' (')[0] || 'Noorani Qaida'
);

onMounted(() => {
  if (!store.currentUser && !completed.value) {
    router.push('/signup');
  }
});

async function onSubmit() {
  submitting.value = true;
  const ageNum = parseInt(String(form.studentAge), 10) || 8;
  try {
    await store.handleAddStudentAndTrial({
      name: form.studentName.trim(),
      age: `${ageNum} years old`,
      isAdult: ageNum >= 19,
      level: form.course,
      preferredTeacherGender: form.teacherGender,
      daysPerWeek: 4,
      preferredTimeSlot: form.preferredTime,
      timezone: store.region.primaryTimezone,
    });
    completed.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err: any) {
    toast.error(err?.message || 'Could not complete onboarding. Please try again.');
  } finally {
    submitting.value = false;
  }
}
</script>
