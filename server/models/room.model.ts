'use strict';
import { Model } from "sequelize";
import connection from "../config/dbConnect";
import roomSchema from "./schema/room";

interface RoomAttributes {
  id?: number;

  socket_id: string;
  owner: number;
  user_collection: number;

  createdAt?: Date,
  updatedAt?: Date
}

class Room extends Model<RoomAttributes> {

  public id!: number;
  public socket_id!: string;
  public owner!: number;
  public user_collection!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Room.init(roomSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Room',
  freezeTableName: true
});

export default Room