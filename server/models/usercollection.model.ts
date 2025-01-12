'use strict';
import { Model } from "sequelize";
import connection from "../config/dbConnect";
import usercollectionSchema from "./schema/usercollection";

interface UserCollectionAttributes {
  id?: number;
  owner: number;
  room_id: number;
  user_id: number;

  createdAt?: Date,
  updatedAt?: Date
}

class UserCollection extends Model<UserCollectionAttributes> {

  public id!: number;
  public owner!: number;
  public room_id!: number;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserCollection.init(usercollectionSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'UserCollection',
  freezeTableName: true
});

export default UserCollection;
