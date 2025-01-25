'use strict';
import { DataTypes } from 'sequelize';

export default {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
  },
  socket_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  room_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};
