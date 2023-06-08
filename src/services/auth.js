import con from "../connection/connection.js"
import Authentication from "./Authentication.js"



export const auth = async(req)=>{
    let statusCode = 400 
    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token)
    const [user] = await con('promo_prime_users').where({
        id: tokenData.payload
    })
    
    if(!user){
        statusCode = 404
        throw new Error('Usuário não encontrado')
    }

    return user
}