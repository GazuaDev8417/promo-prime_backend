import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const getUserById = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)
        const id = req.params.id

        const [user] = await con.raw(`
            SELECT id, name, email FROM promo_prime_users  WHERE id = '${id}'
        `)
        
        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado') 
        }

        res.status(200).send(user)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
