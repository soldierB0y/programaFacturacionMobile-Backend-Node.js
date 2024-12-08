
import usuariosModelo from '../model/model.js';
import { stringify, v4 } from 'uuid';

import { json } from 'sequelize';
import {Resend} from 'resend';
import isOnline from 'is-online';

const url = 'http://localhost:8000/'







export const getUsuarios = async (req,res)=>{
    try
    {
        const thisUsuario= await usuariosModelo.findAll();
        console.log(thisUsuario);
        res.json(thisUsuario);

    }
    catch(error)
    {
    res.json("failed"+error);
    }
}

export const verificarUsuario= async (req,res)=>{

        const usuario=req.query.usuario;
        const clave= req.query.clave;
        
        if (usuario.length > 0 && clave.length > 0)
        {
            const confirmarUsuario= async ()=>
            {
                try {
                    const usuarioEncontrado=await usuariosModelo.findOne({raw:true,where:{nombreUsuario:usuario,clave:clave}});
                    return usuarioEncontrado;
                } catch (error) {
                    console.log(error);
                }
            }
            const resultado= await confirmarUsuario();
            console.log("RESULTADO="+resultado);
            if (resultado!=null)
            {
                
            
                res.json({validated:'true'});
                res.status(200);
            }
            else
            {
                res.json({validated:'false'});
                res.status(400);

            }
        }
        else
        {
            res.json({
                validated:'false'
                ,message:"debe rellenar las credenciales"
            });
            res.status(400);
        }

            
        
}


/*recuperar cuenta*/

export const recoverAccount = async (req,res)=>
{
    /*capturamos el correo */
    const correo= req.query.correo;
    /*validamos que este sea mayor que 0 para confirmar que no nos estan enviando el campo vacio*/
    if(correo.length > 0)
    {
        /*Si es mayor a 0 valida en la base de datos que haya un registro de esa tabla y retornamos el resultado*/
        const account= await usuariosModelo.findOne({where:{correo:correo}});
        if (account == null)
        {
            res.json({validated:false});
            res.status(400)
        }
        else// en este caso particular tenemos que queremos generar un codigo para entonces este codigo almacenarlo en nustra base de datos e enviarlo al correo del cliente
        {

            const id= v4();
            (async ()=>{
               return await usuariosModelo.update({ tokenRecoveryPass:id,hourTokenRecoveryPass:Date.now()},{where:{correo:correo}})
            })();

            (async ()=>{
                if (await isOnline())
                    {
                        ( async ()=>
                        {
                            try
                            {
                            const resend = new Resend('re_E77YBf3d_Egpstnvr3FP1MEHfN8yzygk8');
                            const enviado= await resend.emails
                            .send({
                                from: 'onboarding@resend.dev',
                                to: correo,
                                subject: 'Validacion de Cuenta',
                                html: `<p>Se ha creado exitosamente una nueva cuenta en Imperio W <br>
                                Para validar la cuenta acceda al siguiente link <br>${url}recovery/${id}</p>`,
                            })
                            res.status(200).json({validated:true})
                        }catch(error)
                        {
                            res.status(400).json({validated:false,'error':error})
        
                        }
        
                        }
                        
                    )()
                    }
                    else
                    {
                        res.status(400).json({validated:false,message:'error de conexion'})
                    }
            })()


    }
        
    }
    else
    {
        res.json({validated:'false',message:'debe rellenar las credenciales'});
        res.status(400);
    }
    
    
}









