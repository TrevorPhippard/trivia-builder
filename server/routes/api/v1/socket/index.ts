

import SocketController from "../../../../controllers/socketController";
import { Socket } from "socket.io";



const socketRoutes = function (io: any, socket: Socket) {

  const socketCntr =  SocketController(io, socket);

  // socket.on("", obj =>  console.log(obj));

  // socket.on("connectToServer", socketCntr.onConnectToServer);
  // socket.on('connect_error', socketCntr.handleErrors)
  // socket.on('connect_failed', socketCntr.handleErrors)
  socket.on("enteredRoom", socketCntr.onEnteredRoom);
  socket.on("messageFromClient", socketCntr.onMessage);
  socket.on("join", socketCntr.onJoin)
  socket.on("leave", socketCntr.onLeave);
  socket.on("disconnect", socketCntr.onDisconnect)
  socket.on("invite", socketCntr.onInvite)
}

export default socketRoutes;