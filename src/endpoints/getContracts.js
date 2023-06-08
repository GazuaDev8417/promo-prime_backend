import con from "../connection/connection.js"
import { auth } from "../services/auth.js"



export const getContracts = async(req, res)=>{
    let statusCocde = 400
    try{
        
        await auth(req)
        const contracts = await con('promo_prime_contract') 

        res.status(200).send(contracts)
    }catch(e){
        res.status(statusCocde).send(e.message || e.sqlMessage)
    }
}