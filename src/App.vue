<template>
  <div class="wrap">
    <div v-if="showTitle" class="title">吃啥</div>
    <ul class="list">
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
  <button v-if="!playing" class="btn-start" @click="start">Click Me</button>
  <button v-else class="btn-start" disabled>Choosing...</button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const allFood = ref([]);
const playing = ref(false);
const showTitle = ref(true);

async function start() {
  allFood.value = [];
  playing.value = true;
  showTitle.value = false;
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
  color: #fff;
}

.wrap {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(139, 23, 23);
  border: 2px solid rgb(83, 22, 22);
}

.list {
  width: 200px;
  overflow: hidden;
  max-height: 30px;
  padding: 0;
  margin: 0;
}

.item {
  position: relative;
  height: 30px;
  line-height: 30px;
  text-align: center;
  list-style: none;
  color: #fff;
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

.btn-start {
  width: 200px;
  height: 50px;
  color: rgb(83, 22, 22);
  font-size: 16px;
  font-weight: bold;
  background: rgb(226, 196, 27);
  border: 2px solid rgb(83, 22, 22);
  border-top: none;
  cursor: pointer;
  &:focus {
    background: rgb(83, 22, 22);
    color: #fff;
  }
}
</style>
