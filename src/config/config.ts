import dotenv from 'dotenv'

dotenv.config()

let JWT_SECRET: string | undefined
let dbUrl: string | undefined;

try{
    JWT_SECRET = process.env.JWT_SECRET
    dbUrl = process.env.DB_URL
}catch(err){
    console.error(err)
    console.log('env is not set')
}
if(!JWT_SECRET){
    console.error('No jwt found')
}
export {
    JWT_SECRET, 
    dbUrl
}