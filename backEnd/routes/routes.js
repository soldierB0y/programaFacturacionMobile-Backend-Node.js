import express from 'express';
import { addClientes, eliminarClientes, getClientes, getUsuarios, modificarClientes, recoverAccount, verificarUsuario } from '../controllers/controller.js';


const router= express.Router();
router.get('/login/',getUsuarios);
router.post('/login/',verificarUsuario);
router.post('/recovery/',recoverAccount);
router.get('/clientes/',getClientes);
router.post('/clientes/',addClientes);
router.delete('/clientes/',eliminarClientes)
router.put('/clientes/',modificarClientes)














export default router;