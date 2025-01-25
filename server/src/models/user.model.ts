'use strict';
import { Model } from 'sequelize';
import connection from '../config/dbConnect';
import userSchema from './schema/user';

import Account from './account.model';
import Message from './message.model';
import Question from './question.model';
import Resource from './resource.model';
import Trivia from './trivia.model';

interface UserAttributes {
  id?: number;

  account_id?: number;
  user_name: string;
  email: string;
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> {
  public id!: number;
  public account_id!: number;
  public user_name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  role: any;
}

User.init(userSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'User',
  freezeTableName: true,
});

User.hasMany(Message, { foreignKey: 'user_id' });
User.hasMany(Resource, { foreignKey: 'owner' });
User.hasMany(Trivia, { foreignKey: 'owner' });
User.hasMany(Question, { foreignKey: 'owner' });
User.hasMany(Account, { foreignKey: 'following_user_id' });
User.hasMany(Account, { foreignKey: 'followed_user_id' });

export default User;
