import express, { application } from 'express'
import cors from 'cors'
import multer from 'multer'
const app = express()
const port = process.env.PORT || 3003


app.use(express.json())
app.use(cors())
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})

import { insertUser } from './endpoints/insertUser.js'
import { insertContract } from './endpoints/insertContract.js'
import { login } from './endpoints/login.js'

import { getUsers } from './endpoints/getUsers.js'
import { getContracts } from './endpoints/getContracts.js'
import { getUploadedFile } from './endpoints/getUploadedFile.js'

app.post('/signup', insertUser)
// ==================MIDDLEWARE FOR SENDING FILE==========================
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
app.post('/contractFile',  upload.single('contract'), (req, res)=>{
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
})
// ==========================END OF MIDDLEWARE AND ENDPOINT======================
app.post('/contract', insertContract)
app.post('/login', login)

app.get('/users', getUsers)
app.get('/contract', getContracts)
app.get('/display-file/:filename', getUploadedFile)


