'use strict';
import { DataTypes } from "sequelize";

export default {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    room_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    body_text: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }