<script setup lang="ts">
import { ref, onUpdated } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "../store/authStore.ts";
import { useSocketStore } from "../store/socketStore.ts";
import SocketioService from "../services/socketio.service.js";

const socketStore = useSocketStore();
const authStore = useAuthStore();

const { getUserInfo: userInfo, getToken: token } = storeToRefs(authStore)
const { getActiveRoom: room_id } = storeToRefs(socketStore);

defineProps({
  messageList: {
    type: Object,
    required: true
  }
});

const inputMessageText = ref("")
const msg = ref();

function submitMessage() {
  const message = {
    room_id: room_id.value,
    user_id: userInfo.value.user_name,
    body_text: inputMessageText.value
  }

  SocketioService.sendMessage(message, () => {
    inputMessageText.value = "";
    scrollToBottom()
  });
}

function scrollToBottom() {
  msg.value.scrollTop = msg.value.scrollHeight;
}

onUpdated(() => {
  msg.value.scrollTop = msg.value.scrollHeight;
})

</script>
<template>
  <div class="ChatMessage">
    <h6>loggin in as: {{ userInfo.user_name }}</h6>
    <div v-if="token && messageList" class="box">
      <div :class="{ sideScroll: messageList.length > 3 }" class=" messagesCont" ref="msg">
        <div v-if="messageList.length" v-for="(info, key) in messageList" :key="key">
          <div class="messageCont" v-if="info">
            <strong> {{ info.user_id }}: </strong>{{ info.body_text }}
          </div>
        </div>
      </div>
      <form class="input-div" @submit.prevent="submitMessage">
        <textarea type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Send</button>
      </form>
    </div>
    <div v-else class="box token-error">
      <p>token not found</p>
    </div>
  </div>
</template>
<style>
.ChatMessagec {
  width: 100%;
}

h6 {
  margin-left: 5px;
  opacity: 20%;
}

.box {
  height: 200px;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
}

.box textarea {
  padding: 10px;
  min-height: 20px;
  max-height: 90px;
  min-width: 20px;
  max-width: 600px;
}

.messagesCont {
  padding: 10px;
  width: 100%;
  flex-grow: 1;
  text-align: left;
  background-color: #ffffff;
  overflow-anchor: auto !important;
}

.sideScroll {
  max-height: 250px;
  overflow-y: scroll;
}

.messagesCont * {
  overflow-anchor: none;
}

.input-div {
  display: flex;
  width: 100%;
}

.token-error {
  padding: 2px 5px;
  color: red;
}
</style>