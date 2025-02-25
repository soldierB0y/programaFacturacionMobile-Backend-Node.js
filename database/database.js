import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    logging: console.log, // Updated logging option
    database: 'sp_up_sys',
    username: 'root',
    password: 'root'
});

export default db;