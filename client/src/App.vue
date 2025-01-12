<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthStore }   from "./store/authStore.ts";
import { useSocketStore } from "./store/socketStore.ts";

import ModalBox from './components/ModalBox.vue';

const router = useRouter();

const authStore = useAuthStore();
const SocketStore = useSocketStore();

const { getToken: token, getUserInfo:userInfo } = storeToRefs(authStore)


onMounted(function () {
  const cookie = localStorage.getItem("user");
  if (cookie) { authStore.setUser(cookie) };

  if (token.value) {
    const connectConfig = {
        token: token.value,
        room: 'active-users',
        username: userInfo.value.user_name,
        user_id: userInfo.value.id
    }

    SocketStore.initializeSocket(connectConfig);
    SocketStore.joinRoom(connectConfig)

    router.push({ path: "/profile" })
  } else {
    router.push({ path: "/" })
  }
})

</script>

<template>
  <router-view />
  <ModalBox/>
</template>

<style scoped>
</style>
