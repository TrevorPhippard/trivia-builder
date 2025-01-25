'use strict';
import { Model } from 'sequelize';
import connection from '../config/dbConnect';
import accountSchema from './schema/account';

interface AccountAttributes {
  id?: number;
  following_user_id: number;
  followed_user_id: number;
  description: string;
  avatar: string;

  createdAt?: Date;
  updatedAt?: Date;
}

class Account extends Model<AccountAttributes> {
  public id!: number;

  public following_user_id!: number;
  public followed_user_id!: number;
  public description!: string;
  public avatar!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Account.init(accountSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Account',
  freezeTableName: true,
});

export default Account;
