import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import {
  Calendar,
  Clock,
  User,
  PlusCircle,
  ExternalLink,
  Phone,
  Video,
  CreditCard,
  RotateCcw,
  Globe,
  BookOpen,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    students,
    classes,
    region,
    setIsOnboardingOpen,
    rescheduleClass,
    setCurrentView,
  } = useAcademy();

  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [rescheduleModalClassId, setRescheduleModalClassId] = useState<string | null>(null);
  const [newRescheduleTime, setNewRescheduleTime] = useState('6:00 PM – 6:30 PM');
  const [newRescheduleDate, setNewRescheduleDate] = useState('Tomorrow');

  // Filter students belonging to this parent (or show all if in demo)
  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const studentClass = classes.find((c) => (currentStudent ? c.studentId === currentStudent.id : true)) || classes[0];

  const handleConfirmReschedule = () => {
    if (rescheduleModalClassId) {
      rescheduleClass(rescheduleModalClassId, newRescheduleDate, newRescheduleTime.split('–')[0].trim());
      setRescheduleModalClassId(null);
    }
  };

  const getCourseTitle = (lvl: string) => {
    switch (lvl) {
      case 'noorani_qaida':
        return 'Noorani Qaida for Beginners';
      case 'quran_reading':
        return 'Quran Reading with Tajweed (Nazra)';
      case 'hifz_memorization':
        return 'Quran Memorization (Hifz)';
      case 'islamic_studies':
        return 'Islamic Studies & Duas for Kids';
      default:
        return 'Quran Learning Program';
    }
  };

  const planPrice = region.plans.find((p) => p.daysPerWeek === (currentStudent?.daysPerWeek || 3))?.monthlyPrice || 65;

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#14241E] pb-20">
      {/* Portal Top Bar */}
      <div className="bg-[#14241E] text-white py-6 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#D49A3D] font-semibold uppercase tracking-wider mb-1">
              <span>Parent & Student Portal</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-stone-300">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{region.flag} {region.name} ({region.primaryTimezone})</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Assalamu Alaikum, {currentUser?.name || 'Parent'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
              Review your enrolled students, class times, and Google Meet / Zoom links.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Enroll Another Child / Student</span>
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-3 py-2 text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Browse Website
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Student Selector Pills if multiple children are enrolled */}
        {students.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-stone-500 mr-1">Select Student:</span>
            {students.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStudentId(st.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  (currentStudent?.id === st.id)
                    ? 'bg-[#0E6245] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {st.name} ({st.level === 'noorani_qaida' ? 'Qaida' : 'Quran'})
              </button>
            ))}
          </div>
        )}

        {/* Primary Meeting & Class Card */}
        {currentStudent && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0E6245] bg-emerald-50 px-2.5 py-0.5 rounded">
                    {currentStudent.status === 'trial_pending' ? 'Trial Class Scheduled' : currentStudent.status === 'enrolled_monthly' ? 'Enrolled Monthly' : 'Trial Active (3 Free Classes)'}
                  </span>
                  <span className="text-xs text-stone-500">
                    Enrolled on <strong>{currentStudent.enrollmentDate || 'Nov 11, 2026'}</strong>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14241E] tracking-tight">
                  {currentStudent.name}
                </h2>
                <p className="text-sm font-semibold text-[#0E6245] mt-0.5">
                  {getCourseTitle(currentStudent.level)} · {currentStudent.age}
                </p>
              </div>

              {/* Direct Meet / Zoom CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={currentStudent.meetingLink || 'https://meet.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#0E6245] hover:bg-[#0b4d36] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Join via {currentStudent.meetingPlatform || 'Google Meet'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                {studentClass && (
                  <button
                    onClick={() => setRescheduleModalClassId(studentClass.id)}
                    className="px-4 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reschedule Time</span>
                  </button>
                )}
              </div>
            </div>

            {/* Clear Student Enrollment Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                  <User className="w-3.5 h-3.5 text-[#0E6245]" />
                  <span>Assigned Teacher</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  {currentStudent.assignedTeacherName || 'Ustadha Ayesha Siddiqua'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentStudent.assignedTeacherGender === 'female' ? 'Certified Female Instructor' : 'Certified Male Qari'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#0E6245]" />
                  <span>Daily Class Time</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 font-mono">
                  {currentStudent.preferredTimeSlot || '5:30 PM – 6:00 PM'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentStudent.timezone || region.primaryTimezone}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#0E6245]" />
                  <span>Weekly Schedule</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  {currentStudent.daysPerWeek} Days / Week
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  30 minutes per class (1-on-1)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-[#0E6245]" />
                  <span>Monthly Tuition</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 font-mono">
                  {region.currencySymbol}{planPrice.toLocaleString()} / mo
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  {currentStudent.status === 'trial_pending' || currentStudent.status === 'trial_active' ? '3 Free Classes First' : 'Simple monthly billing'}
                </p>
              </div>
            </div>

            {/* Meeting Link & Communication Support */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0E6245]">
                    Class Link ({currentStudent.meetingPlatform}):
                  </p>
                  <a
                    href={currentStudent.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-700 underline font-mono break-all hover:text-[#0E6245]"
                  >
                    {currentStudent.meetingLink}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${region.supportPhone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum,%20I%20am%20inquiry%20regarding%20my%20child%20${encodeURIComponent(currentStudent.name)}'s%20Quran%20classes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Coordinator</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Free Trial Transparency Banner */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0E6245] shrink-0" />
            <div className="text-xs text-stone-600">
              <strong className="text-stone-900 font-bold">Simple Parent Policy: </strong>
              Classes are held directly over Google Meet or Zoom. You can change your study days or pause classes at any time by messaging your teacher or calling <strong>{region.supportPhone}</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalClassId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200 space-y-4">
            <h3 className="text-lg font-bold text-[#14241E]">
              Reschedule Class Time
            </h3>
            <p className="text-xs text-stone-600">
              Pick a new day and convenient 30-minute time slot in {region.primaryTimezone}.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select Day
                </label>
                <select
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#0E6245]"
                >
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="In 2 Days">In 2 Days</option>
                  <option value="This Saturday">This Saturday</option>
                  <option value="This Sunday">This Sunday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Select 30-Min Time Slot
                </label>
                <select
                  value={newRescheduleTime}
                  onChange={(e) => setNewRescheduleTime(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#0E6245]"
                >
                  <option value="4:00 PM – 4:30 PM">4:00 PM – 4:30 PM</option>
                  <option value="5:00 PM – 5:30 PM">5:00 PM – 5:30 PM</option>
                  <option value="5:30 PM – 6:00 PM">5:30 PM – 6:00 PM</option>
                  <option value="6:00 PM – 6:30 PM">6:00 PM – 6:30 PM</option>
                  <option value="7:00 PM – 7:30 PM">7:00 PM – 7:30 PM</option>
                  <option value="8:00 PM – 8:30 PM">8:00 PM – 8:30 PM</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleModalClassId(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-4 py-2 bg-[#0E6245] hover:bg-[#0b4d36] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Save New Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
