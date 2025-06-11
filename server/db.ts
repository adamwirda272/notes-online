import { Sequelize } from "sequelize";
import mysql from 'mysql2'

const db = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PW!, {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    dialect: 'mysql',
    dialectModule: mysql
})

export default db