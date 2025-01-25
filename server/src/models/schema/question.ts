'use strict';
import { DataTypes } from 'sequelize';

export default {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  slide_rank: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  owner: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  trivia_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  question: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  options: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  answer: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  bgImg: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};
