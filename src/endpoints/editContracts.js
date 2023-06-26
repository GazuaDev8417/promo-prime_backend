import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"
import { auth } from "../services/auth.js"



export const editContracts = async(req, res)=>{
    let statusCode = 400
    try{
        
        const user = await auth(req)

        const { company, signedAt, expiresAt } = req.body

        if(!company || !signedAt || !expiresAt){
            statusCode = 403
            throw new Error('Preencha os campos')
        }


        await con('promo_prime_contract').update({
            company,
            signedAt,
            expiresAt
        }).where({
            id: req.params.id
        })

        await con('promo_prime_tasks').insert({
            id: new Authentication().generateId(),
            task: `Usuário ${user.name} portador do email ${user.email} realizou alterações no contrato da empresa ${company} em ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`,
            user_id: user.id
        })
        

        res.status(200).send('Atualização de contrato realizada com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}