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


  interface messageType {
    room_id: string;
    user_id: string;
    body_text: string;
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
    roomMessages: [] as any[],
    //channels
    chat_room: "chat",
    activeUsers_room: 0,
    gameRoom_id: "game-room",
    invitation: [] as any[]
  }),
  actions: {
    initializeSocket(connectConfig: connectConfig) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const storeRef = this;

      SocketioService.setupSocketConnection(connectConfig);
      SocketioService.subscribeToSocketActions(this.socketActions);
      SocketioService.subscribeToMessages(function (_err, message) {
        return storeRef.roomMessages.push(message);
      });


      MsgService.fetchMessages(connectConfig.room)
        .then((msg: any) => {
          this.roomMessages = msg;
        });
    },

    joinRoom({ room, user_name, user_id }: connectConfig) {
      console.log({room, user_name, user_id})
      SocketioService.joinRoom(room, user_name, user_id)
    },

    socketActions(_err: any, message: any) {
      console.log(message.type)
      switch (message.type) {
        case "enteredRoom":
        case "join":
        case "disconnected":
          RoomService.fetchRoomById(this.activeUsers_room).then((activeUsers: any) => {
            console.log({activeUsers: this.activeUsers})
            this.activeUsers = activeUsers;
          });
          break;
        case "broadcast":
          this.invitation.push({
            to: message.data.to,
            from: message.data.from,
            room: message.data.room_id
          })
          break;
        default:
          console.log("unexpected message type", message);
          break;
      }
    },

    launchGame(room: string) {
      this.activeUsers_room = room;
      return gameService.launchGame(room)
    },
    setGameByModel(id: string) {
      this.gameRoom_id = id;
    },
  },
  getters: {
    getEndPoint: state => state.socketEndpoint,
    getChatroom: state => state.chat_room,
    getActiveRoom: state => state.activeUsers_room,
    getGameRoom: state => state.gameRoom_id,
    getUserList: state => state.activeUsers,
    getMsgList: state => state.roomMessages,
    getInvitations: state => state.invitation
  }
})