import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const getContractById = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)

        const [contract] = await con('promo_prime_contract').where({
            id: req.params.id
        })
        
        if(!contract){
            statusCode = 404
            throw new Error('Contrato não encontrado')
        }


        res.status(200).send(contract)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
