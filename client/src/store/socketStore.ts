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

  function getUsers(room,cb){
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
      SocketioService.joinRoom({room, user_name, user_id})
    },


    setActiveUsers(arr:any){
      this.activeUsers = arr
    },
    
    setGameUsers(arr:any){
      this.gameUsers = arr
    },

    socketActions(_err: any, message: any) {
      switch (message.type) {
        case "enteredRoom":
          console.log('client enteredRoom message', message)
          break;
        case "join":
          if(message.join_info){
            // should get the same response from message but no time so this
            getUsers(message.join_info.room_id,function(activeUsers:any){
              if(message.join_info.room_id === this.activeUsers_room){
                this.activeUsers = activeUsers;
              }else{
                this.gameRoom_id = message.join_info.room_id;
                this.gameUsers = activeUsers;
              }
            }.bind(this))
          }
          console.log('gameUsers:',this.gameUsers)

          break;
        case "disconnected":
            getUsers(this.activeUsers_room,function(activeUsers:any){
              this.activeUsers = activeUsers;
            }.bind(this))

            getUsers(this.gameRoom_id,function(activeUsers:any){
              this.gameUsers = activeUsers;
            }.bind(this))

        
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