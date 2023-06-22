import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const deleteFile = async(req, res)=>{
    let statusCode = 400
    try{

        const user = await auth(req)

        const [contract] = await con('promo_prime_contract').where({
            user_id: user.id
        })

        if(!contract){
            statusCode = 403
            throw new Error('Você não está autorizado à excluir esse registro de contrato')
        }


        await con('promo_prime_contract').del().where({
            id: req.params.id
        })


        res.status(200).send('Registro de contrato deletado')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}