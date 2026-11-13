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

  /**
   * Stop any ongoing letter or ayah audio playback
   */
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

  /**
   * Play crystal-clear Arabic letter pronunciation using local MP3 file,
   * with automatic fallback to Web Speech Synthesis if needed.
   */
  playLetter(audioFile?: string, fullArabicText?: string, englishName?: string) {
    this.stopAll();

    // 1. Primary: Play real authentic letter recording if file is provided
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

    // 2. Fallback: Speak Arabic or English transliteration
    this.speakFallback(fullArabicText, englishName);
  }

  /**
   * Legacy method signature for backward compatibility:
   * Maps to playLetter without playing any beeps!
   */
  speakArabic(arabicChar: string, letterName: string, _freq?: number, audioFile?: string) {
    this.playLetter(audioFile, arabicChar, letterName);
  }

  /**
   * Play an authentic Quran Ayah from the EveryAyah CDN (Sheikh Mishary Alafasy)
   */
  playAyah(surah: number, ayah: number, onEnded?: () => void) {
    this.stopAll();

    const surahStr = surah.toString().padStart(3, '0');
    const ayahStr = ayah.toString().padStart(3, '0');
    const url = `https://everyayah.com/data/Alafasy_128kbps/${surahStr}${ayahStr}.mp3`;

    try {
      const audio = new Audio(url);
      this.currentAudio = audio;
      audio.volume = 1.0;
      if (onEnded) {
        audio.onended = onEnded;
      }
      const p = audio.play();
      if (p !== undefined) {
        p.catch((err) => console.warn('Ayah stream error:', err));
      }
    } catch (e) {
      console.warn('Ayah audio setup error:', e);
    }
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

      // Check for Arabic voice
      const arabicVoice = this.voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (arabicVoice && fullArabicText) {
        utterance.voice = arabicVoice;
        utterance.lang = 'ar-SA';
      } else {
        // Clear English pronunciation of the letter name (e.g., "Alif", "Baa", "Taa")
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
