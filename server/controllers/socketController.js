import MsgModel from '../models/message.model';
import RoomModel from '../models/room.model';

import BaseController from './baseController';
import { Op } from 'sequelize';

const MsgController = new BaseController(MsgModel);
const RoomController = new BaseController(RoomModel);

async function isAlready(user_id, room_id) {
  const already = await RoomController.getEntryByQuery({
    where: {
      [Op.and]: [{ user_id: user_id }, { room_id: room_id }],
    },
  });
  return already;
}

export default function (io, socket) {
  function getRoomEntries(room_id) {
    return RoomController.getEntryByQuery({
      where: { room_id: { [Op.eq]: room_id } },
    });
  }

  async function onUserJoin({ room_id, user_name, user_id }) {
    socket.join(room_id);
    var IsEntry = await isAlready(user_id, room_id);
    var online = true;

    var roomObj = {
      socket_id: socket.id,
      room_id,
      user_name,
      user_id,
      online,
    };
    if (!IsEntry.length) {
      RoomController.addEntry(roomObj);
    } else {
      RoomController.updateEntryById(user_id, roomObj);
    }

    io.to(room_id).emit('join', {
      msg: `${user_id} joined ${room_id}`,
      newList: getRoomEntries(room_id),
    });
  }

  function onEnteredRoom({ room_id }) {
    io.to(room_id).emit('enteredRoom', getRoomEntries(room_id));
  }

  function rmRoomEntry() {
    return RoomController.removeEntryByQuery({
      where: { socket_id: { [Op.eq]: socket.id } },
    });
  }

  function onLeave({ room_id }) {
    rmRoomEntry();
    socket.leave(room_id);
    io.to(room_id).emit('roomLeft', getRoomEntries(room_id));
  }

  function onDisconnect(res) {
    rmRoomEntry();
    io.emit('disconnected', res);
  }

  function onInvite({ to, from, room_id }) {
    socket.broadcast.emit('broadcast', { to, from, room_id });
  }

  function onUserMessage({ room_id, user_id, body_text }, callback) {
    var recievedMsgObj = {
      room_id,
      user_id,
      body_text,
    };

    MsgController.addEntry(recievedMsgObj);
    io.to(room_id).emit('messageFromServer', recievedMsgObj);

    callback({ status: 'ok' });
  }

  function onConnectToServer(data) {
    data;
  }
  function handleErrors(err) {
    err;
  }

  return {
    onConnectToServer,
    onUserMessage,
    onUserJoin,
    onLeave,
    onDisconnect,
    onEnteredRoom,
    onInvite,
    handleErrors,
    isAlready,
  };
}
