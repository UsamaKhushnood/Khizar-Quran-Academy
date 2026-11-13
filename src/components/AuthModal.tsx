import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { X, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Sparkles, Key } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    authMode,
    setAuthMode,
    handleRegister,
    handleLogin,
  } = useAcademy();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (!phone.trim()) {
        setErrorMsg('Please enter your phone number.');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }

      handleRegister({ name, email, phone, password });
    } else {
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter your registered email address.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }

      const success = handleLogin(email);
      if (!success) {
        setErrorMsg('Could not find account. Please verify email or sign up.');
      }
    }
  };

  const handleFillDemoLogin = () => {
    setEmail('demo@khizar.com');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleFillDemoSignup = () => {
    setName('Sister Aisha & Brother Tariq');
    setEmail('aisha.tariq@family.com');
    setPhone('+1 (555) 786-0199');
    setPassword('quran2026');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-b from-[#FAF8F5] to-white border-b border-stone-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-[#0E6245] text-white flex items-center justify-center font-serif text-sm">
              خ
            </span>
            <span className="text-sm font-bold text-[#14241E]">Khizar Quran Academy</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#14241E]">
            {authMode === 'signup' ? 'Create Your Parent Account' : 'Returning Student Login'}
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            {authMode === 'signup'
              ? 'Start with 3 free trial classes. No credit card required.'
              : 'Sign in to access your class schedule, lesson notes, and student room.'}
          </p>

          {/* Quick Demo Helper Strip */}
          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-[11px] font-medium">Want to test quickly?</span>
            </div>
            <button
              type="button"
              onClick={authMode === 'login' ? handleFillDemoLogin : handleFillDemoSignup}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              {authMode === 'login' ? 'Fill Demo Login' : 'Fill Sample Info'}
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-3 flex items-center rounded-lg bg-stone-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                authMode === 'signup' ? 'bg-white text-[#0E6245] shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              New Parent / Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                authMode === 'login' ? 'bg-white text-[#0E6245] shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Returning Student Log In
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Parent / Student Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Brother Zeeshan Malik"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#0E6245] focus:ring-1 focus:ring-[#0E6245]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={authMode === 'login' ? 'demo@khizar.com or your email' : 'parent@example.com'}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#0E6245] focus:ring-1 focus:ring-[#0E6245]"
                required
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone / WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000 or WhatsApp"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#0E6245] focus:ring-1 focus:ring-[#0E6245]"
                  required
                />
              </div>
              <p className="text-[10px] text-stone-500 mt-1">
                Used strictly to send your class Zoom/Meet link and reminder.
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#0E6245] focus:ring-1 focus:ring-[#0E6245]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0E6245] hover:bg-[#0b4d36] text-white font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{authMode === 'signup' ? 'Create Account & Pick Class Time' : 'Log In to Student Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {authMode === 'login' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleLogin('demo@khizar.com')}
                className="text-xs font-bold text-[#0E6245] hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Instant 1-Click Login as Demo Parent</span>
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure 256-bit encryption · We never share your data</span>
          </div>
        </form>
      </div>
    </div>
  );
};
