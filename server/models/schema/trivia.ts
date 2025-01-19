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
    trivia_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    bg_bcolour: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text_colour: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }