import con from "../connection/connection.js"
import { auth } from "../services/auth.js"



export const editContracts = async(req, res)=>{
    let statusCode = 400
    try{
        
        const { company, signedAt, expiresAt } = req.body

        if(!company || !signedAt || !expiresAt){
            statusCode = 403
            throw new Error('Preencha os campos')
        }


        await con('promo_prime_users').update({
            company,
            signedAt,
            expiresAt
        }).where({
            id: req.params.id
        })
        

        res.status(200).send('Atualização de contrato realizada com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}