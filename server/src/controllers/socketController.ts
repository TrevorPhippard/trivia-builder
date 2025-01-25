import MsgModel from '../models/message.model';
import RoomModel from '../models/room.model';

import BaseController from './baseController';
import { Op } from 'sequelize';

const MsgController = new BaseController(MsgModel);
const RoomController = new BaseController(RoomModel);

interface roomSchema {
  socket_id: any;
  user_id: any;
  room_name: any;
}

export default function (io: any, socket: any) {
  /** --------------------------------------
      ROOM Queries
      -------------------------------------- */

  async function isAlready(user_id: string) {
    return RoomController.getEntryByQuery({
      where: {
        [Op.and]: [{ user_id: user_id }],
      },
    });
  }

  async function getRoomEntries(room_id: string) {
    return RoomController.getEntryByQuery({
      where: { room_name: { [Op.eq]: String(room_id) } },
      raw: true,
      nest: true,
      include: [{ all: true }],
    });
  }

  async function queryBySocket(id: string) {
    return RoomController.getEntryByQuery({
      where: {
        [Op.and]: [{ socket_id: id }],
      },
      raw: true,
      nest: true,
      include: [{ all: true }],
    });
  }

  async function updateRoomEntry(user_id: string, roomObj: roomSchema) {
    return RoomController.updateEntryByQuery(
      {
        where: { user_id: { [Op.eq]: user_id } },
      },
      roomObj,
    );
  }

  /** --------------------------------------
  Socket Event Handlers
--------------------------------------*/

  async function addOrUpdate(user_id: string, roomObj: roomSchema) {
    const isEntry = await isAlready(user_id);
    if (!isEntry.length) {
      await RoomController.addEntry(roomObj);
    } else {
      await updateRoomEntry(user_id, roomObj);
    }
  }

  async function onJoin({ user_id, room_id }: any) {
    socket.join(room_id);

    const roomObj = {
      socket_id: socket.id,
      user_id: user_id,
      room_name: room_id,
    };

    await addOrUpdate(user_id, roomObj);

    const roomEntries = await getRoomEntries(room_id);

    io.to(room_id).emit('join', {
      desc: `${user_id} join ${room_id}`,
      user_id,
      room_id,
      roomEntries: roomEntries,
    });
  }

  async function onEnteredRoom({ room_id, user_id }: any) {
    const roomEntries = await getRoomEntries(room_id);
    io.to(room_id).emit('enteredRoom', {
      desc: `${user_id} entered ${room_id}`,
      room_id,
      roomEntries: roomEntries,
    });
  }

  async function onLeave({ room_id, user_id }: any) {
    socket.leave(room_id);
    // await rmRoomEntry(String(socket.id));
    const roomEntries = await getRoomEntries(room_id);

    io.to(room_id).emit('leftRoom', {
      desc: `${user_id} leave ${room_id}`,
      room_id,
      roomEntries: roomEntries,
    });
  }

  async function onDisconnect() {
    const query = await queryBySocket(socket.id);

    io.emit('disconnected', query[0]);
  }

  function onInvite({ to, from, room_id }: any) {
    socket.broadcast.emit('broadcast', { to, from, room_id });
  }

  function onMessage({ room_id, user_id, body_text }: any, callback: (arg0: { status: string }) => void) {
    const receivedMsgObj = {
      room_id,
      user_id,
      body_text,
    };

    MsgController.addEntry(receivedMsgObj);
    io.to(room_id).emit('messageFromServer', receivedMsgObj);

    callback({ status: 'ok' });
  }

  return {
    onMessage,
    onJoin,
    onLeave,
    onDisconnect,
    onEnteredRoom,
    onInvite,
    isAlready,
  };
}
