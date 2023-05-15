<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated pink color class="bg-pink-8">
      <q-toolbar>
        <q-toolbar-title> Osef Typing</q-toolbar-title>
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
