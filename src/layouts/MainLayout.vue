<script setup>
import { ref } from 'vue';
import { LANGUAGES, useLanguageStore } from 'src/stores/language';

const languageStore = useLanguageStore();

const lang = ref(languageStore.getLanguage());

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated pink color class="bg-pink-8">
      <q-toolbar>
        <q-toolbar-title> Osef Typing</q-toolbar-title>

        <q-tabs v-model="lang"
                class="q-mx-lg"         
                dense 
                @update:model-value="languageStore.setLanguage(lang)"
        >
          <q-tab v-for="language in LANGUAGES" :name="language" :key="language" :label="language" />
        </q-tabs>

        <a href="https://github.com/ThePension/osef-typing" target="_blank">
          <i class="bi bi-github" style="font-size: 30px; color: white; margin-right: 10px"></i>
        </a>

      </q-toolbar>
      
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
