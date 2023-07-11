import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"
import { auth } from "../services/auth.js"
import { convertContractDate, convertDate } from '../services/dateConversions.js'



export const editContracts = async(req, res)=>{
    let statusCode = 400
    try{
        
        const user = await auth(req)    
        const uploadedFile = req.file    
        const { company, signedAt, expiresAt, contractName, contractUpdates } = req.body

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

        if(convertDate(signedAt) !== convertContractDate(contract.signedAt)){
            updateFields.push(`Alteração na data da assinatura no contrato da empresa ${company} de ${convertContractDate(contract.signedAt)} para ${convertDate(signedAt)}`)
        }

        if(convertDate(expiresAt) !== convertContractDate(contract.expiresAt)){
            updateFields.push(`Alteração na data da expiração no contrato da empresa ${company} de ${convertContractDate(contract.expiresAt)} para ${convertDate(expiresAt)}`)
        }

        if(uploadedFile && contractUpdates === ''){
            statusCode = 403
            throw new Error('Especifique as mudanças do novo contrato')
        }else{
            updateFields.push(contractUpdates)
        }


        await con('promo_prime_contract').update({
            company,
            signedAt,
            expiresAt,
            contractName
        }).where({
            id: req.params.id
        })
        
        let messageToSend = 'Atualização de contrato realizada com sucesso'
        
        if(updateFields.length > 0){
            await con('promo_prime_tasks').insert({
                id: new Authentication().generateId(),
                user: user.name,
                email: user.email,
                moment: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                task: updateFields.join('.\n')
            })
        }else{
            messageToSend = 'Nenhuma alteração efetuada'
        }

        res.status(200).send(messageToSend)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}