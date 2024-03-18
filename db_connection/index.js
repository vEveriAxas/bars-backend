require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_PASSWORD = process.env.DB_PASSWORD;
const IS_PRODUCTION = process.env.IS_PRODUCTION;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_TIMEZONE = process.env.DB_TIMEZONE;
const DB_NAME = process.env.DB_NAME;

// Запуск postgres Сервера
const sequelize = new Sequelize({
    dialect: 'postgres',
    database: (IS_PRODUCTION === 'true')? DB_NAME : 'CHAT',
    host: DB_HOST,
    port: DB_PORT,
    username: (IS_PRODUCTION === 'true')? DB_USER : 'postgres',
    password: DB_PASSWORD,
    timezone: DB_TIMEZONE,
});
module.exports = {
    sequelize
}