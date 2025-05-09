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
    info: Object,
    room: String
})

const authStore = useAuthStore();
const gameStore = useGameStore();

const { getUserInfo: userInfo } = storeToRefs(authStore)
const { getCurrentlySetGame: room_id } = storeToRefs(gameStore);

function inviteUserToPlay() {
    if ( props.info && props.info.user_name) {
        SocketioService.invite(
            props.info.user_name,
            userInfo.value.user_name,
            room_id.value
        )
    } else {
        console.error("user_name undefined")
    }
}

function isUserActive(){
    if(props.info && props.room === 'active-users'){
        var name1 = props.info.user_name ;
        var name2 = userInfo.value.user_name;
        return name1 === name2
    }else{
        return false;
    }
}

</script>
<template>

    <li v-if="info && !isUserActive()">
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
