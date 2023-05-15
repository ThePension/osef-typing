<script setup>
import { ref, onMounted } from "vue";

const text = ref("");

onMounted(() => {
  setTimeout(() => {
    text.value = "Hello World!";
  }, 1000);
});
</script>

<template>
  <div>
    <h1>{{ text }}</h1>
  </div>
</template>
