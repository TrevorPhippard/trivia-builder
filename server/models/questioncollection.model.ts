'use strict';
import { Model } from "sequelize";
import connection from "../config/dbConnect";
import questioncollectionSchema from "./schema/questioncollection";

interface QuestionCollectionAttributes {
  id?: number;

  owner: number;
  trivia_id: number;
  question_id: number;

  createdAt?: Date,
  updatedAt?: Date
}

class QuestionCollection extends Model<QuestionCollectionAttributes> {

  public id!: number;
  public owner!: number;
  public trivia_id!: number;
  public question_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuestionCollection.init(questioncollectionSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'QuestionCollection',
  freezeTableName: true
});

export default QuestionCollection