<script setup lang="ts">
import { getWords } from "src/assets/words";
import TypingComponent from "src/components/common/TypingComponent.vue";
import { useLanguageStore } from "src/stores/language";
import { onMounted, ref } from "vue";


const languageStore = useLanguageStore();
let AVAILABLE_WORLDS = getWords(languageStore.getLanguage());
const words = ref<string[]>([]);

// Subscribed to the language store and update the words based on the selected language
languageStore.$onAction((event) => {
  if (event.name !== "setLanguage") {
    return;
  }

  // Update words based on the selected language
  AVAILABLE_WORLDS = getWords(event["args"][0]);

  refresh();
}, false);

const typingComponent = ref<any>(null);

const refresh = () => {
  const tempWords = [];

  // Initialize words from text
  for (let i = 0; i < 30; i++) {
    tempWords.push(AVAILABLE_WORLDS[Math.floor(Math.random() * AVAILABLE_WORLDS.length)]!);
  }

  words.value = tempWords;

  // Refresh the words
  typingComponent.value.refreshWords(words.value);
};

const addNewLineOfWords = () => {


  // Add new line of words
  typingComponent.value.appendNewLineOfWords(words.value);
};

onMounted(() => {
  refresh();
});
</script>

<template>
  <q-page class="flex flex-center">
    <TypingComponent ref="typingComponent"
                      :words_="words"
                      @refresh="() => refresh()"
                      @endOfWords="() => addNewLineOfWords()"
    />
  </q-page>
</template>
