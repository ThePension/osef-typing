import { defineStore } from 'pinia';

export enum LANGUAGES {
    ENGLISH = "EN",
    FRENCH = "FR",
    GERMAN = "DE",
};

export const useLanguageStore = defineStore('language', {
  state: () => {
    return { language: LANGUAGES.FRENCH };
  },
  actions: {
    setLanguage(language: LANGUAGES) {
      this.language = language;
    },

    getLanguage(): LANGUAGES {
      return this.language;
    },
  },
})