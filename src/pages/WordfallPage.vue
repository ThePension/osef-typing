<script setup lang="ts">
import { getWords } from "src/assets/words";
import { useLanguageStore } from "src/stores/language";
import { onMounted, onUnmounted, ref, Ref } from "vue";

const enum GAME_STATES {
  NOT_STARTED,
  IN_PROGRESS,
  GAME_OVER
}

interface FallingWord {
  word: string;
  x: number;
  y: number;
  id: number;
}

const languageStore = useLanguageStore();
let AVAILABLE_WORDS = getWords(languageStore.getLanguage());

// Subscribed to the language store and update the words based on the selected language
languageStore.$onAction((event) => {
  if (event.name !== "setLanguage") {
    return;
  }

  AVAILABLE_WORDS = getWords(event["args"][0]);
  restart();
}, false);

const game_state = ref(GAME_STATES.NOT_STARTED);
const user_input = ref("");
const falling_words: Ref<FallingWord[]> = ref([]);
const container_height = ref(600);
const container_width = ref(800);

const score = ref(0);
const timer: Ref<NodeJS.Timeout | null> = ref(null);
const spawn_timer: Ref<NodeJS.Timeout | null> = ref(null);
const elapsed_time = ref(0);
const formatted_time = ref("0:00");

let word_id_counter = 0;
const FALL_SPEED = 50; // pixels per second
const SPAWN_INTERVAL = 2000; // milliseconds

const spawnWord = () => {
  const randomWord = AVAILABLE_WORDS[Math.floor(Math.random() * AVAILABLE_WORDS.length)]!;
  const randomX = Math.random() * (container_width.value - 100);

  falling_words.value.push({
    word: randomWord,
    x: randomX,
    y: 0,
    id: word_id_counter++
  });
};

const updateWordPositions = () => {
  if (game_state.value !== GAME_STATES.IN_PROGRESS) {
    return;
  }

  falling_words.value = falling_words.value.map(word => ({
    ...word,
    y: word.y + (FALL_SPEED / 100)
  }));

  // Check for game over (word reached bottom)
  const reachedBottom = falling_words.value.some(word => word.y >= container_height.value - 50);
  if (reachedBottom) {
    gameOver();
  }
};

const checkInput = () => {
  if (game_state.value === GAME_STATES.NOT_STARTED) {
    startGame();
  }

  if (game_state.value !== GAME_STATES.IN_PROGRESS) {
    return;
  }

  const typed_word = user_input.value.trim().toLowerCase();

  // Check if typed word matches any falling word
  const matchIndex = falling_words.value.findIndex(
    word => word.word.toLowerCase() === typed_word
  );

  if (matchIndex !== -1) {
    // Remove the matched word
    falling_words.value.splice(matchIndex, 1);
    score.value += 1;
    user_input.value = "";
  }
};

const startGame = () => {
  game_state.value = GAME_STATES.IN_PROGRESS;

  // Start game timer
  timer.value = setInterval(() => {
    elapsed_time.value += 0.01;
    const minutes = Math.floor(elapsed_time.value / 60);
    const seconds = Math.floor(elapsed_time.value % 60);
    formatted_time.value = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    updateWordPositions();
  }, 10);

  // Start spawning words
  spawn_timer.value = setInterval(() => {
    spawnWord();
  }, SPAWN_INTERVAL);

  // Spawn first word immediately
  spawnWord();
};

const gameOver = () => {
  game_state.value = GAME_STATES.GAME_OVER;

  if (timer.value !== null) {
    clearInterval(timer.value);
  }
  if (spawn_timer.value !== null) {
    clearInterval(spawn_timer.value);
  }
};

const restart = () => {
  game_state.value = GAME_STATES.NOT_STARTED;
  falling_words.value = [];
  score.value = 0;
  elapsed_time.value = 0;
  formatted_time.value = "0:00";
  user_input.value = "";
  word_id_counter = 0;

  if (timer.value !== null) {
    clearInterval(timer.value);
  }
  if (spawn_timer.value !== null) {
    clearInterval(spawn_timer.value);
  }
};

const handleEscapeKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    restart();
  }
};

const updateContainerSize = () => {
  container_width.value = Math.min(800, window.innerWidth - 40);
  container_height.value = Math.min(600, window.innerHeight - 200);
};

onMounted(() => {
  updateContainerSize();
  window.addEventListener("resize", updateContainerSize);
  window.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainerSize);
  window.removeEventListener("keydown", handleEscapeKey);
  if (timer.value !== null) {
    clearInterval(timer.value);
  }
  if (spawn_timer.value !== null) {
    clearInterval(spawn_timer.value);
  }
});
</script>

<style scoped>
* {
  font-size: 20px;
}

#game-info {
  text-align: center;
  margin-bottom: 20px;
}

#game-container {
  border: 2px solid black;
  border-radius: 10px;
  position: relative;
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%);
  overflow: hidden;
  margin: 0 auto;
}

.falling-word {
  position: absolute;
  background-color: white;
  padding: 5px 10px;
  border: 2px solid #1976d2;
  border-radius: 5px;
  font-weight: bold;
  user-select: none;
  transition: transform 0.01s linear;
}

#input-box {
  text-align: center;
  margin-top: 20px;
}

#game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 100;
}

#game-over-overlay h2 {
  font-size: 48px;
  margin-bottom: 20px;
}

#game-over-overlay p {
  font-size: 24px;
  margin: 10px 0;
}
</style>

<template>
  <q-page class="flex flex-center">
    <div>
      <!-- Display Score and Time -->
      <div id="game-info">
        <span style="font-size: 24px; font-weight: bold;">Score: {{ score }}</span>
        <span style="margin-left: 30px; font-size: 24px;">{{ formatted_time }}</span>
      </div>

      <!-- Game Container -->
      <div
        id="game-container"
        :style="{
          width: container_width + 'px',
          height: container_height + 'px'
        }"
      >
        <!-- Falling Words -->
        <div
          v-for="word in falling_words"
          :key="word.id"
          class="falling-word"
          :style="{
            left: word.x + 'px',
            top: word.y + 'px'
          }"
        >
          {{ word.word }}
        </div>

        <!-- Game Over Overlay -->
        <div v-if="game_state === 2" id="game-over-overlay">
          <h2>GAME OVER</h2>
          <p>Final Score: {{ score }}</p>
          <p>Time: {{ formatted_time }}</p>
          <q-btn
            color="primary"
            size="lg"
            label="Restart"
            @click="restart"
            style="margin-top: 20px;"
          />
        </div>
      </div>

      <!-- Input Box -->
      <div id="input-box" class="row justify-center">
        <q-input
          id="input"
          class="col-8"
          filled
          v-model="user_input"
          @update:model-value="checkInput"
          :disable="game_state === 2"
          placeholder="Type the falling words..."
          autofocus
        />

        <q-avatar
          rounded
          color="purple"
          @click="restart"
          label="Restart"
          icon="bi-arrow-clockwise"
          size="55px"
          style="margin-left: 10px"
          text-color="white"
        >
          <q-tooltip>Press ESC to restart</q-tooltip>
        </q-avatar>
      </div>

      <!-- Instructions -->
      <div style="text-align: center; margin-top: 20px; color: #666;">
        <p v-if="game_state === 0">Start typing to begin!</p>
      </div>
    </div>
  </q-page>
</template>
