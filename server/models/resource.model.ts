'use strict';
import { Model } from "sequelize";
import connection from "../config/dbConnect";
import resourceSchema from "./schema/resource";

import Question from "./question.model"
import User from "./user.model"

interface ResourceAttributes {

  id?: number;
  owner: number;
  file_name: string;

  createdAt?: Date,
  updatedAt?: Date
}

class Resource extends Model<ResourceAttributes> {
  public id!: number;

  public owner!: number;
  public file_name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Resource.init(resourceSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Resource',
  freezeTableName: true
});

// Resource.belongsTo(User, { foreignKey: 'owner' });
Resource.hasMany(Question, { foreignKey: 'file_name' });

export default Resource