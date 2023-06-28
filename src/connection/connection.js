import knex from 'knex'
import { config } from 'dotenv'

config()


/* const con = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
    }
}) */

const con = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'gazua',
        password: 'alfadb',
        database: 'promo_prime'
    }
})

con.raw('SELECT 1 + 1 AS result').then(()=>{
    console.log('Connected to database')
}).catch(e=>{
    console.log(`Failed to connect to database: ${e}`)
})

export default con