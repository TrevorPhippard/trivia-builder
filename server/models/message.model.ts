'use strict';
import { Model } from "sequelize";
import connection from "../config/dbConnect";
import messageSchema from "./schema/message";

import User from "./user.model"
import Room from "./room.model"

interface MessageAttributes {

  id?: number;
  room_id: number;
  body_text: string;
  user_id: number;

  createdAt?: Date,
  updatedAt?: Date
}

class Message extends Model<MessageAttributes> {
  public id!: number;

  public room!: number;
  public body_text!: string;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(messageSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Message',
  freezeTableName: true
});

// Message.belongsTo(User, { foreignKey: 'user_id' });
// Message.belongsTo(Room, { foreignKey: 'room' });

export default Message