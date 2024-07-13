import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { storage } from './multerConfig.js'


const app = express()
const port = process.env.PORT || 3003

app.use(express.json())
app.use(cors())

const upload = multer({ storage: storage })
//const insertContractUpload = multer({ storage: multer.memoryStorage() })


app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})

import { insertUser } from './endpoints/insertUser.js'
//import { insertContract } from './endpoints/insertContract.js'
import { login } from './endpoints/login.js'
import { uploadFiles } from './endpoints/uploadFiles.js'

import { getUsers } from './endpoints/getUsers.js'
import { getUserById } from './endpoints/getUserById.js'
import { getContracts } from './endpoints/getContracts.js'
import { getTasks } from './endpoints/getTasks.js'

import { editContracts } from './endpoints/editContracts.js'

import { deleteFile } from './endpoints/deleteFile.js'

// ==================MIDDLEWARE FOR SENDING FILE==========================
app.use('/files', express.static('src/uploads'))
app.post('/contractFile',  upload.single('contract'), uploadFiles)
// ==========================END OF MIDDLEWARE AND ENDPOINT======================
app.post('/signup', insertUser)
app.post('/login', login)
//app.post('/contract', insertContractUpload.single('contract'), insertContract)

app.get('/users', getUsers)
app.get('/user/:id', getUserById)
app.get('/contracts', getContracts)
app.get('/tasks', getTasks)

app.put('/contract/:id', upload.single('contract'), editContracts)

app.delete('/contract/:id', deleteFile)


