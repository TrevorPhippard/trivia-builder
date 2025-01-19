
import { io } from 'socket.io-client';
import { useAuthStore }   from "../store/authStore.ts";
import { storeToRefs } from "pinia";

interface messageType {
  room_id: string;
  user_id: string;
  body_text: string;
}

class SocketioService {

  socket: any;

  constructor() { }

  setupSocketConnection(room: string) {
    const authStore = useAuthStore();
    const { getUserInfo:userInfo, getToken: token } = storeToRefs(authStore)

    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
      auth: { token: token.value },
      withCredentials: true,
      extraHeaders: {
        "socket-header": "abcd"
      }
    });

    this.joinRoom( room, userInfo.value.user_name, userInfo.value.id )
    console.log(`Connecting socket...`, { token, room:room, user_name: userInfo.value.user_name});
  }

  joinRoom(room: string, user_name: string, user_id: string) {
    console.log('join', { room, user_name, user_id })
    this.socket.emit('leave', { room_id: room, user_id: user_id, socketId: this.socket.id });
    this.socket.emit('join', { room_id: room, user_id: user_id, user_name: user_name});
  }

  invite(toUser: string, fromUser: string, room: string) {
    this.socket.emit('invite', {
      to: toUser,
      from: fromUser,
      room_id: room
    })
  }

  subscribeToMessages(cb: (err: null, message: string) => void) {
    if (!this.socket) return (true);
    console.log('subscribeToMessages')
    this.socket.on('messageFromServer', (msg: string) => cb(null, msg));
  }

  subscribeToSocketActions(cb: (err: null, message: object) => void) {

    if (!this.socket) return (true);
    this.socket.on('join', (socketMsg: string) => cb(null, { user_name: socketMsg, type: 'join' }));
    this.socket.on('enteredRoom', (socketMsg: string) => cb(null, { userList: socketMsg, type: 'enteredRoom' }));
    this.socket.on('messageFromServer', (socketMsg: string) => cb(null, { message: socketMsg, type: 'join' }));
    this.socket.on('broadcast', (socketMsg: string) => cb(null, { data: socketMsg, type: 'broadcast' }));
    this.socket.on('disconnected', (socketMsg: string) => cb(null, { user_name: socketMsg, type: 'disconnected' }));
  }

  sendMessage(message: messageType, cb: noArg) {
    if (this.socket.id) {
      this.socket.emit('messageFromClient', message, cb);
    } else {
      console.error('socketId lost')
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();