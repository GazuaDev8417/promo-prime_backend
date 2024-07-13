import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"
import { auth } from "../services/auth.js"
import { convertContractDate, convertDate } from '../services/dateConversions.js'



export const editContracts = async(req, res)=>{
    let statusCode = 400
    try{
        
        const user = await auth(req)    
        const uploadedFile = req.file    
        const { company, signedat, expiresat, contractName, contractUpdates } = req.body

        if(!company || !signedat || !expiresat){
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

        if(convertDate(signedat) !== convertContractDate(contract.signedat)){
            updateFields.push(`Alteração na data da assinatura no contrato da empresa ${company} de ${convertContractDate(contract.signedat)} para ${convertDate(signedat)}`)
        }

        if(convertDate(expiresat) !== convertContractDate(contract.expiresat)){
            updateFields.push(`Alteração na data da expiração no contrato da empresa ${company} de ${convertContractDate(contract.expiresat)} para ${convertDate(expiresat)}`)
        }

        if(uploadedFile){
            if(contractUpdates === ''){
                statusCode = 403
                throw new Error('Especifique as mudanças do contrato')
            }else{
                updateFields.push(contractUpdates)
            }
        }        


        await con('promo_prime_contract').update({
            company,
            signedat,
            expiresat,
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
                task: updateFields.join('.\n'),
                user_id: user.id
            })
        }else{
            messageToSend = 'Nenhuma alteração efetuada'
        }

        res.status(200).send(messageToSend)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}