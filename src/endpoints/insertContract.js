import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"
import { auth } from "../services/auth.js"



export const insertContract = async(req, res)=>{
    let statusCode = 400
    try{

        const id = new Authentication().generateId()
        const user = await auth(req)
        const { company, signedAt, expiresAt, contractName } = req.body

        if(!company || !signedAt || !expiresAt || !contractName){
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
            signedAt,
            expiresAt,
            contractName,
            user_id: user.id
        })

        await con('promo_prime_tasks').insert({
            id: new Authentication().generateId(),
            task: `Usuário ${user.name} portador do email ${user.email} adicionou o contrato da empresa ${company} em ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`,
            user_id: user.id
        })

        res.status(200).send('Contrato registrado com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}