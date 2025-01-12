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
    file_name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }