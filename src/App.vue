<template>
  <div>
    <div v-if="!allFood.length" class="title">吃啥</div>
    <ul v-else class="wrap">
      <li
        v-for="(food, index) in allFood"
        :key="index"
        class="item"
        :class="{ playing: playing }"
        @animationend="restart"
      >
        {{ food }}
      </li>
    </ul>
  </div>
  <button class="start" :disabled="playing" @click="start">start</button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const allFood = ref([]);
const playing = ref(false);

async function start() {
  allFood.value = [];
  playing.value = true;
  const sheetID = import.meta.env.VITE_SHEET_ID;
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/dinner-sheet?key=${apiKey}`
  );
  res.data.values.forEach((element) => {
    allFood.value.push(element[0]);
  });
  shuffleArray(allFood.value);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function restart() {
  playing.value = false;
}
</script>

<style lang="scss">
.title {
  line-height: 30px;
  height: 30px;
}
.wrap {
  position: relative;
  overflow: hidden;
  max-height: 30px;
  padding: 0;
  margin: 0;
}
.item {
  list-style: none;
  line-height: 30px;
  height: 30px;
  position: relative;
}
.playing {
  animation-name: random;
  animation-iteration-count: 2;
  animation-timing-function: linear;
  animation-duration: 0.5s;
}
@keyframes random {
  from {
    top: 0;
  }
  to {
    top: -200px;
  }
}
</style>
