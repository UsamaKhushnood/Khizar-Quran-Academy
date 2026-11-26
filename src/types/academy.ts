export type RegionId = 'usa' | 'canada' | 'uae' | 'pakistan';

export interface PricingPlan {
  daysPerWeek: number;
  monthlyPrice: number;
  classesPerMonth: number;
  recommendedFor: string;
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  timezones: string[];
  primaryTimezone: string;
  sampleTime: string;
  supportPhone: string;
  plans: PricingPlan[];
}

export type CourseLevel =
  | 'noorani_qaida'
  | 'quran_reading'
  | 'nazra_tajweed'
  | 'tajweed_rules'
  | 'hifz_memorization'
  | 'hifz_program'
  | 'islamic_studies';

export type TeacherGender = 'female' | 'male' | 'any';

export type StudentStatus = 'trial_pending' | 'trial_active' | 'enrolled_monthly' | 'paused';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface StudentProfile {
  id: string;
  parentId: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  name: string;
  age: string;
  isAdult: boolean;
  level: CourseLevel;
  preferredTeacherGender: TeacherGender;
  assignedTeacherName: string;
  assignedTeacherGender: 'male' | 'female';
  daysPerWeek: number;
  preferredTimeSlot: string;
  timezone: string;
  regionId: RegionId;
  enrollmentDate: string;
  meetingPlatform: 'Google Meet' | 'Zoom';
  meetingLink: string;
  status: StudentStatus;
  notes?: string;
}

export interface ScheduledClass {
  id: string;
  studentId: string;
  studentName: string;
  teacherName: string;
  teacherGender: 'male' | 'female';
  teacherImage: string;
  subject: string;
  dateStr: string;
  timeStr: string;
  timezone: string;
  durationMinutes: number;
  isTrial: boolean;
  meetingPlatform: 'Google Meet' | 'Zoom';
  meetingLink: string;
  status: 'upcoming' | 'completed';
}

export interface TeacherProfile {
  id: string;
  name: string;
  title: string;
  gender: 'male' | 'female';
  experienceYears: number;
  languages: string[];
  education: string;
  bio: string;
  rating: number;
  activeStudents: number;
  image: string;
}

export interface QaidaItem {
  id: number;
  arabic: string;
  name: string;
  fullArabicName?: string;
  transliteration: string;
  makhraj: string;
  tip: string;
  audioFreq: number;
  audioFile?: string;
}
