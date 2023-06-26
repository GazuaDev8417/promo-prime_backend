import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const getUserById = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)

        const [user] = await con.raw(`
            SELECT id, name, email FROM promo_prime_users  WHERE id = '${req.params.id}'
        `)
        
        if(!user[0]){
            statusCode = 404
            throw new Error('Usuário não encontrado') 
        }

        res.status(200).send(user[0])
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
