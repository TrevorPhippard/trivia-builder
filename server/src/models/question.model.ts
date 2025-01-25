'use strict';
import { Model } from 'sequelize';
import connection from '../config/dbConnect';
import questionSchema from './schema/question';
interface QuestionAttributes {
  id?: number;

  slide_rank: number;
  owner: number;
  trivia_id: number;
  category: number;
  type: string;
  question: string;
  options: string;
  answer: string;
  bgImg: string;

  createdAt?: Date;
  updatedAt?: Date;
}

class Question extends Model<QuestionAttributes> {
  public id!: number;
  public slide_rank!: number;
  public owner!: number;
  public trivia_id!: number;
  public category!: number;
  public type!: string;
  public question!: string;
  public options!: string;
  public answer!: string;
  public bgImg!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(questionSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Question',
  freezeTableName: true,
});

export default Question;
