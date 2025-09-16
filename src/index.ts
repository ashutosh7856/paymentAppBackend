import express from "express"
import mainRouter from './routes/index.js'
import dotenv from "dotenv"
dotenv.config()
const app = express()
const PORT = 3000


app.use('/api/v1', mainRouter)

app.use(express.json())


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})