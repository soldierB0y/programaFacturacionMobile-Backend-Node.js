import { articulosModelo, categoriaModelo, clientesModelo, usuariosModelo,ordenesModelo} from '../model/model.js';
import { v4 } from 'uuid';
import { Resend } from 'resend';
import isOnline from 'is-online';

const url = 'http://localhost:8000/';

export const getUsuarios = async (req, res) => {
    try {
        const thisUsuario = await usuariosModelo.findAll();
        res.json(thisUsuario);
    } catch (error) {
        res.json("failed" + error);
    }
};

export const verificarUsuario = async (req, res) => {
    const usuario = req.query.usuario || null;
    const clave = req.query.clave || null;

    if (usuario && clave) {
        try {
            const usuarioEncontrado = await usuariosModelo.findOne({ raw: true, where: { nombreUsuario: usuario, clave: clave } });
            if (usuarioEncontrado) {
                res.status(200).json({ validated: true });
            } else {
                res.status(400).json({ validated: false });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ validated: false });
        }
    } else {
        res.status(400).json({ validated: false, message: "Debe rellenar las credenciales" });
    }
};

export const recoverAccount = async (req, res) => {
    const correo = req.query.correo;
    if (correo.length > 0) {
        try {
            const account = await usuariosModelo.findOne({ where: { correo: correo } });
            if (account) {
                const id = v4();
                await usuariosModelo.update({ tokenRecoveryPass: id, hourTokenRecoveryPass: Date.now() }, { where: { correo: correo } });

                if (await isOnline()) {
                    try {
                        const resend = new Resend('re_E77YBf3d_Egpstnvr3FP1MEHfN8yzygk8');
                        await resend.emails.send({
                            from: 'onboarding@resend.dev',
                            to: correo,
                            subject: 'Validacion de Cuenta',
                            html: `<p>Se ha creado exitosamente una nueva cuenta en Imperio W <br>Para validar la cuenta acceda al siguiente link <br>${url}recovery/${id}</p>`,
                        });
                        res.status(200).json({ validated: true });
                    } catch (error) {
                        res.status(400).json({ validated: false, error: error });
                    }
                } else {
                    res.status(400).json({ validated: false, message: 'Error de conexión' });
                }
            } else {
                res.status(400).json({ validated: false });
            }
        } catch (error) {
            res.status(400).json({ validated: false });
        }
    } else {
        res.status(400).json({ validated: false, message: 'Debe rellenar las credenciales' });
    }
};

export const getClientes = async (req, res) => {
    try {
        const clientes = await clientesModelo.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.log('error' + error);
    }
};

export const addClientes = async (req, res) => {
    const { nombre, tipoCliente, sexo, Cedula_RNC, Compañia, direccion, balance = 0, Limite_Credito = 0, telefono, correo, Location, id_usuario, modified_by } = req.body;
    const fechaCreacion = new Date();
    const Ultima_Modificacion = new Date();

    if (nombre) {
        try {
            const cliente = await clientesModelo.create({
                Tipo_Cliente: tipoCliente,
                Nombre_Representante: nombre,
                sexo: sexo,
                Cedula_RNC: Cedula_RNC,
                Compañia: Compañia,
                Direccion: direccion,
                Balance: balance,
                Limite_Credito: Limite_Credito,
                Telefono: telefono,
                Fecha_Creacion: fechaCreacion,
                Ultima_Modificacion: Ultima_Modificacion,
                Email: correo,
                Location: Location,
                id_usuario: id_usuario,
                modified_by: modified_by
            });

            if (cliente) {
                res.status(200).json({ "message": "Agregado exitosamente!" });
            } else {
                res.status(400).json({ 'message': 'No se ha podido agregar el cliente' });
            }
        } catch (error) {
            res.status(400).json({ "Error": "Error al tratar de realizar el registro \n" + error });
        }
    } else {
        res.status(400).json({ "Error": "Error al tratar de realizar el registro. Proporcione un nombre" });
    }
};

export const eliminarClientes = async (req, res) => {
    const IDCliente = req.body.IDCliente || null;

    if (IDCliente == null) {
        res.status(400).json({ 'Error': 'Fallo al intentar localizar cliente solicitado.' });
    } else {
        try {
            const resultado = await clientesModelo.destroy({ where: { IDCliente: IDCliente } });
            if (resultado == 1) {
                res.status(200).json({ 'message': 'Cliente eliminado exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado el cliente' });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ 'Error': 'Error con la petición' });
        }
    }
};

export const modificarClientes = async (req, res) => {
    const { Codigo, Tipo_Cliente, Nombre_Representante, sexo, Cedula_RNC, Compañia, Direccion, Balance, Limite_Credito, Fecha_Creacion, Location, id_usuario, modified_by, Telefono, Email } = req.body;
    const Ultima_Modificacion = new Date();

    if (Codigo == null) {
        res.status(400).json({ 'Error': 'Error con la petición' });
    } else {
        try {
            const resultado = await clientesModelo.update({
                Tipo_Cliente: Tipo_Cliente,
                Nombre_Representante: Nombre_Representante,
                sexo: sexo,
                Cedula_RNC: Cedula_RNC,
                Compañia: Compañia,
                Direccion: Direccion,
                Balance: Balance,
                Limite_Credito: Limite_Credito,
                Ultima_Modificacion: Ultima_Modificacion,
                Fecha_Creacion: Fecha_Creacion,
                Location: Location,
                id_usuario: id_usuario,
                modified_by: modified_by,
                Telefono: Telefono,
                Email: Email
            }, {
                where: { Codigo: Codigo }
            });

            if (resultado == 1) {
                res.status(200).json({ 'message': 'Actualizado exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado al cliente' });
            }
        } catch (error) {
            res.status(400).json({ 'Error': 'Error con la petición' });
            console.log(error);
        }
    }
};

export const getCategoria = async (req, res) => {
    try {
        const categoria = await categoriaModelo.findAll();
        res.status(200).json(categoria);
    } catch (error) {
        console.log('ERROR:' + error);
        res.status(400).json({'error':error})
    }
};

export const addCategoria = async (req, res) => {
    const categoria = req.body || null;
    if (categoria) {
        try {
            const categorias = await categoriaModelo.create(categoria);
            if (categorias) {
                res.status(200).json({ "message": "Agregado exitosamente!" });
            } else {
                res.status(400).json({ 'message': 'No se ha podido agregar la categoría' });
            }
        } catch (error) {
            res.status(400).json({ "Error": "Error al tratar de realizar el registro" + error });
        }
    } else {
        res.status(400).json({ "Error": "Error al tratar de realizar el registro. Proporcione un nombre" });
    }
};

export const eliminarCategoria = async (req, res) => {
    const id_Categoria = req.body.id_Categoria || null;

    if (id_Categoria == null) {
        res.status(400).json({ 'Error': 'Fallo al intentar localizar la categoría solicitada.' });
    } else {
        try {
            const resultado = await categoriaModelo.destroy({ where: { id_Categoria: id_Categoria } });
            if (resultado == 1) {
                res.status(200).json({ 'message': 'Categoría eliminada exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado la categoría' });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ 'Error': 'Error con la petición' });
        }
    }
};

export const modificarCategoria = async (req, res) => {
    const { id_Categoria, Categoria, Fecha_Creacion, id_usuario, modified_by } = req.body;
    const Ultima_Modificacion = new Date();

    if (id_Categoria == null) {
        res.status(400).json({ 'Error': 'Error con la petición' });
    } else {
        try {
            const resultado = await categoriaModelo.update({
                Categoria: Categoria,
                Ultima_Modificacion: Ultima_Modificacion,
                Fecha_Creacion: Fecha_Creacion,
                id_usuario: id_usuario,
                modified_by: modified_by
            }, {
                where: { id_Categoria: id_Categoria }
            });

            if (resultado == 1) {
                res.status(200).json({ 'message': 'Actualizado exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado la categoría' });
            }
        } catch (error) {
            res.status(400).json({ 'Error': 'Error con la petición' });
            console.log(error);
        }
    }
};

export const getArticulos = async (req, res) => {
    try {
        const articulos = await articulosModelo.findAll();
        res.status(200).json(articulos);
    } catch (error) {
        console.log('error' + error);
    }
};

export const addArticulos = async (req, res) => {
    const articulo = req.body || null;
    if (articulo) {
        try {
            const articulos = await articulosModelo.create(articulo);
            if (articulos) {
                res.status(200).json({ "message": "Agregado exitosamente!" });
            } else {
                res.status(400).json({ 'message': 'No se ha podido agregar el artículo' });
            }
        } catch (error) {
            res.status(400).json({ "Error": "Error al tratar de realizar el registro" + error });
        }
    } else {
        res.status(400).json({ "Error": "Error al tratar de realizar el registro. Proporcione un nombre" });
    }
};

export const eliminarArticulos = async (req, res) => {
    const IDArticulo = req.body.IDArticulo || null;

    if (IDArticulo == null) {
        res.status(400).json({ 'Error': 'Fallo al intentar localizar el artículo solicitado.' });
    } else {
        try {
            const resultado = await articulosModelo.destroy({ where: { IDArticulo: IDArticulo } });
            if (resultado == 1) {
                res.status(200).json({ 'message': 'Artículo eliminado exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado el artículo' });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ 'Error': 'Error con la petición' });
        }
    }
};

export const modificarArticulos = async (req, res) => {
    const { Codigo, id_Categoria, Descripcion, Unidad_Medida, id_Marca, id_Departamento, Precio_Compra, Precio_Venta, Precio_Minimo, Estado, Cambiar, Inventario, Facturar_sin_Inventario, Fecha_Creacion, Alerta_Inventario, id_usuario, modified_by } = req.body;
    const Ultima_Modificacion = new Date();

    if (Codigo == null) {
        res.status(400).json({ 'Error': 'Error con la petición' });
    } else {
        try {
            const resultado = await articulosModelo.update({
                Descripcion: Descripcion,
                Unidad_Medida: Unidad_Medida,
                id_Marca: id_Marca,
                id_Departamento: id_Departamento,
                id_Categoria: id_Categoria,
                Precio_Compra: Precio_Compra,
                Precio_Venta: Precio_Venta,
                Precio_Minimo: Precio_Minimo,
                Estado: Estado,
                Ultima_Modificacion: Ultima_Modificacion,
                Cambiar: Cambiar,
                Inventario: Inventario,
                Facturar_sin_Inventario: Facturar_sin_Inventario,
                Fecha_Creacion: Fecha_Creacion,
                Alerta_Inventario: Alerta_Inventario,
                id_usuario: id_usuario,
                modified_by: modified_by
            }, {
                where: { Codigo: Codigo }
            });

            if (resultado == 1) {
                res.status(200).json({ 'message': 'Actualizado exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado el artículo' });
            }
        } catch (error) {
            res.status(400).json({ 'Error': 'Error con la petición' });
            console.log(error);
        }
    }
};


//ordenes
//get
export const getOrdenes = async (req, res) => {
    try {
        const ordenes = await ordenesModelo.findAll();
        res.status(200).json(ordenes);
    } catch (error) {
        console.log('error' + error);
    }
};
//add
export const addOrdenes = async (req, res) => {
    const { Numero_Cliente, Nombre_Cliente, Telefono, RNC_Cedula, total, total_Compra, ITBIS, Estado, Nota, id_usuario, modified_by, Fecha_Orden } = req.body;
    const Fecha_Creacion = new Date();
    const Ultima_Modificacion = new Date();

    try {
        const orden = await ordenesModelo.create({
            Numero_Cliente: Numero_Cliente,
            Nombre_Cliente: Nombre_Cliente,
            Telefono: Telefono,
            RNC_Cedula: RNC_Cedula,
            total: total,
            total_Compra: total_Compra,
            ITBIS: ITBIS,
            Estado: Estado,
            Nota: Nota,
            Fecha_Creacion: Fecha_Creacion,
            Ultima_Modificacion: Ultima_Modificacion,
            id_usuario: id_usuario,
            modified_by: modified_by,
            Fecha_Orden: Fecha_Orden
        });

        if (orden) {    res.status(200).json({ "message": "Agregado exitosamente!" });
    } else {
        res.status(400).json({ 'message': 'No se ha podido agregar la orden' });
    }
} catch (error) {
    res.status(400).json({ "Error": "Error al tratar de realizar el registro \n" + error });
}
};

//eliminar
export const eliminarOrdenes = async (req, res) => {
    const id_orden = req.body.id_orden || null;

    if (id_orden == null) {
        res.status(400).json({ 'Error': 'Fallo al intentar localizar la orden solicitada.' });
    } else {
        try {
            const resultado = await ordenesModelo.destroy({ where: { id_orden: id_orden } });
            if (resultado == 1) {
                res.status(200).json({ 'message': 'Orden eliminada exitosamente' });
            } else {
                res.status(400).json({ 'message': 'No se ha encontrado la orden' });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ 'Error': 'Error con la petición' });
        }
    }
};

//modificar
export const modificarOrdenes = async (req, res) => {
    const { id_orden, Numero_Cliente, Nombre_Cliente, Telefono, RNC_Cedula, total, total_Compra, ITBIS, Estado, Nota, id_usuario, modified_by, Fecha_Orden } = req.body;
    const Ultima_Modificacion = new Date();

    if (id_orden == null) {
        res.status(400).json({ 'Error': 'Error con la petición' });
    } else {
        try {
            const resultado = await ordenesModelo.update({
                Numero_Cliente: Numero_Cliente,
                Nombre_Cliente: Nombre_Cliente,
                Telefono: Telefono,
                RNC_Cedula: RNC_Cedula,
                total: total,
                total_Compra: total_Compra,
                ITBIS: ITBIS,
                Estado: Estado,
                Nota: Nota,
                Ultima_Modificacion: Ultima_Modificacion,
                id_usuario: id_usuario,
                modified_by: modified_by,
                Fecha_Orden: Fecha_Orden
            }, {
                where: { id_orden: id_orden }
            });

            if (resultado == 1) {
                res.status(200).json({ 'message': 'Actualizado exitosamente' });
            } else {    res.status(400).json({ 'message': 'No se ha encontrado la orden' });
        }
    } catch (error) {
        res.status(400).json({ 'Error': 'Error con la petición' });
        console.log(error);
    }
}
};