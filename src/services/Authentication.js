import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4} from 'uuid'
import { config } from 'dotenv'

config()


export default class Authentication{
    generateId = ()=>{
        return uuidv4()
    }

    hash = (text)=>{
        const rounds = 12
        const salt = bcrypt.genSaltSync(rounds)
        const cypher = bcrypt.hashSync(text, salt)

        return cypher
    }

    compare = (text, hash)=>{
        return bcrypt.compareSync(text, hash)
    }

    token = (payload)=>{
        return jwt.sign(
            { payload },
            process.env.JWT_KEY,
            { expiresIn: '1h'}
        )
    }

    tokenData = (token)=>{
        return jwt.verify(
            token,
            process.env.JWT_KEY
        )
    }
}