<script setup lang="ts">

import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useEditorStore } from "../store/editorStore.ts";
import { useGameStore } from "../store/gameStore.ts";
import { useAuthStore } from "../store/authStore.ts";

// import SocketioService from "../services/socketio.service.js";

import playCircle from "../assets/play-circle.svg";
import plusCircle from "../assets/plus-circle.svg";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";

const router = useRouter();

const authStore = useAuthStore();
const editorStore = useEditorStore();
const gameStore = useGameStore();

const { getGameList: gameList } = storeToRefs(editorStore);
const { getUserInfo: userInfo } = storeToRefs(authStore);

defineProps({
  itemsContent: Array,
});




function addGame() {
  editorStore.createNewGame();
  router.push({ path: "/editor" })
}

function onLaunchGame(index: string) {
  editorStore.fetchGameById(String(index));
  gameStore.launchGameAction(String(index), userInfo.value.id , userInfo.value.user_name);

  // SocketioService.joinRoom(index, user_name, id );
  router.push({ path: `/game/${index}` });
}

function goToEdit(index: string) {
  editorStore.fetchGameById(index);
  router.push({ path: "/editor" });
}

function deleteGame(index: string) {
  editorStore.deleteGameFromDatabase(index);
}

function onlyMyGames(gameList: any[]){
  return  gameList.filter(info => userInfo.value.id == info.owner )
}


</script>
<template>
  <div class="game-list">
    <div v-if="Boolean(onlyMyGames(gameList).length == 0)">
      <p> No Quizes</p>
    </div>
    <div v-else v-for="(info, key) in onlyMyGames(gameList)" :key="key">
      <p>{{ info.trivia_name ? info.trivia_name : 'unnamed' }}</p>
      <ul>
        <li>updated: {{ (new Date(info.updatedAt)).toLocaleDateString('en-US') }}</li>
        <li>id: {{ String(info.id) }}</li>
        <li class="game-list-btn"><img :src="playCircle" alt="" @click="onLaunchGame(info.id)" /></li>
        <li class="game-list-btn"><img :src="edit" alt="" @click="goToEdit(info.id)" /></li>
        <li class="game-list-btn"><img :src="trash" alt="" @click="deleteGame(info.id)" /></li>
      </ul>
    </div>
  </div>
  <button class="newBtn" @click="addGame">Create Quiz <img :src="plusCircle" alt=""></button>
</template>
<style scoped>
.newBtn {
  align-items: center;
  display: flex;
  padding: 2px 6px;
}

.newBtn img {
  margin-left: 10px;
  width: 14px;
}

.game-list {
  list-style: none;
  padding-left: 0px;
  border-radius: 3px;
}

.game-list div {
  background-color: var(--accent-bg);
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0px 10px;
}

.game-list div ul {
  display: flex;
  align-items:center;
}

.game-list div ul li {
  padding: 4px 10px;
  cursor: pointer;
}

.game-list div ul li.game-list-btn:hover {
  background-color: var(--accent1);
  /* var(--accent-bg); */
}

.game-list div ul li img {
  width: 20px;
  padding-top: 5px;
}

.game-list div ul li button {
  padding: 2px 10px;
  border-radius: 2px;
}
</style>
