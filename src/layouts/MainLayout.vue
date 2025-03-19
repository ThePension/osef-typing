<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated pink color class="bg-pink-8">
      <q-toolbar>
        <q-toolbar-title> Osef Typing</q-toolbar-title>

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

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
