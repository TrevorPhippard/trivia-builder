'use strict';
import { DataTypes } from "sequelize";

export default {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    owner: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    trivia_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    question_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }