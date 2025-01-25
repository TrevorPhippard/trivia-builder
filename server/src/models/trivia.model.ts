'use strict';
import { Model } from 'sequelize';
import connection from '../config/dbConnect';
import triviaSchema from './schema/trivia';

import Question from './question.model';

interface TriviaAttributes {
  id?: number;

  owner: number;
  trivia_name: string;
  bg_bcolour: string;
  text_colour: string;

  createdAt?: Date;
  updatedAt?: Date;
}

class Trivia extends Model<TriviaAttributes> {
  public id!: number;
  public owner!: string;
  public trivia_name!: string;
  public bg_bcolour!: string;
  public text_colour!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Trivia.init(triviaSchema, {
  timestamps: true,
  sequelize: connection,
  underscored: false,
  modelName: 'Trivia',
  freezeTableName: true,
});

Trivia.hasMany(Question, { foreignKey: 'trivia_id' });

export default Trivia;
