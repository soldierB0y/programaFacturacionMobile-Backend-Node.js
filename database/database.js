import { Sequelize } from "sequelize";


const db=new Sequelize({
    dialect:'mysql',
    host:'127.0.0.1',
    logging:true,
    database:'ishowuspeed',
    username:'SoldierB0y'
})

export  default db;