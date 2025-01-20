<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useEditorStore } from "../store/editorStore.ts";
import { useSocketStore } from "../store/socketStore.ts";
import { useGameStore  } from "../store/gameStore.ts";

import SocketUser from "../components/SocketUser.vue";
import GameSlide from "../components/GameSlide.vue"

const editorStore = useEditorStore();
const socketStore = useSocketStore();
const gameStore   = useGameStore();

const route = useRoute();
const router = useRouter();

const { editorCurrentSlides: currentSlide} = storeToRefs(editorStore);
const { getCurrentlySetGame: selectedGame } = storeToRefs(gameStore);
const { getActiveUserList: activeUserList }= storeToRefs(socketStore);

const started = ref(false);

onMounted(function () {
    if(typeof route.params.id == "string" ){
        gameStore.setGameFromURL(route.params.id);
    }
})

function startGame(){
  console.log("hopefully this is the easy part")
}

function quitGame(){
  router.push({ path: "/profile" });
}

</script>

<template>
  <section class="flex">
  <div v-if="!started" class="card-box">
    <h1>Lobby: {{ selectedGame }}</h1>
    <h2>Active Users</h2>
    {{ activeUserList }}
    <SocketUser v-for="(info, key) in activeUserList" 
                  :key="key" 
                  :online="true" 
                  :info="info"
                  :lobby="true" />
    <hr/>
    <h2>Joined the game</h2>
    <SocketUser v-for="(info, key) in gameList" 
                  :key="key" 
                  :online="true" 
                  :info="info"
                  :lobby="true" />
  <hr/>       
    <button @click="startGame">Start Game</button>
    <button @click="quitGame">Quit Game</button>
  </div>

  <div v-if="started" class="game card card-box">
      <GameSlide :data="currentSlide"></GameSlide>
      <nav>
                <ul>
                    <li><button>backwards</button></li>
                    <li><button>skip</button></li>
                    <li><button>forward</button></li>
                </ul>
            </nav>
    </div>
  </section>
</template>

<style scoped>
h1{
  text-align: center;
}

nav {
  display:block;
}
nav ul{
  display:flex;
  justify-content: space-around;
  padding-top:10px;
}

hr{
  margin-bottom:25px;
}

.container {
  height: 90vh;
  width: 100vw;
  display: grid; 
  grid-template-columns: 2fr 2fr 1fr; 
  grid-template-rows: 1fr 1.6fr 0.4fr; 
  gap: 10px 10px; 
  grid-template-areas: 
    "game game chat"
    "game game chat "
    "game game chat ";   

}
.card{
  width: 100%;
}
.game{
  grid-area: game;
  text-align: center;
  z-index: 1;
}
.game img{
  position: absolute;
}

.game .slide{
  position: relative;
}
.chat{
  grid-area: chat;
}

</style>
