'use strict';
import { DataTypes } from "sequelize";

export default {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    following_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    followed_user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    avatar: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }