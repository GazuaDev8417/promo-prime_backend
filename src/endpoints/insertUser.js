import con from '../connection/connection.js'
import Authentication from '../services/Authentication.js'


export const insertUser = async(req, res)=>{
    let statusCode = 400
    try{

        const { username, email, password, confirmPass } = req.body
        const auth = new Authentication()

        if(!username || !email || !password || !confirmPass){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        if(password.length < 6){
            statusCode = 403
            throw new Error('Sua senha deve ter um mínimo de 6 caractéres')
        }

        if(password !== confirmPass){
            statusCode = 403
            throw new Error('As senhas não correspodem')
        }

        const [user] = await con('promo_prime_users').where({
            email
        })

        if(user){
            statusCode = 403
            throw new Error('Usuário já cadastrado')
        }
        
        const id = auth.generateId()
        const token = auth.token(id)

        await con('promo_prime_users').insert({
            id,
            name: username,
            email,
            password: auth.hash(password)
        })

        res.status(201).send(token)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}