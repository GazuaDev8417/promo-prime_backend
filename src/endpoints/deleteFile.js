import con from '../connection/connection.js'
import { auth } from '../services/auth.js'
import fs from 'fs'
import { join } from 'path'



export const deleteFile = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)
        const [contract] = await con('promo_prime_contract').where({
            id: req.params.id
        })
        
                
        const filePath = join(`file:///home/gazua/Documentos/Algorithm/promo_project/promo-prime_backend/src/uploads/${contract.contractName}`)
        
        if(!fs.existsSync(filePath)){
            statusCode = 404
            throw new Error('Arquivo não encontrado')
        }else{
            await con('promo_prime_contract').del().where({
                id: req.params.id
            })

            fs.unlink(filePath, (err)=>{
                if(err){
                    statusCode = 500
                    throw new Error('Erro ao deletar arquivo')
                }
            })             
        }



        res.status(200).send('Registro de contrato deletado')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}