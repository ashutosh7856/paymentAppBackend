import express from "express"
import mainRouter from './routes/index.js'
import dotenv from "dotenv"
import cors from 'cors'
dotenv.config()
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)




app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})