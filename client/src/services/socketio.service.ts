
import { io } from 'socket.io-client';
class SocketioService {

  socket: any;

  constructor() { }

  setupSocketConnection({ token, room, user_name }: connectConfig) {

    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
      auth: { token },
      withCredentials: true,
      extraHeaders: {
        "socket-header": "abcd"
      }
    });
    console.log(`Connecting socket...`, { token, room, user_name});
  }

  joinRoom(room: string, user_name: string, user_id: string) {
    console.log('join', { room, user_name, user_id })
    this.socket.emit('leave', { room_id: room, user_id: user_id, socketId: this.socket.id });
    this.socket.emit('join', { room_id: room, user_name: user_name, user_id: user_id });
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