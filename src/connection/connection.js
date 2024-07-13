import knex from 'knex'
import { config } from 'dotenv'

config()


const con = knex({
    client: 'pg',
    connection: process.env.PROMO_PRIME_DB
})

con.raw('SELECT 1 + 1 AS result').then(()=>{
    console.log('Connected to database')
}).catch(e=>{
    console.log(`Failed to connect to database: ${e}`)
})

export default con