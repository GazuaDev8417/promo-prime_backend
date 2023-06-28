import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"
import { auth } from "../services/auth.js"
import { convertContractDate, convertDate } from '../services/dateConversions.js'



export const editContracts = async(req, res)=>{
    let statusCode = 400
    try{
        
        const user = await auth(req)

        const { company, signedAt, expiresAt } = req.body
        if(!company || !signedAt || !expiresAt){
            statusCode = 403
            throw new Error('Preencha os campos')
        }
        
        
        const [contract] = await con('promo_prime_contract').where({
            id: req.params.id
        })

        
        var updateFields = []

        if(company !== contract.company){
            updateFields.push(`Alteração no nome da empresa de ${contract.company} para ${company}`)
        }

        if(signedAt !== contract.signedAt){
            updateFields.push(`Alteração na data da assinatura de ${convertContractDate(contract.signedAt)} para ${convertDate(signedAt)}`)
        }

        if(expiresAt !== contract.expiresAt){
            updateFields.push(`Alteração na data da expiração de ${convertContractDate(contract.expiresAt)} para ${convertDate(expiresAt)}`)
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
            user: user.name,
            email: user.email,
            moment: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            task: updateFields.join('.\n')
        })
        

        res.status(200).send('Atualização de contrato realizada com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}