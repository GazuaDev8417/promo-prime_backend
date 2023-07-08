import express from 'express'
import cors from 'cors'
import multer from 'multer'
//import { storage } from './multerConfig.js'


const app = express()
const port = process.env.PORT || 3003


app.use(express.json())
app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage })
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})

import { insertUser } from './endpoints/insertUser.js'
import { login } from './endpoints/login.js'
import { uploadFiles } from './endpoints/uploadFiles.js'

import { getUsers } from './endpoints/getUsers.js'
import { getUserById } from './endpoints/getUserById.js'
import { getContracts } from './endpoints/getContracts.js'
import { getTasks } from './endpoints/getTasks.js'
import { getPdfFile } from './endpoints/getPdfFile.js'

import { editContracts } from './endpoints/editContracts.js'

import { deleteFile } from './endpoints/deleteFile.js'

// ==================MIDDLEWARE FOR SENDING FILE==========================
app.use('/files/:id', getPdfFile)
app.post('/contractFile',  upload.single('contract'), uploadFiles)
// ==========================END OF MIDDLEWARE AND ENDPOINT======================
app.post('/signup', insertUser)
app.post('/login', login)

app.get('/users', getUsers)
app.get('/user/:id', getUserById)
app.get('/contract', getContracts)
app.get('/tasks', getTasks)

app.put('/contract/:id', editContracts)

app.delete('/contract/:id', deleteFile)


