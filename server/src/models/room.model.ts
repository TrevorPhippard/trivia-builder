'use strict';
import { Model } from 'sequelize';
import connection from '../config/dbConnect';
import roomSchema from './schema/room';

import User from './user.model';

interface RoomAttributes {
  id?: number;

  socket_id: string;
  user_id: number;
  room_name: string;

  createdAt?: Date;
  updatedAt?: Date;
}

class Room extends Model<RoomAttributes> {
  public id!: number;

  public socket_id!: string;
  public user_id!: number;
  public room_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Room.init(roomSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Room',
  freezeTableName: true,
});

Room.belongsTo(User, { foreignKey: 'user_id' });

export default Room;
