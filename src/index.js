import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { storage } from './multerConfig.js'


const app = express()
const port = process.env.PORT || 3003


app.use(express.json())
app.use(cors())
const upload = multer({ storage: storage })
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})

import { insertUser } from './endpoints/insertUser.js'
import { insertContract } from './endpoints/insertContract.js'
import { login } from './endpoints/login.js'
import { uploadFiles } from './endpoints/uploadFiles.js'

import { getUsers } from './endpoints/getUsers.js'
import { getContracts } from './endpoints/getContracts.js'

import { deleteFile } from './endpoints/deleteFile.js'

// ==================MIDDLEWARE FOR SENDING FILE==========================
app.use('/files', express.static('src/uploads'))
app.post('/contractFile',  upload.single('contract'), uploadFiles)
// ==========================END OF MIDDLEWARE AND ENDPOINT======================
app.post('/signup', insertUser)
app.post('/login', login)
app.post('/contract', insertContract)

app.get('/users', getUsers)
app.get('/contract', getContracts)

app.delete('/contract/:id', deleteFile)


