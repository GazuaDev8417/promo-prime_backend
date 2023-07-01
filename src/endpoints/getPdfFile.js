import con from '../connection/connection.js'
import { auth } from '../services/auth.js'



export const getPdfFile = async(req, res)=>{
    let statusCode = 400
    try{

        await auth(req)

        const [pdfFile] = await con('promo_prime_contract').where({
            id: req.params.id
        })

        res.setHeader('Content-Type', 'application/pdf')

        
        res.status(200).send(pdfFile.contract)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
