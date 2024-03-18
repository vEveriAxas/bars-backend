const { Sequelize } = require('sequelize');

// Запуск postgres Сервера
const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'CHAT',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'Rpc-8456^$=lnk-3104',
    timezone: '+03:00',
});
module.exports = {
    sequelize
}