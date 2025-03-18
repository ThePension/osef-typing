<script setup>
import { ref, onMounted } from "vue";

// Word state enum (not typed, correct, incorrect)
const WORD_STATE = {
  NOT_TYPED: 0,
  CORRECT: 1,
  INCORRECT: 2,
  TO_TYPE: 3,
};

const available_words = ref([
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

const words = ref([]);

const user_input = ref("");

const words_count = ref(0);

const timer = ref(0);
const elapsed_time = ref(0);
const char_count = ref(0);

const wpm = ref(0);

// Function for checking if user input is correct
const checkInput = () => {
  // Get the last char of the user input
  const last_char = user_input.value[user_input.value.length - 1];

  // Get first word from words variable
  const current_word = words.value[words_count.value].word;
  const typed_word = user_input.value.trim();

  // If last char is not a space
  if (last_char === " ") {
    if (current_word == typed_word) {

      // Update state of current word to correct
      words.value[words_count.value].state = WORD_STATE.CORRECT;
    }
    else {
      // Update state of current word to incorrect
      words.value[words_count.value].state = WORD_STATE.INCORRECT;
    }

    words.value[words_count.value + 1].state = WORD_STATE.TO_TYPE;

    // Increment words_count by 1
    words_count.value += 1;

    // Clear user input
    user_input.value = "";
  } else if (current_word.startsWith(typed_word)) {
    // Update state of current word to to_type
    char_count.value += 1;
  }

  // Calculate WPM : a word has 5 characters on average
  wpm.value = Math.round(char_count.value / 5.0 / (elapsed_time.value / 60.0));
};

// If the user press on the escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    initialize();
  }
});

const initialize = () => {
  // Clear user input
  user_input.value = "";
  words_count.value = 0;
  char_count.value = 0;

  // Focus on the input box
  document.querySelector(".q-input").focus();

  // Initialize words
  for (let i = 0; i < 60; i++) {
    words.value[i] = {
      word: available_words.value[Math.floor(Math.random() * available_words.value.length)],
      state: WORD_STATE.NOT_TYPED,
    };
  }

  // Set the first word to TO_TYPE
  words.value[0].state = WORD_STATE.TO_TYPE;

  // Stop timer
  clearInterval(timer.value);
  elapsed_time.value = 0;
  wpm.value = 0;

  // Start timer
  timer.value = setInterval(() => {
    // Increment elapsed_time by 1
    elapsed_time.value += 1;
  }, 1000);
}

onMounted(() => {
  initialize();
});
</script>

<style scoped>
  span { 
    width: 100%;
    text-align: center;
    margin-right: 5px;
    padding: 5px;
    font-size: 20px;
  }

  #input-box {
    text-align: center;
    margin-top: 20px;
  }

  #wpm {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
  }
</style>

<template>
  <div>
    <!-- Rectangle box for displaying words, using words variable -->
    <div class="row" style="width: 800px">

      <div class="col" style="word-wrap: break-word;">

          <span v-for="word in words" :key="word" :style="{ 
            color: word.state === 1 ? 'green' : word.state === 2 ? 'red' : 'black',
            backgroundColor: word.state === 3 ? 'yellow' : 'white',
            }">
              &nbsp;{{ word.word }}&nbsp;
          </span>
      </div>
    </div>

    <!-- Input for user typing input -->
    <div id="input-box">
      <q-input filled v-model="user_input" @update:model-value="checkInput"/>
    </div>

    <!-- Display WPM -->
    <div id="wpm">{{ wpm }} WPM</div>
  </div>
</template>
