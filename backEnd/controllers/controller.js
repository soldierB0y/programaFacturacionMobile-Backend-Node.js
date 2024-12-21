
import {clientesModelo, usuariosModelo} from '../model/model.js';
import { stringify, v4 } from 'uuid';

import { json, where } from 'sequelize';
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

        let usuario=null;
        let  clave= null;

        try
        {
             usuario=req.query.usuario;
             clave= req.query.clave;
        }
        catch{
             usuario=null;
             clave=null;
        }
        
        if (usuario !=null && clave !=null)
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
                
            
                res.json({validated:true});
                res.status(200);
            }
            else
            {
                res.json({validated:false});
                res.status(400);

            }
        }
        else
        {
            res.json({
                validated:false
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
        res.json({validated:false,message:'debe rellenar las credenciales'});
        res.status(400);
    }
    
    
}


/*Clientes*/

//cargarClientes
export const getClientes= async(req,res)=>{
    try {
        const clientes = await clientesModelo.findAll()
        res.status(200).json(clientes)
        
    } catch (error) {
        console.log('error'+error)
    }

    
    

}
//agregarCliente
export const addClientes= async(req,res)=>{

    console.log(req.body)
    
    const nombre = req.body.nombre || null;
    console.log('NOMBRE:'+nombre)
    const tipoCliente= req.body.tipoCliente || null;
    const sexo= req.body.sexo || null;
    const empresa= req.body.empresa || null;
    const direccion= req.body.direccion || null;
    const balance= req.body.balance || null;
    const deuda= req.body.fechaCreacion || null;
    const fechaCreacion= Date.now();
    const fechaModifacion= Date.now();
    const correo= req.body.correo;
    const montoTotalCompras= req.body.montoTotalCompras || null;
    const descripcionModificacion= req.body.descripcionModificacion || null;
    
    if (nombre != null)
    {
        try {
            const clientes= await clientesModelo.create({
                tipoCliente:tipoCliente,
                nombreRepresentante:nombre,
                sexo:sexo,
                empresa:empresa,
                direccion:direccion,
                balance:balance,
                deuda:deuda,
                fechaCreacion:fechaCreacion,
                fechaModifacion:fechaModifacion,
                correo:correo,
                montoTotalCompras:montoTotalCompras,
                descripcionModificacion:descripcionModificacion
            })



            if (clientes !=0 || clientes != null || clientes !=undefined)
            {
                res.status(200).json(
                    {
                        "message":"Agregado exitosamente!"
                    }
                )
            }
            else
            {
                res.status(400).json(
                    {
                        'message':'No se ha podido agregar el cliente'
                    }
                )
            }

        } catch (error) {
            res.status(400).json(
                {
                    "Error":"Error al tratar de realizar el registro"+error
                }
            )
        }

        
    }
    else
    {
        res.status(400).json({"Error":"Error al tratar de realizar el registro. Proporcione un nombre"});
    }
    
}

//eliminar
export const eliminarClientes= async(req,res)=>{
    const IDCliente= req.body.IDCliente || null;

    if (IDCliente==null)
    {
        res.status(400).json({'Error':' Fallo al intentar localizar cliente solicitado.'})
    }
    else
    {
        try {
            
        // esta funcion aparentemente retorna o un 0 o un 1 dependiendo cual sea el resultado
          const resultado= await  clientesModelo.destroy({
                where:{
                    IDCliente:IDCliente
                }
            })
            if (resultado==1)
            {
                res.status(200).json({'message':'Cliente eliminado exitosamente'});
            }
            else{
                res.status(400).json({'message':'No se ha encontrado el cliente'})
            }


        } catch (error) {

            console.log(error);   
            res.status(400).json({'Error':'Error con la peticion'})
        }

    }
}

//modificar
export const modificarClientes= async(req,res)=>{

    const IDCliente= req.body.IDCliente || null;
    const nombre = req.body.nombre || null;
    const tipoCliente= req.body.tipoCliente || null;
    const sexo= req.body.sexo || null;
    const empresa= req.body.empresa || null;
    const direccion= req.body.direccion || null;
    const balance= req.body.balance || null;
    const deuda= req.body.fechaCreacion || null;
    const fechaModifacion= Date.now();
    const correo= req.body.correo;
    const montoTotalCompras= req.body.montoTotalCompras || null;
    const descripcionModificacion= req.body.descripcionModificacion || null;

    if (IDCliente ==null)
    {
        res.status(400).json({'Error':'Error con la peticion'})   
    }
    else
    {
        try {
            const resultado= await clientesModelo.update({
                nombreRepresentante: nombre!=null?nombre:undefined,
                tipoCliente:tipoCliente!=null?tipoCliente:undefined,
                sexo:sexo!=null?sexo:undefined,
                empresa:empresa!=null?empresa:undefined,
                direccion:direccion!=null?direccion:undefined,
                balance:balance!=null?balance:undefined,
                deuda:deuda!=null?deuda:undefined,
                fechaModifacion:fechaModifacion!=null?fechaModifacion:undefined,
                correo:correo!=null?correo:undefined,
                montoTotalCompras:montoTotalCompras!=null?montoTotalCompras:undefined,
                descripcionModificacion:descripcionModificacion!=null?descripcionModificacion:undefined
            },{
                where:{
                    IDCliente:IDCliente
                }
            })
            
            if(resultado ==1)
            {
                res.status(200).json({'message':'actualizado exitosamente'})
            }
            else
            {
                res.status(400).json({'message':'no se ha encontrado al cliente'});
            }

            
        } catch (error) {
            res.status(400).json({'Error':'Error con la peticion'})   
        }
    }
    
}





