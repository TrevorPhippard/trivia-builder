'use strict';
import { Model } from "sequelize";
import connection from "../config/dbConnect";
import userSchema from "./schema/user";
import Account from './account.model';
import Trivia from "./trivia.model";

interface UserAttributes {
  id?: number;

  account_id?: number;
  user_name: string;
  email: string;
  password: string;

  createdAt?: Date,
  updatedAt?: Date
}

class User extends Model<UserAttributes> {

  public id!: number;
  public account_id!: number;
  public user_name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(userSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'User',
  freezeTableName: true
});


User.belongsTo(Account, {
  foreignKey: 'account_id',
  as: 'account'
});

User.belongsTo(Trivia, {
  foreignKey: 'account_id',
  as: 'trivia'
});

export default User