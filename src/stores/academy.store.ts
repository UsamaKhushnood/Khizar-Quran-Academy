import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';
import VueCookies from 'vue-cookies';
import api from '@/helpers/axios';
import { REGIONS_DATA } from '@/data/academyData';
import type {
  RegionId,
  UserAccount,
  StudentProfile,
  ScheduledClass,
  CourseLevel,
  TeacherGender,
} from '@/types/academy';

const LOCAL_STORAGE_USER = 'khizar_user_v2';
const LOCAL_STORAGE_STUDENTS = 'khizar_students_v2';
const LOCAL_STORAGE_CLASSES = 'khizar_classes_v2';
const LOCAL_STORAGE_REGION = 'khizar_region_v2';

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setToken(token: string) {
  try {
    (VueCookies as any).set('token', token, '7d', '/');
  } catch {
    // ignore cookie error
  }
  localStorage.setItem('khizar_token', token);
}

function clearToken() {
  try {
    (VueCookies as any).remove('token');
  } catch {
    // ignore
  }
  localStorage.removeItem('khizar_token');
}

export const useAcademyStore = defineStore('academy', () => {
  const savedRegion = localStorage.getItem(LOCAL_STORAGE_REGION) as RegionId | null;
  const regionId = ref<RegionId>(savedRegion && REGIONS_DATA[savedRegion] ? savedRegion : 'usa');
  const currentUser = ref<UserAccount | null>(loadJson<UserAccount | null>(LOCAL_STORAGE_USER, null));
  const students = ref<StudentProfile[]>(loadJson<StudentProfile[]>(LOCAL_STORAGE_STUDENTS, []));
  const classes = ref<ScheduledClass[]>(loadJson<ScheduledClass[]>(LOCAL_STORAGE_CLASSES, []));

  const region = computed(() => REGIONS_DATA[regionId.value] || REGIONS_DATA.usa);

  function setRegionById(id: RegionId) {
    regionId.value = id;
    localStorage.setItem(LOCAL_STORAGE_REGION, id);
  }

  function persistUser(user: UserAccount | null) {
    currentUser.value = user;
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER);
    }
  }

  async function handleRegister(data: { name: string; email: string; phone?: string; password?: string }) {
    const response = await api.post('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const resJson = response.data;
    const newUser: UserAccount = {
      id: resJson?.user?.id ? `usr_${resJson.user.id}` : `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '+92 331 4278863',
      createdAt: new Date().toISOString(),
    };

    if (resJson?.access_token) {
      setToken(resJson.access_token);
    }

    persistUser(newUser);
    toast.success('Account created! Let’s set up your 3 free trial classes.');
  }

  async function handleLogin(email: string, password?: string): Promise<boolean> {
    const trimmed = email.trim().toLowerCase();
    if (!password) return false;

    try {
      const response = await api.post('/auth/login', {
        login: trimmed,
        password,
      });
      const resJson = response.data;

      const loggedInUser: UserAccount = {
        id: resJson?.user?.id ? `usr_${resJson.user.id}` : `usr_${Date.now()}`,
        name: resJson?.user?.name || trimmed.split('@')[0],
        email: resJson?.user?.email || trimmed,
        phone: '+92 331 4278863',
        createdAt: new Date().toISOString(),
      };

      if (resJson?.access_token) {
        setToken(resJson.access_token);
      }

      persistUser(loggedInUser);
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      return true;
    } catch {
      return false;
    }
  }

  function handleLogout() {
    clearToken();
    persistUser(null);
    toast.info('You have been signed out.');
  }

  async function handleAddStudentAndTrial(studentData: {
    name: string;
    age: string;
    isAdult?: boolean;
    level: CourseLevel;
    preferredTeacherGender: TeacherGender;
    daysPerWeek: number;
    preferredTimeSlot: string;
    timezone: string;
  }) {
    const parent = currentUser.value || {
      id: `usr_${Date.now()}`,
      name: 'Registered Parent',
      email: 'parent@khizarquranacademy.com',
      phone: '+92 331 4278863',
      createdAt: new Date().toISOString(),
    };

    const newStudentId = `std_${Date.now()}`;
    const assignedTeacher =
      studentData.preferredTeacherGender === 'male'
        ? { name: 'Qari Muhammad Farooq', gender: 'male' as const, image: '/images/teacher-male.jpg' }
        : { name: 'Ustadha Ayesha Siddiqua', gender: 'female' as const, image: '/images/teacher-female.jpg' };

    const todayStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());

    const newStudent: StudentProfile = {
      id: newStudentId,
      parentId: parent.id,
      parentName: parent.name,
      parentEmail: parent.email,
      parentPhone: parent.phone,
      name: studentData.name,
      age: studentData.age,
      isAdult: Boolean(studentData.isAdult),
      level: studentData.level,
      preferredTeacherGender: studentData.preferredTeacherGender,
      assignedTeacherName: assignedTeacher.name,
      assignedTeacherGender: assignedTeacher.gender,
      daysPerWeek: studentData.daysPerWeek,
      preferredTimeSlot: studentData.preferredTimeSlot,
      timezone: studentData.timezone || region.value.primaryTimezone,
      regionId: region.value.id,
      enrollmentDate: todayStr,
      meetingPlatform: 'Google Meet',
      meetingLink: `https://meet.google.com/qur-khiz-${Math.random().toString(36).substring(2, 6)}`,
      status: 'trial_pending',
      notes: 'New trial booking requested via website enrollment.',
    };

    const newClass: ScheduledClass = {
      id: `cls_${Date.now()}`,
      studentId: newStudentId,
      studentName: studentData.name,
      teacherName: assignedTeacher.name,
      teacherGender: assignedTeacher.gender,
      teacherImage: assignedTeacher.image,
      subject: 'Free Trial Class 1: Orientation & Pronunciation Assessment',
      dateStr: 'Tomorrow',
      timeStr: studentData.preferredTimeSlot.split('–')[0].trim() || '5:00 PM',
      timezone: studentData.timezone || region.value.primaryTimezone,
      durationMinutes: 30,
      isTrial: true,
      meetingPlatform: 'Google Meet',
      meetingLink: newStudent.meetingLink,
      status: 'upcoming',
    };

    students.value = [newStudent, ...students.value];
    classes.value = [newClass, ...classes.value];
    localStorage.setItem(LOCAL_STORAGE_STUDENTS, JSON.stringify(students.value));
    localStorage.setItem(LOCAL_STORAGE_CLASSES, JSON.stringify(classes.value));

    try {
      await api.post(
        '/students/onboarding',
        {
          student_name: newStudent.name,
          child_name: newStudent.name,
          parent_name: newStudent.parentName,
          email: newStudent.parentEmail,
          phone: newStudent.parentPhone,
          age: parseInt(newStudent.age, 10) || 8,
          course: newStudent.level,
          course_level: newStudent.level,
          preferred_time_slot: newStudent.preferredTimeSlot,
          preferred_teacher_gender: studentData.preferredTeacherGender,
          timezone: newStudent.timezone,
          country: region.value.name,
        },
        { ignoreGlobalCatch: true } as any
      );
      toast.success('Your 3 free trial classes are booked!');
    } catch {
      toast.info('Trial saved locally. Our team will confirm your schedule shortly.');
    }
  }

  function rescheduleClass(classId: string, newDate: string, newTime: string) {
    classes.value = classes.value.map((c) =>
      c.id === classId ? { ...c, dateStr: newDate, timeStr: newTime } : c
    );
    localStorage.setItem(LOCAL_STORAGE_CLASSES, JSON.stringify(classes.value));
    toast.success('Class schedule updated.');
  }

  return {
    regionId,
    region,
    setRegionById,
    currentUser,
    students,
    classes,
    handleRegister,
    handleLogin,
    handleLogout,
    handleAddStudentAndTrial,
    rescheduleClass,
  };
});
