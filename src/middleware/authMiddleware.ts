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

    const token = authHeader.split(' ',)[1]
    try{


        const decoded = jwt.verify(token as string, JWT_SECRET as string)

        if((decoded as any).userId){

            req.userId = (decoded as any).userId
            next()
        }else{
            res.status(403).json({message:'Filed to decode'})
        }



    }catch(err){
        res.status(403).json({message:'userId does not match'})
    }


}