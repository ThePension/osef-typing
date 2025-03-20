<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";

const enum GAME_STATES {
  NOT_STARTED,
  IN_PROGRESS
};

// Word state enum (not typed, correct, incorrect)
const enum WORD_STATES {
  NOT_TYPED,
  CORRECT,
  INCORRECT,
  TO_TYPE,
  // If the currently typed word is incorrect
  CURRENTLY_INCORRECT,
};

interface Word {
  word: string;
  state: WORD_STATES;
}

const props = defineProps<{
  words_: string[];
}>();

const emit = defineEmits(["refresh", "endOfWords"]);

let CHAR_PER_LINE = 64;

const words_count = ref(0);
const words: Ref<Word[]> = ref(props.words_.map((word) => {
  return {
    word: word,
    state: WORD_STATES.NOT_TYPED,
  };
}));

const appendNewLineOfWords = (newLine: string[]) => {
  words.value.push(...newLine.map((word) => {
    return {
      word: word,
      state: WORD_STATES.NOT_TYPED,
    };
  }));
};

const refreshWords = (newWords: string[]) => {
  words.value = newWords.map((word) => {
    return {
      word: word,
      state: WORD_STATES.NOT_TYPED,
    };
  });

  initialize();
};

defineExpose({
  appendNewLineOfWords,
  refreshWords,
});

const game_state = ref(GAME_STATES.NOT_STARTED);

const user_input = ref("");

const timer: Ref<NodeJS.Timeout | null> = ref(null);
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
  const current_word = words.value[words_count.value]?.word || "";
  const typed_word = user_input.value.trim();

  // If last char is not a space
  if (last_char === " ") {
    char_line_count.value += current_word.length + 1;

    if (current_word == typed_word) {

      // Update state of current word to correct
      words.value[words_count.value]!.state = WORD_STATES.CORRECT;
    }
    else {
      // Update state of current word to incorrect
      words.value[words_count.value]!.state = WORD_STATES.INCORRECT;
    }

    // If the row is completed, scroll to the next row
    if (char_line_count.value >= CHAR_PER_LINE || char_line_count.value + words.value[words_count.value + 1]!.word.length > CHAR_PER_LINE) {
      // Remove the first line (n first word)
      words.value.splice(0, words_count.value + 1);

      words_count.value = -1;
      char_line_count.value = 0;
    }

    if (words.value.length <= 24) {
      emit("endOfWords");
    }

    words.value[words_count.value + 1]!.state = WORD_STATES.TO_TYPE;

    // Increment words_count by 1
    words_count.value += 1;

    // Clear user input
    user_input.value = "";

    
  } else if (current_word.startsWith(typed_word)) {
    // Update state of current word to to_type
    char_count.value += 1;
    words.value[words_count.value]!.state = WORD_STATES.TO_TYPE;
  } else {
    // Update state of current word to currently_incorrect
    words.value[words_count.value]!.state = WORD_STATES.CURRENTLY_INCORRECT;
  }

  // Calculate WPM : a word has 5 characters on average
  wpm.value = Math.round(char_count.value / 5.0 / (elapsed_time.value / 60.0));
};

// If the user press on the escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    emit("refresh");
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
  const inputElement = document.querySelector(".q-input");
  if (inputElement) {
    (inputElement as HTMLInputElement).focus();
  }

  // Set the first word to TO_TYPE
  words.value[0]!.state = WORD_STATES.TO_TYPE;

  // Stop timer
  if (timer.value !== null) {
    clearInterval(timer.value);
  }
  elapsed_time.value = 0;
  wpm.value = 0;
}

onMounted(() => {
  // Calculate char per line based on the width of the window
  CHAR_PER_LINE = Math.floor(Math.min(800, Math.floor(window.innerWidth)) / 12.5);
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
    height: 77px;
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
    <div class="row" style="max-width: 800px">

      <div id="words_box" class="col" style="word-wrap: break-word;">
        <span v-for="word in words" :key="word.word + Math.random()">
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
