import { Sequelize } from "sequelize";
import mysql from 'mysql2'

const config = useRuntimeConfig()

const db = new Sequelize(config.DB_NAME!, config.DB_USER!, config.DB_PW!, {
    host: config.DB_HOST!,
    port: parseInt(config.DB_PORT!),
    dialect: 'mysql',
    dialectModule: mysql
})

export default db