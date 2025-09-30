import { defineStore } from 'pinia';

export enum LANGUAGES {
    ENGLISH = "EN",
    FRENCH = "FR",
    GERMAN = "DE",
};

const STORAGE_KEY = 'osef-typing-language';

// Load language from localStorage or default to FRENCH
const loadLanguageFromStorage = (): LANGUAGES => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && Object.values(LANGUAGES).includes(stored as LANGUAGES)) {
    return stored as LANGUAGES;
  }
  return LANGUAGES.FRENCH;
};

export const useLanguageStore = defineStore('language', {
  state: () => {
    return { language: loadLanguageFromStorage() };
  },
  actions: {
    setLanguage(language: LANGUAGES) {
      this.language = language;
      localStorage.setItem(STORAGE_KEY, language);
    },

    getLanguage(): LANGUAGES {
      return this.language;
    },
  },
})