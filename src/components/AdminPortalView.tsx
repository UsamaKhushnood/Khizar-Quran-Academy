import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { TEACHERS_LIST } from '../data/academyData';
import { StudentProfile, StudentStatus, RegionId } from '../types';
import {
  Users,
  Search,
  Filter,
  Video,
  Edit2,
  Trash2,
  Plus,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  ShieldAlert,
  Save,
  X,
  MessageCircle,
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const {
    students,
    updateStudentStatus,
    assignTeacherToStudent,
    updateMeetingLink,
    deleteStudent,
    setCurrentView,
    setIsOnboardingOpen,
  } = useAcademy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'all' | RegionId>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | StudentStatus>('all');

  // Editing meeting link modal
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [editPlatform, setEditPlatform] = useState<'Google Meet' | 'Zoom'>('Google Meet');
  const [editLink, setEditLink] = useState('');

  // Filtering
  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(query) ||
      (s.parentName && s.parentName.toLowerCase().includes(query)) ||
      (s.parentEmail && s.parentEmail.toLowerCase().includes(query)) ||
      (s.parentPhone && s.parentPhone.includes(query));

    const matchesRegion = selectedRegionFilter === 'all' || s.regionId === selectedRegionFilter;
    const matchesStatus = selectedStatusFilter === 'all' || s.status === selectedStatusFilter;

    return matchesSearch && matchesRegion && matchesStatus;
  });

  // KPI Metrics
  const totalStudents = students.length;
  const trialPendingCount = students.filter((s) => s.status === 'trial_pending').length;
  const trialActiveCount = students.filter((s) => s.status === 'trial_active').length;
  const enrolledMonthlyCount = students.filter((s) => s.status === 'enrolled_monthly').length;

  const handleOpenEditModal = (student: StudentProfile) => {
    setEditingStudent(student);
    setEditPlatform(student.meetingPlatform || 'Google Meet');
    setEditLink(student.meetingLink || '');
  };

  const handleSaveMeetingLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent && editLink.trim()) {
      updateMeetingLink(editingStudent.id, editPlatform, editLink.trim());
      setEditingStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#14241E] pb-24">
      {/* Admin Top Header */}
      <div className="bg-[#14241E] text-white py-6 px-4 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#D49A3D] font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Academy Director & Coordinator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Khizar Quran Academy Admin
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
              Manage student onboarding, assign teachers, and configure Google Meet / Zoom links.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Student</span>
            </button>
            <button
              onClick={() => setCurrentView('portal')}
              className="px-3 py-2 text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Parent Portal View
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-3 py-2 text-xs font-medium rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Website
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* KPI Metrics Cards (4 Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Enrolled</p>
            <h3 className="text-3xl font-extrabold text-[#14241E] mt-1 font-mono">{totalStudents}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Across USA, Canada, UAE, Pakistan</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Trial Pending</p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1 font-mono">{trialPendingCount}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Awaiting 1st trial lesson</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Trials In Progress</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1 font-mono">{trialActiveCount}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Active 3-class trial period</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Enrolled Monthly</p>
            <h3 className="text-3xl font-extrabold text-blue-600 mt-1 font-mono">{enrolledMonthlyCount}</h3>
            <p className="text-[11px] text-stone-500 mt-1">Active recurring monthly tuition</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student, parent, or phone..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#0E6245]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Region Filter */}
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value as 'all' | RegionId)}
              className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white font-medium focus:outline-hidden"
            >
              <option value="all">All Regions</option>
              <option value="usa">🇺🇸 United States</option>
              <option value="canada">🇨🇦 Canada</option>
              <option value="uae">🇦🇪 UAE / Dubai</option>
              <option value="pakistan">🇵🇰 Pakistan</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value as 'all' | StudentStatus)}
              className="text-xs py-2 px-3 rounded-lg border border-stone-300 bg-white font-medium focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="trial_pending">Trial Pending</option>
              <option value="trial_active">Trial Active</option>
              <option value="enrolled_monthly">Enrolled Monthly</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Student & Course</th>
                  <th className="py-3.5 px-4">Parent / Contact</th>
                  <th className="py-3.5 px-4">Region & Time</th>
                  <th className="py-3.5 px-4">Assigned Teacher</th>
                  <th className="py-3.5 px-4">Google Meet / Zoom</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-500">
                      No student records found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-stone-50/70 transition-colors">
                      {/* Student & Course */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-sm text-[#14241E]">{st.name}</div>
                        <div className="text-stone-500 text-[11px]">{st.age}</div>
                        <span className="inline-block mt-1 font-semibold text-[#0E6245] bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                          {st.level.replace(/_/g, ' ')}
                        </span>
                      </td>

                      {/* Parent & Contact */}
                      <td className="py-4 px-4 space-y-1">
                        <div className="font-semibold text-stone-900">{st.parentName || 'Parent'}</div>
                        <div className="text-stone-500 text-[11px] flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-stone-400" />
                          <span>{st.parentPhone || '—'}</span>
                        </div>
                        {st.parentPhone && (
                          <a
                            href={`https://wa.me/${st.parentPhone.replace(/[^0-9]/g, '')}?text=Assalamu%20Alaikum,%20this%20is%20Khizar%20Quran%20Academy%20regarding%20${encodeURIComponent(st.name)}'s%20classes`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
                            <span>WhatsApp Parent</span>
                          </a>
                        )}
                      </td>

                      {/* Region & Schedule */}
                      <td className="py-4 px-4">
                        <div className="font-bold uppercase text-[11px] text-stone-700">
                          {st.regionId.toUpperCase()} · {st.daysPerWeek} Days/Wk
                        </div>
                        <div className="text-stone-600 font-mono text-[11px] mt-0.5">
                          {st.preferredTimeSlot}
                        </div>
                        <div className="text-stone-400 text-[10px]">
                          Enrolled: {st.enrollmentDate || 'Nov 11, 2026'}
                        </div>
                      </td>

                      {/* Assigned Teacher Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={st.assignedTeacherName}
                          onChange={(e) => {
                            const teacher = TEACHERS_LIST.find((t) => t.name === e.target.value);
                            if (teacher) {
                              assignTeacherToStudent(st.id, teacher.name, teacher.gender);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-stone-300 text-xs bg-white font-medium focus:outline-hidden"
                        >
                          {TEACHERS_LIST.map((t) => (
                            <option key={t.id} value={t.name}>
                              {t.name} ({t.gender})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Meeting Link & Platform */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-800">{st.meetingPlatform || 'Google Meet'}:</span>
                          <button
                            onClick={() => handleOpenEditModal(st)}
                            className="text-[#0E6245] hover:text-[#0b4d36] underline font-mono text-[11px] truncate max-w-[150px] cursor-pointer"
                            title="Click to edit meeting link"
                          >
                            {st.meetingLink}
                          </button>
                          <a
                            href={st.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-400 hover:text-[#0E6245]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={st.status}
                          onChange={(e) => updateStudentStatus(st.id, e.target.value as StudentStatus)}
                          className={`py-1 px-2 rounded-lg text-xs font-bold border focus:outline-hidden ${
                            st.status === 'enrolled_monthly'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : st.status === 'trial_active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : st.status === 'trial_pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-stone-100 text-stone-600 border-stone-200'
                          }`}
                        >
                          <option value="trial_pending">Trial Pending</option>
                          <option value="trial_active">Trial Active</option>
                          <option value="enrolled_monthly">Enrolled Monthly</option>
                          <option value="paused">Paused</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(st)}
                            className="p-1.5 text-stone-500 hover:text-[#0E6245] hover:bg-stone-100 rounded cursor-pointer"
                            title="Edit meeting link"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove enrollment for ${st.name}?`)) {
                                deleteStudent(st.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-stone-100 rounded cursor-pointer"
                            title="Remove student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Meeting Link Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-[#14241E]">
                Configure Video Link for {editingStudent.name}
              </h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeetingLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Video Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditPlatform('Google Meet')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer ${
                      editPlatform === 'Google Meet'
                        ? 'bg-emerald-50 border-[#0E6245] text-[#0E6245]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Google Meet
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPlatform('Zoom')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer ${
                      editPlatform === 'Zoom'
                        ? 'bg-emerald-50 border-[#0E6245] text-[#0E6245]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Zoom
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Meeting URL
                </label>
                <input
                  type="url"
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx or https://zoom.us/j/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:border-[#0E6245] font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0E6245] hover:bg-[#0b4d36] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Save Meeting Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
