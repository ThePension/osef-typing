<script setup lang="ts">
import { ref } from 'vue';
import { LANGUAGES, useLanguageStore } from 'src/stores/language';

const languageStore = useLanguageStore();

const lang = ref(languageStore.getLanguage());

const drawer = ref(false)

const innerWidth = ref(window.innerWidth)

const languagesList = Object.values(LANGUAGES);

const menuList = [
  {
    label: 'Words Typing',
    route: '/words',
  },
  {
    label: 'Text Typing',
    route: '/text',
  },
]

</script>

<style>
#header {
  height: 70px;
  line-height: 70px;
}

#title {
  font-size: 30px;
  color: white;
}

.link {
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  margin: 10px 0;
}
</style>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header id="header" elevated pink color class="bg-pink-8">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

          <q-toolbar-title id="title"> Osef Typing</q-toolbar-title>

          <q-select
            v-model="lang"
            dense
            label-color="orange"
            class="q-mx-lg"
            v-if="innerWidth > 500"
            :options="languagesList"
            @update:model-value="languageStore.setLanguage(lang)"
          />

          <a href="https://github.com/ThePension/osef-typing" target="_blank">
            <i class="bi bi-github" style="font-size: 30px; color: white; margin-right: 10px"></i>
          </a>

        </q-toolbar>
        
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
      >
        <q-select
          v-model="lang"
          dense
          label-color="orange"
          class="q-mx-lg"
          v-if="innerWidth < 500"
          :options="languagesList"
          @update:model-value="languageStore.setLanguage(lang)"
        />

        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item class="link" clickable v-ripple :active="menuItem.route === $route.path">
                <q-item-section @click="$router.push(menuItem.route)">
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>

          </q-list>
        </q-scroll-area>

      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
