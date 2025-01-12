import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const pgName = process.env.PG_NAME as string;
const pgHost = process.env.PG_HOST;
const pgUsername = process.env.PG_USERNAME as string;
const pgPassword = process.env.PG_PASSWORD;
const pgDialect = "postgres";

const sequelizeConnection = new Sequelize(pgName, pgUsername, pgPassword, {
	host: pgHost,
	dialect: pgDialect
});


export default sequelizeConnection;