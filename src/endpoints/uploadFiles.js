import con from '../connection/connection.js'

export const uploadFiles = async(req, res)=>{
    let statusCode = 400
    try{
        
        const uploadedFile = req.file
        const fileData = uploadedFile.buffer
    
        if(!uploadedFile){
            statusCode = 403
            throw new Error('Primeiro selecione o arquivo')
        }


        await con('promo_prime_contract').update({
            contract: fileData
        }).where({
            company: req.params.name
        })

        res.status(200).send('Arquivo enviado com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message)
    }
}