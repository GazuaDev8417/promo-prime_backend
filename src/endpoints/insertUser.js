import con from '../connection/connection.js'
import Authentication from '../services/Authentication.js'


export const insertUser = async(req, res)=>{
    let statusCode = 400
    try{

        const { username, email, password, confirmPass, role } = req.body
        const auth = new Authentication()
        
        if(!username || !email || !password || !confirmPass || !role){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        if(role === `option1`){
            statusCode = 401
            throw new Error('Escolha um tipo de usuário')
        }

        if(password.length < 6){
            statusCode = 403
            throw new Error('Sua senha deve ter um mínimo de 6 caractéres')
        }

        if(password !== confirmPass){
            statusCode = 403
            throw new Error('As senhas não correspodem')
        }

        const [userADM] = await con('promo_prime_users').where({
            user: `ADM`
        })

        if(userADM && role === `ADM`){
            statusCode = 403
            throw new Error('Já existe um usuário ADM')
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
            password: auth.hash(password),
            user: role
        })

        res.status(201).send({token, role})
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}