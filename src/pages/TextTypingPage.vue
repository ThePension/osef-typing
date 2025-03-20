<script setup lang="ts">
import { getTexts } from "src/assets/texts";
import TypingComponent from "src/components/common/TypingComponent.vue";
import { useLanguageStore } from "src/stores/language";
import { onMounted, ref } from "vue";


const languageStore = useLanguageStore();
let AVAILABLE_TEXTS = getTexts(languageStore.getLanguage());
const words = ref<string[]>([]);

// Subscribed to the language store and update the words based on the selected language
languageStore.$onAction((event) => {
  if (event.name !== "setLanguage") {
    return;
  }

  // Update words based on the selected language
  AVAILABLE_TEXTS = getTexts(event["args"][0]);

  refresh();
}, false);

const typingComponent = ref<any>(null);

const refresh = () => {
  const text = AVAILABLE_TEXTS[Math.floor(Math.random() * AVAILABLE_TEXTS.length)]!;

  // Initialize words from text
  words.value = text.split(" ");

  // Refresh the words
  typingComponent.value.refreshWords(words.value);
};

const addNewLineOfWords = () => {
  const text = AVAILABLE_TEXTS[Math.floor(Math.random() * AVAILABLE_TEXTS.length)]!;

  // Initialize words from text
  words.value = text.split(" ");

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
