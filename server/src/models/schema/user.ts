'use strict';
import { DataTypes } from 'sequelize';

export default {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  account_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  user_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};
