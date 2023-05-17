<script setup>
import { ref, onMounted } from "vue";

const words = ref([
  "le",
  "de",
  "un",
  "à",
  "être",
  "et",
  "en",
  "avoir",
  "que",
  "pour",
  "dans",
  "ce",
  "il",
  "qui",
  "ne",
  "sur",
  "se",
  "pas",
  "plus",
  "pouvoir",
  "par",
  "je",
  "avec",
  "tout",
  "faire",
  "son",
  "mettre",
  "autre",
  "on",
  "mais",
  "nous",
  "comme",
  "si",
  "ou",
  "sa",
  "lui",
  "devoir",
  "vouloir",
  "y",
  "voir",
  "enfant",
  "bien",
  "aller",
  "encore",
  "très",
  "leur",
  "dire",
  "elle",
  "prendre",
  "deux",
]);

const user_input = ref("");
const words_box_width = ref(800);

const word_per_line = ref(0);

const words_count = ref(0);

const timer = ref(0);
const elapsed_time = ref(0);
const char_count = ref(0);

const wpm = ref(0);

// Function for checking if user input is correct
const checkInput = () => {
  // Get the last char of the user input
  const last_char = user_input.value[user_input.value.length - 1];

  // If last char is a space
  if (last_char === " ") {
    // Get first word from words variable
    const current_word = words.value[words_count.value];
    const typed_word = user_input.value.trim();

    if (current_word == typed_word) {
      // Increment char_count by length of typed_word
      char_count.value += current_word.length;

      console.log("Correct");
    }

    // Increment words_count by 1
    words_count.value += 1;

    // Calculate WPM : a word has 5 characters on average
    wpm.value = Math.round(char_count.value / 5 / (elapsed_time.value / 60));

    // Clear user input
    user_input.value = "";

    // If an entire line has been typed
    if (words_count.value == word_per_line.value) {
      // Remove the current line from words variable
      words.value.splice(0, word_per_line.value);

      // Reset words_count
      words_count.value = 0;
    }
  }
};

// If the user press on the escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Clear user input
    user_input.value = "";
  }
});

onMounted(() => {
  // Based on the window size, get the number of words per line
  word_per_line.value = Math.floor(words_box_width.value / 65);

  console.log(word_per_line.value);

  // Start timer
  timer.value = setInterval(() => {
    // Increment elapsed_time by 1
    elapsed_time.value += 1;
  }, 1000);
});
</script>

<template>
  <div>
    <!-- Rectangle box for displaying words, using words variable -->
    <div class="row" style="width: 800px">
      <div class="col-1" v-for="word in words" :key="word">
        {{ word }}
      </div>
    </div>

    <!-- Input for user typing input -->
    <div class="input-box">
      <input
        type="text"
        v-model="user_input"
        placeholder="Type here..."
        class="input-box__input"
        @input="checkInput"
      />

      <!-- Display WPM -->
      <div class="input-box__wpm">{{ wpm }} WPM</div>
    </div>
  </div>
</template>
