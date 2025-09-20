import { Router } from "express";
import userRouter from './userRouter.js'
import accountRouter from "./accountRouter.js"


const router = Router()


router.use('/user', userRouter)
router.use('/account', accountRouter)
router.use('/chat')



export default router