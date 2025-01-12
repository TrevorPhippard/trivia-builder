'use strict';
import { DataTypes } from "sequelize";

export default {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    socket_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    owner: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_collection: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }