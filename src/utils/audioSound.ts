/**
 * Audio feedback and pronunciation manager for Khizar Quran Academy.
 * Plays authentic recorded Quranic Arabic audio files and provides reliable SpeechSynthesis fallback.
 */

class AudioSynthesizer {
  private currentAudio: HTMLAudioElement | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    try {
      this.voices = window.speechSynthesis.getVoices();
    } catch {
      // ignore
    }
  }

  stopAll() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  playLetter(audioFile?: string, fullArabicText?: string, englishName?: string) {
    this.stopAll();

    if (audioFile) {
      try {
        const audio = new Audio(audioFile);
        this.currentAudio = audio;
        audio.volume = 1.0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio file playback failed, falling back to speech synthesis:', err);
            this.speakFallback(fullArabicText, englishName);
          });
        }
        return;
      } catch (e) {
        console.warn('HTML5 Audio error, using fallback:', e);
      }
    }

    this.speakFallback(fullArabicText, englishName);
  }

  private speakFallback(fullArabicText?: string, englishName?: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      const textToSpeak = fullArabicText || englishName || 'Alif';
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.85;

      if (!this.voices.length) {
        this.voices = window.speechSynthesis.getVoices();
      }

      const arabicVoice = this.voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (arabicVoice && fullArabicText) {
        utterance.voice = arabicVoice;
        utterance.lang = 'ar-SA';
      } else {
        utterance.text = englishName || textToSpeak;
        utterance.lang = 'en-US';
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis fallback failed:', err);
    }
  }
}

export const soundManager = new AudioSynthesizer();
