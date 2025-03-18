<script setup>
import { ref, onMounted } from "vue";

const NUMBER_OF_WORDS = 200;
const CHAR_PER_LINE = 64;

const GAME_STATES = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1
};

// Word state enum (not typed, correct, incorrect)
const WORD_STATES = {
  NOT_TYPED: 0,
  CORRECT: 1,
  INCORRECT: 2,
  TO_TYPE: 3,
  // If the currently typed word is incorrect
  CURRENTLY_INCORRECT: 4,
};

const AVAILABLE_WORLDS = ref([
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
const game_state = ref(GAME_STATES.NOT_STARTED);

const user_input = ref("");

const words_count = ref(0);

const timer = ref(0);
const elapsed_time = ref(0);
const char_count = ref(0);
const char_line_count = ref(0);

const wpm = ref(0);

// Function for checking if user input is correct
const checkInput = () => {
  // If the game is not started
  if (game_state.value === GAME_STATES.NOT_STARTED) {
    // Start the game and timer
    game_state.value = GAME_STATES.IN_PROGRESS;
    
    // Start timer
    timer.value = setInterval(() => {
      // Increment elapsed_time by 1
      elapsed_time.value += 0.01;
    }, 10);
  }

  // Get the last char of the user input
  const last_char = user_input.value[user_input.value.length - 1];

  // Get first word from words variable
  const current_word = words.value[words_count.value].word;
  const typed_word = user_input.value.trim();

  // If last char is not a space
  if (last_char === " ") {
    char_line_count.value += current_word.length + 1;

    if (current_word == typed_word) {

      // Update state of current word to correct
      words.value[words_count.value].state = WORD_STATES.CORRECT;
    }
    else {
      // Update state of current word to incorrect
      words.value[words_count.value].state = WORD_STATES.INCORRECT;
    }

    // If the row is completed, scroll to the next row
    if (char_line_count.value >= CHAR_PER_LINE || char_line_count.value + words.value[words_count.value + 1].word.length > CHAR_PER_LINE) {
      // Remove the first line (n first word)
      words.value.splice(0, words_count.value + 1);

      words_count.value = -1;
      char_line_count.value = 0;
    }

    words.value[words_count.value + 1].state = WORD_STATES.TO_TYPE;

    // Increment words_count by 1
    words_count.value += 1;

    // Clear user input
    user_input.value = "";

    
  } else if (current_word.startsWith(typed_word)) {
    // Update state of current word to to_type
    char_count.value += 1;
    words.value[words_count.value].state = WORD_STATES.TO_TYPE;
  } else {
    // Update state of current word to currently_incorrect
    words.value[words_count.value].state = WORD_STATES.CURRENTLY_INCORRECT;
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
  game_state.value = GAME_STATES.NOT_STARTED;


  // Clear user input
  user_input.value = "";
  words_count.value = 0;
  char_count.value = 0;
  char_line_count.value = 0;

  // Focus on the input box
  document.querySelector(".q-input").focus();

  // Initialize words
  for (let i = 0; i < NUMBER_OF_WORDS; i++) {
    words.value[i] = {
      word: AVAILABLE_WORLDS.value[Math.floor(Math.random() * AVAILABLE_WORLDS.value.length)],
      state: WORD_STATES.NOT_TYPED,
    };
  }

  // Set the first word to TO_TYPE
  words.value[0].state = WORD_STATES.TO_TYPE;

  // Stop timer
  clearInterval(timer.value);
  elapsed_time.value = 0;
  wpm.value = 0;
}

onMounted(() => {
  initialize();
});
</script>

<style scoped>
  span { 
    width: 100%;
    text-align: center;
    padding-right: 0px;
    
  }

  * {
    font-size: 20px;
  }

  #words_box {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
    height: 80px;
    overflow-y: hidden;
    overflow: hidden;
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
    <!-- Display WPM -->
    <div id="wpm">{{ wpm }} WPM</div>

    <!-- Rectangle box for displaying words, using words variable -->
    <div class="row" style="width: 800px">

      <div id="words_box" class="col" style="word-wrap: break-word;">
        <span v-for="word in words" :key="word">
          <span  :style="{ 
            color: word.state === 1 ? 'green' : word.state === 2 || word.state === 4 ? 'red' : 'black',
            backgroundColor: word.state === 3 || word.state === 4 ? 'yellow' : 'white',
            }">
            {{ word.word }}  
          </span>{{ " " }}</span>
      </div>
    </div>

    <!-- Input for user typing input -->
    <div id="input-box">
      <q-input id="input" filled v-model="user_input" @update:model-value="checkInput"/>
    </div>

  </div>
</template>
