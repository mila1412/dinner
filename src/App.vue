<template>
  <div class="wrap">
    <div v-if="isShowTitle" class="title">吃啥</div>
    <ul v-else class="list">
      <li
        v-for="(food, index) in filterList"
        :key="index"
        class="item"
        :class="{ playing: isPlaying }"
        @animationend="restart"
      >
        {{ food }}
      </li>
    </ul>
  </div>
  <div v-if="!isPlaying" class="btn-wrap">
    <button v-for="(type, index) in foodType" :key="index" @click="start(index)">
      {{ type }}
    </button>
  </div>
  <div v-else class="choose">Choosing...</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const allFoodList = ref([]);
const filterList = ref([]);
const foodType = ['台式', '日式', '韓式', '泰式', '越式', '邪惡'];
const isPlaying = ref(false);
// 只有初次載入出現
const isShowTitle = ref(true);

getFoodList();
async function getFoodList() {
  const sheetID = import.meta.env.VITE_SHEET_ID;
  const apiKey = import.meta.env.VITE_API_KEY;
  const range = 'dinner-sheet!A2:F';
  try {
    const res = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?majorDimension=COLUMNS&key=${apiKey}`
    );
    allFoodList.value = res.data.values;
  } catch (err) {
    console.log(err);
  }
}

function start(index) {
  isPlaying.value = true;
  isShowTitle.value = false;
  filterList.value = allFoodList.value[index];
  shuffleArray(filterList.value);
}

function restart() {
  isPlaying.value = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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
  animation-duration: 0.15s;
}

@keyframes random {
  from {
    top: 0;
  }
  to {
    top: -80px;
  }
}

.btn-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  button {
    flex: 0 1 33.3%;
    height: 50px;
    color: rgb(83, 22, 22);
    font-size: 16px;
    font-weight: bold;
    background: rgb(226, 196, 27);
    border: 2px solid rgb(83, 22, 22);
    border-top: none;
    cursor: pointer;
    &:nth-child(2),
    &:nth-child(5) {
      border-right: none;
      border-left: none;
    }

    &:focus {
      background: rgb(83, 22, 22);
      color: #fff;
    }
  }
}

.choose {
  width: 200px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(83, 22, 22);
  font-size: 20px;
  font-weight: bold;
  background: rgb(226, 196, 27);
  border: 2px solid rgb(83, 22, 22);
  border-top: none;
}
</style>
