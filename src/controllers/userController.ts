import type {Response, Request} from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {JWT_SECRET} from '../config/config.js'
import { signupSchema, signinSchema, type signInType, type signUpType, updateUserSchema } from "../schemas/userSchema.js"
import { User } from "../models/db.js"


export async function createUser(req:Request, res:Response){
    const validation = signupSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(411).json({
            message:'Incorrect Input',
            errors: validation.error.issues
        })
    }

    const userData = validation.data


    const user = await User.findOne({
        userName: userData.userName
    })

    if(user?._id){
        return res.status(411).json({
            message:'username already exists.'
        })
    }

  
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

    const dbUser = await User.create({
        ...userData,
        password: hashedPassword
    })

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
    const validation = signinSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(411).json({
            message:'Invalid Input',
            errors: validation.error.issues
        })
    }

    const { userName, password } = validation.data

    const user = await User.findOne({
        userName: userName
    })

    if(!user?._id || !user.password){
        return res.status(401).json({
            message:"No user found with the username"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
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



export async function findUsers(req:Request, res:Response){
    const keyword = req.params.keyword
    if(!keyword) return res.json({message:'no param to find'})
        
    const users = await User.find({
        $or:[
            {firstName: new RegExp(keyword, "i")},
            {lastName: new RegExp(keyword, "i")}
        ]
    })

   if(!users){
    return res.json({
        message:'No users found'
    })
   }

   res.json({
    message:'Users found',
    users
   })
}