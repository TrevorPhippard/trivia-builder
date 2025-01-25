import { defineStore } from "pinia";

import gameService from "../services/game.service"
import SocketioService from "../services/socketio.service.js";
import RoomService from "../services/room.service.js";
import MsgService from "../services/msg.service.js";


declare global {
  interface importMetaEnv {
    readonly TOKEN: string;
  }

  interface importMeta {
    readonly env: importMetaEnv;
  }

  interface connectConfig {
    token: string;
    room: string;
    user_name: string;
    user_id: string;
  }

  interface userPassageType {
    user_name: string;
    type: string;
    data?: {
      user_id: string;
      room_id: string;
    };
    userList?: string;
  }
  interface noArg { (): void }
}

function getUsers(room: string, cb: (arg0: any) => void) {
  RoomService.fetchRoomById(room).then((activeUsers: any) => {
    cb(activeUsers);
  }).catch(function (res) {
    console.error(res)
  });
}



export const useSocketStore = defineStore("sockets", {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    socketInit: false,
    roomMessages: [] as any[],
    //channels
    activeUsers_room: "active-users",
    roomMgmt: {} as any,
    invitation: [] as any[],
    lastGameSet: false as any,
  }),
  actions: {
    initializeSocket() {
      const storeRef = this;
      if (!this.socketInit) {
        this.socketInit = true;
        SocketioService.setupSocketConnection(this.activeUsers_room);
        SocketioService.subscribeToSocketActions(this.socketActions);
        SocketioService.subscribeToMessages(function (_err, message) {
          return storeRef.roomMessages.push(message);
        });
      }
      MsgService.fetchMessages(this.activeUsers_room)
        .then((msg: any) => {
          this.roomMessages = msg;
        });
    },

    joinRoom({ room, user_name, user_id }: connectConfig) {
      SocketioService.joinRoom({ room, user_name, user_id });
    },

    addToRoomMgmt(entry: any) {
      if (this.roomMgmt[entry.room_name]) {
        this.roomMgmt[entry.room_name].push({
          id: entry.id,
          user_name:  entry.User.user_name
        })
      }
    },

    setInvite(id:any){
      this.lastGameSet = id
    },

    socketActions(_err: any, message: any) {
      switch (message.type) {
        case "enteredRoom":
          this.roomMgmt[message.data.room_id] = []
          message.data.roomEntries.forEach(this.addToRoomMgmt);

          break;
        case "join":
          this.roomMgmt[message.data.room_id] = []
          message.data.roomEntries.forEach(this.addToRoomMgmt);
          break;
        case "leftRoom":
          this.roomMgmt[message.data.room_id] = []
          message.data.roomEntries.forEach(this.addToRoomMgmt);
          break;
        case "broadcast":

          this.invitation.push({
            to: message.data.to,
            from: message.data.from,
            room: message.data.room_id
          })
          break;
        case "invite":
          console.log('invite detected', message)
          break;
        case "disconnected":
          if(this.roomMgmt && this.lastGameSet ){
            const rmMatch = (item: any) => message.data.id !== item.id;
            this.roomMgmt[this.lastGameSet] = this.roomMgmt[this.lastGameSet].filter(rmMatch );;
          }
          break;
        default:
          console.log("unexpected message type", message);
          break;
      }
    },

  },
  getters: {
    getEndPoint: state => state.socketEndpoint,
    getActiveRoom: state => state.activeUsers_room,
    getInvitations: state => state.invitation,
    getGameUserList: state => state.roomMgmt,
    getActiveUserList: state => state.roomMgmt['active-users'],
    getMsgList: state => state.roomMessages
  }
})