import express from 'express';
import { getUsuarios, recoverAccount, verificarUsuario } from '../controllers/controller.js';


const router= express.Router();
router.get('/login/',getUsuarios);
router.post('/login/',verificarUsuario);
router.post('/recovery/',recoverAccount)














export default router;