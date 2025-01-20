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

export const useSocketStore = defineStore("sockets", {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    activeUsers: [] as any[],
    gameUsers:[] as any[],
    roomMessages: [] as any[],
    //channels
    activeUsers_room: "active-users",
    gameRoom_id: "game-room",
    invitation: [] as any[]
  }),
  actions: {
    initializeSocket() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const storeRef = this;

      SocketioService.setupSocketConnection(this.activeUsers_room);
      SocketioService.subscribeToSocketActions(this.socketActions);
      SocketioService.subscribeToMessages(function (_err, message) {
        return storeRef.roomMessages.push(message);
      });

      MsgService.fetchMessages(this.activeUsers_room)
        .then((msg: any) => {
          this.roomMessages = msg;
        });
    },

    joinRoom({ room, user_name, user_id }: connectConfig) {
      console.log('a:',room, user_name, user_id)
      SocketioService.joinRoom({room, user_name, user_id})
    },

    socketActions(_err: any, message: any) {
      switch (message.type) {
        case "enteredRoom":
          console.log('client enteredRoom message', message)
          break;
        case "join":
          if(message.join_info && message.join_info.room_id === this.activeUsers_room){
            this.activeUsers = message.join_info.newList;
console.log(message)
            // this.activeUsers.forEach(x=> console.log(x.User.user_name))

          } else{
            console.log(message)
            this.gameUsers = message.join_info.newList;
          }
          break;
        case "disconnected":
          RoomService.fetchRoomById(this.activeUsers_room).then((activeUsers: any) => {
            console.log(activeUsers)
            this.activeUsers = activeUsers;
          }).catch(function (res) {
            console.error(res)
          });
          break;
        case "broadcast":
          this.invitation.push({
            to: message.data.to,
            from: message.data.from,
            room: message.data.room_id
          })
          break;
        case "message":
            // console.log('message detected')
            break;
        default:
          console.log("unexpected message type", message);
          break;
      }
    },


    setGameByModel(id: string) {
      this.gameRoom_id = id;
    },
  },
  getters: {
    getEndPoint: state => state.socketEndpoint,
    getActiveRoom: state => state.activeUsers_room,
    getGameRoom: state => state.gameRoom_id,
    getInvitations: state => state.invitation,
    getGameUserList: state => state.gameUsers,
    getActiveUserList: state => state.activeUsers,
    getMsgList: state => state.roomMessages

  }
})