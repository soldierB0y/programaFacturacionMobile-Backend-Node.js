import express from 'express';
import {getUsuarios, recoverAccount, verificarUsuario} from './controllers/controller.js'
import db from './database/database.js';
import cors from 'cors';
import router from './routes/routes.js';

const app= express();
app.use(cors())
const puerto= 8000;

try {
    await db.authenticate();
    console.log('autenticado');
}
catch(ex)
{
    console.log('error');
}


app.use(router)




app.listen(puerto,()=>{
    console.log('servidor ejecutandose en el puerto http://localhost:'+puerto+'/login');
})