import con from '../connection/connection.js'
import { auth } from '../services/auth.js'
import Authentication from '../services/Authentication.js'



export const uploadFiles = async(req, res)=>{
    let statusCode = 400
    try{
        
        const user = await auth(req)
        const uploadedFile = req.file
        const { company, signedat, expiresat, contractname } = req.body

        if(!company || !signedat || !expiresat || !contractname){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        
        const [existedCP] = await con('promo_prime_contract').where({
            company
        })

        if(existedCP){
            statusCode = 403
            throw new Error('Empresa já foi cadastrada')
        }
        
                
        if(!uploadedFile){
            statusCode = 403
            throw new Error('Primeiro selecione o arquivo')
        }
        

        await con('promo_prime_contract').insert({
            id: new Authentication().generateId(),
            company,
            signedat,
            expiresat,
            contractname,
            user_id: user.id,
            //contract: uploadedFile
        })

        await con('promo_prime_tasks').insert({
            id: new Authentication().generateId(),
            user: user.name,
            email: user.email,
            moment: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
            task: `Adicionou o contrato da empresa ${company}`,
            user_id: user.id
        })
        

        res.status(200).send('Arquivo enviado com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message)
    }
}