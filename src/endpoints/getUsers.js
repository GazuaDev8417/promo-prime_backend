import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const getUsers = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)

        const users = await con.raw(`
            SELECT id, name, email FROM promo_prime_users
        `)
        
        if(users.length === 0){
            statusCode = 404
            throw new Error('Lista de usuários vazia') 
        }

        res.status(200).send(users)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
