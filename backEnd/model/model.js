import db from '../database/database.js';
import { DataTypes,DATE,Sequelize } from "sequelize";




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
    
//Definir el modelo 'Clientes'
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
        nombreRepresentante:{
            type:DataTypes.STRING,
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

//Definir el modelo 'Articulos'
export const articulosModelo= db.define('articulos',{
    IDArticulo:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    IDArticuloMarca:{
        type:DataTypes.BIGINT,
        allowNull:true,
    },
    IDProovedor:{
        type: DataTypes.BIGINT,
        allowNull:true
    },
    codigo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nombreArticulo:{
        type: DataTypes.STRING,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:true
    },
    imagen:{
        type:DataTypes.BLOB,
        allowNull:true
    },
    precioVenta:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    precioCompra:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    estado:{
        type:DataTypes.BOOLEAN
    },
    fechaCreacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fechaModificacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    descripcionModificacion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    inventario:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    facturarSinInventario:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    precioModificable:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }

},{
    tableName:'articulos',
    timestamps:false
})

//factura
export const facturaModelo = db.define('factura',{
    IDFactura:{
        type: DataTypes.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    IDEmpleado:{
        type: DataTypes.BIGINT,
        allowNull:false
    },
    IDCliente:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    NCF:{
        type:DataTypes.STRING,
        allowNull:true
    },
    fechaCreacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fechaModificacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    subtotal:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    ITBIS:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    transporte:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    descuento:{
        type:DataTypes.DOUBLE,
        allowNull:true
    },
    total:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    pagado:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    abono:{
        type:DataTypes.DOUBLE,
        allowNull:true
    } ,
    entregado:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    metodoPago:{
        type:DataTypes.STRING,
            allowNull:false
        },
        descripcionModificacion:{
            type:DataTypes.STRING,
            allowNull:false
        }

    },
    {
    timestamps:false,
    tableName:'factura'
})


//detalles de factura
export const facturaDetalleModelo= db.define(
    'facturaDetalle',
    {
        IDFacturaDetalle:{
            type:DataTypes.BIGINT,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        IDFactura:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        cantidad:{
            type:DataTypes.STRING,
            allowNull:false
        },
        precioUnitario:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        ITBIS:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        subtotal:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        entregado:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        descuento:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        fechaCreacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaModificacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        descripcionModificacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        codigo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        monto:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        IDCliente:{
            type:DataTypes.BIGINT,
            allowNull:false
        }
    },
    {
        timestamps:false,
        tableName:'facturaDetalle'
    }
)

//camion

export const camionModelo= db.define('camion',{
    IDCamion:{
        type: DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    modelo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    placa:{
        type:DataTypes.STRING,
        allowNull:false
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    },
    marca:{
        type:DataTypes.STRING,
        allowNull:false
    },
    metraje:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    fechaAdquisicion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    numeroViajes:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    activo:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    fechaCreacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fechaModificacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    nombrePropietario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen:DataTypes.BLOB,
    allowNull:true
},{
    timestamps:false,
    tableName:'camion'
})

//Combustible
export const CombustibleModelo= db.define('combustible',{
    IDCombustible:{
        type:DataTypes.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    IDChofer:{
        type:DataTypes.BIGINT,
        allowNull:true,
    },
    IDCamion:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    gastoTotal:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    galones:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    fechaCompra:{
        type:DataTypes.DATE,
        allowNull:false
    },
    notas:{
        type:DataTypes.STRING,
        allowNull:true
    },
    fechaCreacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fechaModificacion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    descripcionModificacion:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    timestamps:false,
    tableName:'combustible'
})

//compras
export const comprasModelo= db.define('compras',
    {
        IDCompras:{
            type:DataTypes.BIGINT,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        IDProovedor:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        IDEmpleado:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        fechaCreacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaModificacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaPago:{
            type:DataTypes.DATE,
            allowNull:false
        },
        cedula:{
            type:DataTypes.STRING,
            allowNull:false
        },
        RNC:{
            type:DataTypes.STRING,
            allowNull:false
        },
        nombreRepresentante:{
            type:DataTypes.STRING,
            allowNull:false
        },
        numeroFactura:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        subtotal:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        descuento:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        ITBIS:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        total:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        NCF:{
            type:DataTypes.STRING,
            allowNull:true
        },
        pagado:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        abono:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        metodoPago:{
            type:DataTypes.STRING,
            allowNull:false
        },
        IDProovedor:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        fechaVencimiento:{
            type:DataTypes.DATE,
            allowNull:false
        }

        
    },
    {
        timestamps:false,
        tableName:'compras'
    }
)
//detalles de compra
export const comprasDetalleModelo= db.define('comprasDetalle',
    {
        IDComprasDetalle:{
            type:DataTypes.BIGINT,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        IDCompras:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        IDArticulo:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        cantidad:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        precioCompra:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        ITBIS:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        subtotal:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        descuento:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        fechaCreacion: {
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaModificacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        descripcionModificacion:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false,
        tableName:'comprasDetalle'
    }
)
//empleados
export const empleadosModelo= db.define(
    'empleados',{
        posicion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        IDEmpleado:{
            type:DataTypes.BIGINT,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        sexo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cedula:{
            type:DataTypes.STRING,
            allowNull:false
        },
        correo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        telefono:{
            type:DataTypes.STRING,
            allowNull:false
        },
        direccion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        estado:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        salario:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        fechaEntrada:{
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaSalida:{
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaCreacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        fechaModificacion:{
            type:DataTypes.DATE,
            allowNull:false
        },
        descripcionModificacion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        imagen:{
            type:DataTypes.BLOB,
            allowNull:false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false,
        tableName:'empleados'
    }
)

//conducesDetalle
export const conducesDetalle= db.define('conducesDetalle',
    {
        
    },
    {
        timestamps:false,
        tableName:'conducesDetalle'
    })