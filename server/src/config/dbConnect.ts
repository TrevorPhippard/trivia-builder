import {  Sequelize } from 'sequelize';
import databaseConfig from './database'

import dotenv from 'dotenv';

dotenv.config();



const env =  process.env.NODE_ENV ||  "development";
const config =  databaseConfig[env];

let sequelizeConnection;


if (process.env.DATABASE_URL) {
   sequelizeConnection = new Sequelize(process.env.DATABASE_URL);
} else {
   sequelizeConnection = new Sequelize(config.database, config.username, config.password,  {
    host: config.host,
    dialect: config.dialect,
  })
}


export default sequelizeConnection;
