import type {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'



export async function authMiddleware(req:Request, res:Response, next:NextFunction){
    const authHeader= req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message:'could not find a token'
        })
    }

    if(!JWT_SECRET)  return res.status(500).json({message:'secret not found'})

    const verfiedId = jwt.verify(authHeader, JWT_SECRET)

    if (typeof verfiedId === 'string') {
        return res.status(403).json({ message: 'Invalid token format' })
    }

    req.userId = (verfiedId as any).userId

    next()

}