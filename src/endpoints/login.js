import con from "../connection/connection.js"
import Authentication from "../services/Authentication.js"


export const login = async(req, res)=>{
    let statusCode = 400
    try{

        const auth = new Authentication()
        const { email, password } = req.body

        if(!email || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        const [user] = await con('promo_prime_users').where({
            email
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }

        const compare = auth.compare(password, user.password)
        const token = auth.token(user.id)
        
        if(!compare){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        res.status(200).send({token, user: user.user})
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}
