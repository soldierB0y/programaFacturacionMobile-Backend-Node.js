import db from '../database/database.js';
import { DataTypes,Sequelize } from "sequelize";




// Crear conexión a la base de datos

// Definir el modelo 'usuarios'

    export const usuariosModelo = db.define('usuario', {
        IDUsuario: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true, // Definir como clave primaria
            autoIncrement: true, // Si el ID es autoincremental
        },
        IDEmpleado: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        nombreUsuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo:{
            type: DataTypes.STRING
        },
        puesto: {
            type: DataTypes.STRING,
        },
        fechaCreacion: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW, // Fecha predeterminada a la actual
        },
        fechaModificacion: {
            type: DataTypes.DATE,
        },
        descripcionModificacion: {
            type: DataTypes.STRING,
        },
        tokenRecoveryPass:{
            type:DataTypes.STRING
        },
        hourTokenRecoveryPass:
        {
            type:DataTypes.DATE
        }
    }, {
        timestamps: false, // Evita agregar automáticamente los campos createdAt y updatedAt
        tableName: 'usuario', // Nombre de la tabla en la base de datos
    });
    
   export const clientesModelo = db.define('clientes',{
        IDCliente:{
            type:DataTypes.BIGINT,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        IDRNC:{
            type: DataTypes.BIGINT,
            allowNull:true
        },
        tipoCliente:{
            type:DataTypes.STRING,
            allowNull:true
        },
        sexo:{
            type:DataTypes.CHAR,
            allowNull:true
        },
        cedula:{
            type: DataTypes.STRING,
            allowNull:true
        },
        empresa:{
            type: DataTypes.STRING,
            allowNull:true
        }
        ,
        direccion:{
            type: DataTypes.STRING,
            allowNull:true
        },
        balance:{
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        deuda:{
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        fechaCreacion:{
            type: DataTypes.DATE,
            allowNull:true
        },
        fechaModificacion:{
            type: DataTypes.DATE,
            allowNull:true
        },
        correo:{
            type: DataTypes.STRING,
            allowNull:true
        },
        imagen:{
            type: DataTypes.BLOB,
            allowNull:true
        },
        montoTotalCompras:{
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        descripcionModificacion:{
            type: DataTypes.STRING,
            allowNull:true
        }

    },{
        timestamps:false,
        tableName:'Clientes'
    })
