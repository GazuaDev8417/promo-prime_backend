import { auth } from "../services/auth.js"
import path from 'path'
import fs from 'fs'


export const getUploadedFile = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)
        const filename = req.params.filename
        const filePath = path.join('/home/gazua/Documentos/Algorithm/promo_prime/server/src/uploads', filename)
        

        fs.existsSync(filePath, err=>{
            if(err){
                statusCode = 404
                throw new Error('Arquivo não encontrado')
            }else{
                res.sendFile(filePath)
            }
        })

    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}