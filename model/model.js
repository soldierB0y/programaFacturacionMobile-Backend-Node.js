import db from '../database/database.js';
import { DataTypes,Sequelize } from "sequelize";






//ordenes
export const ordenesModelo = db.define('ordenes', {
    id_orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Numero_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Nombre_Cliente: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    Telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    RNC_Cedula: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    total_Compra: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    ITBIS: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Nota: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Ultima_Modificacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Fecha_Orden: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'ordenes',
    timestamps: false
});

// Definir el modelo 'usuarios'

    export const usuariosModelo = db.define('usuarios', {
        NomUsu: {
            type: DataTypes.STRING(300),
            allowNull: false,
            primaryKey: true
        },
        IDRol: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ConUsu: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        Nombre: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        modified_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_Empleado: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Fecha_Creacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Ultima_Modificacion: {
            type: DataTypes.DATE,
            allowNull: true
        }
  
    }, {
        timestamps: false, // Evita agregar automáticamente los campos createdAt y updatedAt
        tableName: 'usuarios', // Nombre de la tabla en la base de datos
    });
    
//Definir el modelo 'Clientes'
   export const clientesModelo = db.define('clientes',{
    Codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Tipo_Cliente: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Nombre_Representante: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    sexo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Cedula_RNC: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    Compañia: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    Direccion: {
        type: DataTypes.STRING(90),
        allowNull: true
    },
    Telefono: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    Email: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    Balance: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Limite_Credito: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Ultima_Modificacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Location: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

    },{
        timestamps:false,
        tableName:'Clientes'
    })

//Definir el modelo 'Articulos'
export const articulosModelo= db.define('articulos',{
    Codigo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Descripcion: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    Unidad_Medida: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    id_Marca: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_Departamento: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Precio_Compra: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Precio_Venta: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Precio_Minimo: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    id_Categoria:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Ultima_Modificacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Cambiar: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Inventario: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Facturar_sin_Inventario: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Alerta_Inventario: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    tableName:'articulos',
    timestamps:false
})

//Categoria
export const categoriaModelo= db.define('categoria',{
    id_Categoria:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey: true,
        autoIncrement: true
    },
    Categoria:{
        type:DataTypes.STRING,
        allowNull:true
    },
    Fecha_Creacion:{type:DataTypes.DATE,
        allowNull:true
    },
    Ultima_Modificacion:{
        type:DataTypes.DATE,
        allowNull:true
    },
    id_usuario:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    modified_by:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
},{
    tableName:'categoria',timestamps:false
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