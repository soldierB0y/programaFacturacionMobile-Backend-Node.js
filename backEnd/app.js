import express from 'express';
import {getUsuarios, recoverAccount, verificarUsuario} from './controllers/controller.js'
import db from './database/database.js';


const app= express();
const puerto= 8000;

try {
    await db.authenticate();
    console.log('autenticado');
}
catch(ex)
{
    console.log('error');
}


app.get('/login/',getUsuarios);
app.post('/login/',verificarUsuario);
app.post('/recovery/',recoverAccount)





app.listen(puerto,()=>{
    console.log('servidor ejecutandose en el puerto http://localhost:'+puerto+'/login');
})