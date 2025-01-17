<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore.ts";
import { useEditorStore } from "../store/editorStore.ts";
import { useSocketStore } from "../store/socketStore.ts";
import SocketioService from "../services/socketio.service.js";
import closeCircle from "../assets/x-circle.svg";
import { useRouter } from "vue-router";

const router = useRouter();

const editorStore = useEditorStore();
const authStore = useAuthStore();
const socketStore = useSocketStore();

const { getUserInfo: userInfo } = storeToRefs(authStore);
const { getInvitations: invitations } = storeToRefs(socketStore);
const { modal: castModal } = storeToRefs(editorStore);

function closeModal() {
  editorStore.toggleModal(false);
}

function joinGame() {
  const { id, user_name } = userInfo.value;
  const lastInvitation = invitations.value[invitations.value.length - 1];
  if (lastInvitation) {
    const { room } = lastInvitation;
    editorStore.toggleModal(false);
    console.log({room, user_name, id})
    SocketioService.joinRoom(room, user_name, id);
    router.push({ path: `/game/${room}` });
  }
}

interface invitationType {
  to: string;
  from: string;
  room: string;
}

const lastInvitation: ComputedRef<invitationType | null> = computed(() => {
  if (invitations.value.length === 0) {
    return null; // or handle it in another way
  }
  return invitations.value[invitations.value.length - 1];
});
</script>

<template>
  <section class="flex">
    <div class="modal flex" role="dialog" aria-modal="true" v-if="castModal">
      <div class="modal_header">
        <h3> You've been invited! </h3>
        <img id="closeButton" @click="closeModal" :src="closeCircle" />
      </div>
      <section class="textCenter" v-if="lastInvitation">
        <h2>Hey <i>{{ lastInvitation?.to }}!</i></h2>
        <p> Would you like to join <i>{{ lastInvitation?.from }}</i> in game: <i>{{ lastInvitation?.room }}</i></p>
      </section>
      <div class="modal_footer">
        <button class="btn-invert" @click="joinGame">Join</button>
        <button @click="closeModal">Back</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  margin: 15px;
}


.textCenter {
  text-align: center;
}

p {
  display: block;
  width: 100%;
  text-align: center;
  margin: 10px;
}

.modal {
  position: fixed;
  flex-direction: column;
  top: 100px;
  width: 80%;
  max-width: 600px;
  padding: var(--sp-sm) var(--sp-lg);
  background-color: var(--white);
  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}

.modal_header {
  color: var(--primary);
  display: flex;
}

.modal_footer {
  margin: 10px;
}

#closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

#closeButton:hover {
  background-color: var(--accent1-hover);
  border-radius: 50%;
}
</style>