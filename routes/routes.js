import express from 'express';
import { addArticulos, addCategoria, addClientes, eliminarArticulos, eliminarCategoria, eliminarClientes, eliminarOrdenes, getArticulos, getCategoria, getClientes, getOrdenes, getUsuarios, modificarArticulos, modificarCategoria, modificarClientes, modificarOrdenes, recoverAccount, verificarUsuario } from '../controllers/controller.js';


const router= express.Router();
//usuarios
router.get('/login/',getUsuarios);
router.post('/login/',verificarUsuario);
router.post('/recovery/',recoverAccount);
//clientes
router.get('/clientes/',getClientes);
router.post('/clientes/',addClientes);
router.delete('/clientes/',eliminarClientes)
router.put('/clientes/',modificarClientes)
//articulos
router.get('/articulos/',getArticulos);
router.post('/articulos/',addArticulos);
router.delete('/articulos/',eliminarArticulos)
router.put('/articulos/',modificarArticulos)
//categoria
router.get('/categoria/',getCategoria);
router.post('/categoria/',addCategoria);
router.delete('/categoria/',eliminarCategoria);
router.put('/categoria/',modificarCategoria)
//ordenes
router.get('/ordenes/',getOrdenes);
router.post('/ordenes/',addCategoria);
router.delete('/ordenes/',eliminarOrdenes);
router.put('/ordenes/',modificarOrdenes)













export default router;