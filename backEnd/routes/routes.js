import express from 'express';
import { addClientes, getClientes, getUsuarios, recoverAccount, verificarUsuario } from '../controllers/controller.js';


const router= express.Router();
router.get('/login/',getUsuarios);
router.post('/login/',verificarUsuario);
router.post('/recovery/',recoverAccount);
router.get('/clientes/',getClientes);
router.post('/clientes',addClientes)














export default router;