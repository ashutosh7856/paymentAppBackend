import type {Response, Request} from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {JWT_SECRET} from '../config/config.js'
import { signupSchema, signinSchema, type signInType, type signUpType, updateUserSchema } from "../schemas/userSchema.js"
import { User } from "../models/db.js"


export async function createUser(req:Request, res:Response){
    const {success} = signupSchema.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:'Incorrect Input'
        })
    }


    const user = await User.findOne({
        userName:req.body.userName
    })

    if(user?._id){
        return res.status(411).json({
            message:'username already exists.'
        })
    }


    const dbUser = await User.create(
        req.body
    )

    const userId = dbUser._id

    if(!JWT_SECRET) return res.status(500).json({message:'secret not found'})

    const token = jwt.sign({
        userId
    }, JWT_SECRET)



    res.status(200).json({
        message:'User Created Successfully',
        token:token
    })


    console.log(user)
}


export async function signIn(req:Request, res:Response){
    const {success} = signinSchema.safeParse(req.body)

    if(!success){
        return res.json({
            message:'Invalid Input'
        })
    }

    const user = await User.findOne({
        userName:req.body.userName
    })

    if(!user?._id){
        return res.json({
            message:"No user found with the username"
        })
    }


    if (!JWT_SECRET) return res.status(500).json({message:'secret not found'})

    const userId  = user._id

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        message:'Logged in succesfully',
        token:token
    })

}

export async function updateUser(req:Request, res:Response){
    const {success} = updateUserSchema.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:'Invalid input'
        })
    }

    try{
        await  User.updateOne(req.body, {
            _id:req.userId
        })
    }catch(err){
        console.error(err)
        res.status(402).json({
            messsage:'failed to update user'
        })
    }

    res.json({
        message:'User updated successfully.'
    })
}
