<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore.ts";
import { useEditorStore } from "../store/editorStore.ts";
import { useSocketStore } from "../store/socketStore.ts";

import LogoSide from "../components/LogoSide.vue";

const authStore = useAuthStore();
const editorStore = useEditorStore();
const socketStore = useSocketStore();

const router = useRouter();
const { getUserInfo: userInfo } = storeToRefs(authStore)
const { getInvitations: invitations } = storeToRefs(socketStore);

function logout() {
  localStorage.removeItem("user");
  router.push({ path: "/" })
}

const placeholderAvatar = "https://placeholder.pagebee.io/api/random/300/200"

function ifNotification(requestedUser: string, room: string) {
  if (userInfo.value.user_name !== requestedUser) {
    socketStore.setGameByModel(room);
    editorStore.toggleModal(true);
  }
}

watch(socketStore.getInvitations, (nv: any) => {
  ifNotification(nv.user, nv.room)
});

</script>

<template>
  <div class="headerCont">
    <nav>
      <img :src="placeholderAvatar">
      <ul>
        <li>
          <h3>{{ userInfo.user_name }}</h3>
        </li>
        <li class="link" @click="logout">log out</li>
      </ul>
    </nav>
    <h4>notifications: {{ invitations.length }}</h4>
    <LogoSide />
  </div>
</template>
<style scoped>
.headerCont {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

nav {
  display: flex;
  margin-bottom: 20px;
}

img {
  margin-right: 10px;
}

img {
  display: block;
  width: 50px;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 50%;
  overflow: hidden;
  background-position: 50% 25%;
  background-size: cover;
}
</style>
