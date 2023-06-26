import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const getTasks = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)

        const tasks = await con('promo_prime_tasks')
        
        if(tasks.length === 0){
            statusCode = 404
            throw new Error('Lista de usuários vazia') 
        }

        res.status(200).send(tasks)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
