import { defineStore } from 'pinia';

export const LANGUAGES = {
    ENGLISH: "EN",
    FRENCH: "FR",
    GERMAN: "DE",
};

export const useLanguageStore = defineStore('language', {
  state: () => {
    return { language: LANGUAGES.FRENCH }
  },
  actions: {
    setLanguage(language) {
      this.language = language;
    },

    getLanguage() {
      return this.language;
    },
  },
})