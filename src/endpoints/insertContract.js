import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"
import { auth } from "../services/auth.js"



export const insertContract = async(req, res)=>{
    let statusCode = 400
    try{

        const id = new Authentication().generateId()
        await auth(req)
        const { company, owner, signedAt, contractName } = req.body

        if(!company || !owner || !signedAt || !contractName){
            statusCode = 403
            throw new Error('Preencha os campos')
        }

        const [existedCP] = await con('promo_prime_contract').where({
            company
        })

        if(existedCP){
            statusCode = 403
            throw new Error('Empresa já foi cadastrada')
        }


        await con('promo_prime_contract').insert({
            id,
            company,
            owner,
            signedAt,
            contractName
        })

        res.status(200).send('Contrato registrado com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}