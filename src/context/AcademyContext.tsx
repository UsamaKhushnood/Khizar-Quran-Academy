import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RegionId,
  RegionInfo,
  UserAccount,
  StudentProfile,
  ScheduledClass,
  ViewMode,
  StudentStatus,
  TeacherGender,
  CourseLevel,
} from '../types';
import { REGIONS_DATA } from '../data/academyData';

interface AcademyContextType {
  region: RegionInfo;
  setRegionById: (id: RegionId) => void;
  currentUser: UserAccount | null;
  students: StudentProfile[];
  classes: ScheduledClass[];
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  handleRegister: (data: { name: string; email: string; phone: string; password?: string }) => void;
  handleLogin: (email: string) => boolean;
  handleLogout: () => void;
  handleAddStudentAndTrial: (studentData: {
    name: string;
    age: string;
    isAdult: boolean;
    level: CourseLevel;
    preferredTeacherGender: TeacherGender;
    daysPerWeek: number;
    preferredTimeSlot: string;
    timezone: string;
  }) => void;
  rescheduleClass: (classId: string, newDate: string, newTime: string) => void;
  openTrialBooking: () => void;
  // Admin actions
  updateStudentStatus: (studentId: string, status: StudentStatus) => void;
  assignTeacherToStudent: (studentId: string, teacherName: string, teacherGender: 'male' | 'female') => void;
  updateMeetingLink: (studentId: string, platform: 'Google Meet' | 'Zoom', link: string) => void;
  deleteStudent: (studentId: string) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const LOCAL_STORAGE_USER = 'khizar_user_v2';
const LOCAL_STORAGE_STUDENTS = 'khizar_students_v2';
const LOCAL_STORAGE_CLASSES = 'khizar_classes_v2';
const LOCAL_STORAGE_REGION = 'khizar_region_v2';
const LOCAL_STORAGE_ACCOUNTS = 'khizar_accounts_v2';

// Seed enrolled students for testing admin & portal
const INITIAL_DEMO_STUDENTS: StudentProfile[] = [
  {
    id: 'std_demo_1',
    parentId: 'usr_demo_1',
    parentName: 'Sister Fatima Malik',
    parentEmail: 'fatima.malik@example.com',
    parentPhone: '+1 (469) 555-0192',
    name: 'Zayn Malik',
    age: '8-12 years old',
    isAdult: false,
    level: 'noorani_qaida',
    preferredTeacherGender: 'female',
    assignedTeacherName: 'Ustadha Ayesha Siddiqua',
    assignedTeacherGender: 'female',
    daysPerWeek: 3,
    preferredTimeSlot: '5:30 PM – 6:00 PM',
    timezone: 'Eastern Time (EST)',
    regionId: 'usa',
    enrollmentDate: 'Nov 8, 2026',
    meetingPlatform: 'Google Meet',
    meetingLink: 'https://meet.google.com/qur-khiz-cls',
    status: 'trial_active',
    notes: 'Father requested gentle pace for Arabic letters.',
  },
  {
    id: 'std_demo_2',
    parentId: 'usr_demo_2',
    parentName: 'Brother Tariq Mahmood',
    parentEmail: 'tariq.m@rogers.ca',
    parentPhone: '+1 (647) 555-8921',
    name: 'Zayd Mahmood',
    age: '8-12 years old',
    isAdult: false,
    level: 'quran_reading',
    preferredTeacherGender: 'male',
    assignedTeacherName: 'Qari Muhammad Farooq',
    assignedTeacherGender: 'male',
    daysPerWeek: 4,
    preferredTimeSlot: '6:00 PM – 6:30 PM',
    timezone: 'Eastern Time (Toronto)',
    regionId: 'canada',
    enrollmentDate: 'Nov 6, 2026',
    meetingPlatform: 'Zoom',
    meetingLink: 'https://zoom.us/j/84920193847',
    status: 'enrolled_monthly',
    notes: 'Starting Para 2 with Tajweed rules.',
  },
  {
    id: 'std_demo_3',
    parentId: 'usr_demo_3',
    parentName: 'Sister Maryam Al-Nuaimi',
    parentEmail: 'maryam.nuaimi@dubai.ae',
    parentPhone: '+971 50 123 4567',
    name: 'Hamdan Al-Nuaimi',
    age: '4-7 years old',
    isAdult: false,
    level: 'noorani_qaida',
    preferredTeacherGender: 'female',
    assignedTeacherName: 'Ustadha Fatima Noor',
    assignedTeacherGender: 'female',
    daysPerWeek: 2,
    preferredTimeSlot: '4:30 PM – 5:00 PM',
    timezone: 'Gulf Standard Time (Dubai)',
    regionId: 'uae',
    enrollmentDate: 'Nov 10, 2026',
    meetingPlatform: 'Google Meet',
    meetingLink: 'https://meet.google.com/dxb-quran-786',
    status: 'trial_pending',
    notes: 'Trial class scheduled for tomorrow.',
  },
  {
    id: 'std_demo_4',
    parentId: 'usr_demo_4',
    parentName: 'Dr. Usman Khokhar',
    parentEmail: 'usman.khokhar@gmail.com',
    parentPhone: '+92 300 555 9812',
    name: 'Amina Khokhar',
    age: '13-17 years old',
    isAdult: false,
    level: 'hifz_memorization',
    preferredTeacherGender: 'female',
    assignedTeacherName: 'Ustadha Ayesha Siddiqua',
    assignedTeacherGender: 'female',
    daysPerWeek: 5,
    preferredTimeSlot: '7:00 PM – 7:30 PM',
    timezone: 'Pakistan Standard Time (PKT)',
    regionId: 'pakistan',
    enrollmentDate: 'Nov 3, 2026',
    meetingPlatform: 'Google Meet',
    meetingLink: 'https://meet.google.com/isb-hifz-learn',
    status: 'enrolled_monthly',
    notes: 'Memorizing Surah Al-Kahf; daily revision.',
  },
];

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regionId, setRegionId] = useState<RegionId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_REGION) as RegionId;
      if (saved && REGIONS_DATA[saved]) return saved;
    }
    return 'usa';
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_STUDENTS);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_DEMO_STUDENTS;
  });

  const [classes, setClasses] = useState<ScheduledClass[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_CLASSES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [
      {
        id: 'cls_demo_1',
        studentId: 'std_demo_1',
        studentName: 'Zayn Malik',
        teacherName: 'Ustadha Ayesha Siddiqua',
        teacherGender: 'female',
        teacherImage: '/src/assets/images/teacher_female_mentor_1794404766984.jpg',
        subject: 'Noorani Qaida (Lesson 4: Joint Letters)',
        dateStr: 'Tomorrow',
        timeStr: '5:30 PM',
        timezone: 'Eastern Time (EST)',
        durationMinutes: 30,
        isTrial: false,
        meetingPlatform: 'Google Meet',
        meetingLink: 'https://meet.google.com/qur-khiz-cls',
        status: 'upcoming',
      },
    ];
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const region = REGIONS_DATA[regionId] || REGIONS_DATA.usa;

  const setRegionById = (id: RegionId) => {
    setRegionId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_REGION, id);
    }
  };

  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_ACCOUNTS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [
      {
        id: 'usr_demo_1',
        name: 'Sister Fatima & Zeeshan Malik',
        email: 'demo@khizar.com',
        phone: '+1 (469) 555-0192',
        password: 'password123',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_admin',
        name: 'Academy Admin (Khizar Academy)',
        email: 'admin@khizar.com',
        phone: '+1 (800) 513-7860',
        password: 'admin',
        createdAt: new Date().toISOString(),
        isAdmin: true,
      },
    ];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CLASSES, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  const handleRegister = (data: { name: string; email: string; phone: string; password?: string }) => {
    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      createdAt: new Date().toISOString(),
    };
    setAccounts((prev) => [...prev.filter((a) => a.email.toLowerCase() !== data.email.toLowerCase()), newUser]);
    setCurrentUser(newUser);
    setIsAuthOpen(false);
    setIsOnboardingOpen(true);
  };

  const handleLogin = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase();

    // Check if admin login
    if (trimmed === 'admin@khizar.com' || trimmed === 'admin') {
      const adminUser: UserAccount = {
        id: 'usr_admin',
        name: 'Academy Director / Admin',
        email: 'admin@khizar.com',
        phone: '+1 (800) 513-7860',
        createdAt: new Date().toISOString(),
        isAdmin: true,
      };
      setCurrentUser(adminUser);
      setIsAuthOpen(false);
      setCurrentView('admin');
      return true;
    }

    const existing = accounts.find((a) => a.email.toLowerCase() === trimmed);
    const loggedInUser: UserAccount = existing || {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email: email,
      phone: '+1 (555) 382-9102',
      createdAt: new Date().toISOString(),
    };

    setCurrentUser(loggedInUser);
    setIsAuthOpen(false);
    setCurrentView('portal');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleAddStudentAndTrial = (studentData: {
    name: string;
    age: string;
    isAdult: boolean;
    level: CourseLevel;
    preferredTeacherGender: TeacherGender;
    daysPerWeek: number;
    preferredTimeSlot: string;
    timezone: string;
  }) => {
    const parent = currentUser || {
      id: 'usr_guest',
      name: 'Registered Parent',
      email: 'parent@example.com',
      phone: '+1 (555) 012-3456',
      createdAt: new Date().toISOString(),
    };

    const newStudentId = 'std_' + Date.now();
    const assignedTeacher = studentData.preferredTeacherGender === 'male'
      ? { name: 'Qari Muhammad Farooq', gender: 'male' as const, image: '/src/assets/images/teacher_male_mentor_1794404768125.jpg' }
      : { name: 'Ustadha Ayesha Siddiqua', gender: 'female' as const, image: '/src/assets/images/teacher_female_mentor_1794404766984.jpg' };

    const todayStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date());

    const newStudent: StudentProfile = {
      id: newStudentId,
      parentId: parent.id,
      parentName: parent.name,
      parentEmail: parent.email,
      parentPhone: parent.phone,
      name: studentData.name,
      age: studentData.age,
      isAdult: studentData.isAdult,
      level: studentData.level,
      preferredTeacherGender: studentData.preferredTeacherGender,
      assignedTeacherName: assignedTeacher.name,
      assignedTeacherGender: assignedTeacher.gender,
      daysPerWeek: studentData.daysPerWeek,
      preferredTimeSlot: studentData.preferredTimeSlot,
      timezone: studentData.timezone || region.primaryTimezone,
      regionId: region.id,
      enrollmentDate: todayStr,
      meetingPlatform: 'Google Meet',
      meetingLink: 'https://meet.google.com/qur-khiz-' + Math.random().toString(36).substring(2, 6),
      status: 'trial_pending',
      notes: 'New trial booking requested via website enrollment.',
    };

    const newClass: ScheduledClass = {
      id: 'cls_' + Date.now(),
      studentId: newStudentId,
      studentName: studentData.name,
      teacherName: assignedTeacher.name,
      teacherGender: assignedTeacher.gender,
      teacherImage: assignedTeacher.image,
      subject: 'Free Trial Class 1: Orientation & Pronunciation Assessment',
      dateStr: 'Tomorrow',
      timeStr: studentData.preferredTimeSlot.split('–')[0].trim() || '5:00 PM',
      timezone: studentData.timezone || region.primaryTimezone,
      durationMinutes: 30,
      isTrial: true,
      meetingPlatform: 'Google Meet',
      meetingLink: newStudent.meetingLink,
      status: 'upcoming',
    };

    setStudents((prev) => [newStudent, ...prev]);
    setClasses((prev) => [newClass, ...prev]);
    setIsOnboardingOpen(false);
    setCurrentView('portal');
  };

  const rescheduleClass = (classId: string, newDate: string, newTime: string) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id === classId) {
          return { ...c, dateStr: newDate, timeStr: newTime };
        }
        return c;
      })
    );
  };

  const openTrialBooking = () => {
    if (currentUser) {
      setIsOnboardingOpen(true);
    } else {
      setAuthMode('signup');
      setIsAuthOpen(true);
    }
  };

  // Admin Methods
  const updateStudentStatus = (studentId: string, status: StudentStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const assignTeacherToStudent = (studentId: string, teacherName: string, teacherGender: 'male' | 'female') => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, assignedTeacherName: teacherName, assignedTeacherGender: teacherGender }
          : s
      )
    );
    setClasses((prev) =>
      prev.map((c) =>
        c.studentId === studentId
          ? {
              ...c,
              teacherName,
              teacherGender,
              teacherImage:
                teacherGender === 'female'
                  ? '/src/assets/images/teacher_female_mentor_1794404766984.jpg'
                  : '/src/assets/images/teacher_male_mentor_1794404768125.jpg',
            }
          : c
      )
    );
  };

  const updateMeetingLink = (studentId: string, platform: 'Google Meet' | 'Zoom', link: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, meetingPlatform: platform, meetingLink: link } : s))
    );
    setClasses((prev) =>
      prev.map((c) => (c.studentId === studentId ? { ...c, meetingPlatform: platform, meetingLink: link } : c))
    );
  };

  const deleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setClasses((prev) => prev.filter((c) => c.studentId !== studentId));
  };

  return (
    <AcademyContext.Provider
      value={{
        region,
        setRegionById,
        currentUser,
        students,
        classes,
        currentView,
        setCurrentView,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        isOnboardingOpen,
        setIsOnboardingOpen,
        handleRegister,
        handleLogin,
        handleLogout,
        handleAddStudentAndTrial,
        rescheduleClass,
        openTrialBooking,
        updateStudentStatus,
        assignTeacherToStudent,
        updateMeetingLink,
        deleteStudent,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
