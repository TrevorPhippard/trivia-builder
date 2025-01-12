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
    room_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }