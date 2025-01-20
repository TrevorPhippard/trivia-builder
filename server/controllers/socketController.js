import MsgModel from '../models/message.model';
import RoomModel from '../models/room.model';

import BaseController from './baseController';
import { Op } from 'sequelize';

const MsgController = new BaseController(MsgModel);
const RoomController = new BaseController(RoomModel);

async function isAlready(user_id, room_id) {
  const already = RoomController.getEntryByQuery({
    where: {
      [Op.and]: [{ user_id: user_id }, { room_name: String(room_id) }],
    },
  });

  return already;
}

export default function (io, socket) {
  async function getRoomEntries(room_id) {
    var roomUsers = RoomController.getEntryByQuery({
      where: { room_name: { [Op.eq]: String(room_id) } },
      raw: true,
      nest: true, // <--- The issue of raw true, will be solved by this
      include: [{ all: true }],
    });

    var sentData = roomUsers;
    return sentData;
  }

  async function onUserJoin({ user_id, room_id }) {
    socket.join(room_id);
    var IsEntry = await isAlready(user_id, room_id);

    var roomObj = {
      socket_id: socket.id,
      user_id: user_id,
      room_name: room_id,
    };

    if (!IsEntry.length) {
      RoomController.addEntry(roomObj);
    } else {
      RoomController.updateEntryByQuery(
        {
          where: { user_id: { [Op.eq]: user_id } },
        },
        roomObj,
      );
    }
    var roomEntries = await getRoomEntries(room_id);

    io.to(room_id).emit('join', {
      user_id: user_id,
      room_id: room_id,
      msg: `${user_id} joined ${room_id}`,
      newList: roomEntries,
    });
  }

  async function onEnteredRoom({ room_id, user_id, socketId }) {
    var roomEntries = await getRoomEntries(room_id);
    io.to(room_id).emit('enteredRoom', roomEntries);
  }

  function rmRoomEntry() {
    return RoomController.removeEntryByQuery({
      where: { socket_id: { [Op.eq]: String(socket.id) } },
    });
  }

  async function onLeave({ room_id, user_id, socketId }) {
    socket.leave(room_id);
    rmRoomEntry();

    var roomEntries = await getRoomEntries(room_id);

    io.to(room_id).emit('roomLeft', roomEntries);
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
