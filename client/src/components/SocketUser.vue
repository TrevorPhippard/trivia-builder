<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore.ts";
import { useGameStore } from "../store/gameStore.ts";

import plusCircle from "../assets/plus-circle.svg";
import user from "../assets/user.svg";

import SocketioService from "../services/socketio.service.js";

const props = defineProps({
    online: Boolean,
    lobby: Boolean,
    info: Object
})

const authStore = useAuthStore();
const gameStore = useGameStore();

const { getUserInfo: userInfo } = storeToRefs(authStore)
const { getCurrentlySetGame: room_id } = storeToRefs(gameStore);

function inviteUserToPlay() {
    if (typeof user == "string" && props.info && props.info.user_name) {
        SocketioService.invite(
            props.info.user_name,
            userInfo.value.user_name,
            room_id.value
        )
    } else {
        console.error("user_name undefined")
    }
}

</script>
<template>
    {{ info.owner }}
    <li v-if="info && info.user_name !== userInfo.owner">
        <div class="iconCont">
            <div>
                <img class="userIcon" :src="user" alt="" />
                <div :class="`status ${props.online ? 'online' : 'offline'}`"></div>
            </div>
            <h2>{{ info.user_name }}</h2>
        </div>
        <button class="addUserBtn" v-if="lobby" @click="inviteUserToPlay">
            <p>Add </p>
            <img :src="plusCircle" data-user="user" />
        </button>
    </li>
</template>
<style scoped>
.iconCont {
    position: relative;
    display: flex;
    align-items: center;
}

.addUserBtn {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0px 10px;
}

.addUserBtn img {
    border-radius: 50%;
    height: 20px;
    padding-left: 10px;
}

img.userIcon {
    background-color: var(--primary);
    border-radius: 50%;
    padding: 5px;
}

h2 {
    font-size: 22px;
    margin-bottom: 0px;
}

li {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
}

li img {
    margin-right: 10px;
}

.status {
    position: absolute;
    bottom: 5px;
    left: 25px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
}

.online {
    background-color: var(--online);
}

.offline {
    background-color: var(--offline);
}
</style>
