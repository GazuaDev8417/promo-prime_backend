export const uploadFiles = async(req, res)=>{
    let statusCode = 400
    try{
        
        const uploadedFile = req.file
    
        if(!uploadedFile){
            statusCode = 403
            throw new Error('Primeiro selecione o arquivo')
        }

        res.status(200).send('Arquivo enviado com sucesso')
    }catch(e){
        res.status(statusCode).send(e.message)
    }
}