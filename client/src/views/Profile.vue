<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "../store/editorStore.ts";
import { useSocketStore } from "../store/socketStore.ts";

import TopHeader from "../components/TopHeader.vue";
import GameLauncher from "../components/GameLauncher.vue";
import SocketUser from "../components/SocketUser.vue";
import ChatMessage from "../components/ChatMessage.vue";

const editorStore = useEditorStore();
const socketStore =  useSocketStore();

const {getActiveUserList: activeUserList, getMsgList: msgList } = storeToRefs(socketStore);

socketStore.initializeSocket();
editorStore.fetchGameFromDatabase();



</script>

<template>
  <main>
    <section class="flex">
      <div class="card-box">
        <TopHeader />
        <h3><span class="icons" id="icon-contacts">&#9731;</span>Quizes</h3>
        <GameLauncher />
        <div class="community">
            <div>
              <h3><span class="icons" id="icon-contacts">&#9814;</span>Activie Users: {{ activeUserList.length }}</h3>
              <ul>
                <SocketUser v-for="(info, key) in activeUserList" 
                  :key="key" 
                  :online="true" 
                  :info="info"
                  :lobby="false" />
              </ul>
            </div>
            <ChatMessage :messageList="msgList" class="item" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
h3 {
  margin-bottom: 10px;
}

.community {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex: 1 1 0px;
}

.item {
  flex-grow: 4;
  /* default 0 */
  margin-left: 20px;
}
</style>
