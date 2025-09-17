import mongoose, { mongo } from "mongoose"
import { Account } from "../models/db.js"
import type { Request, Response } from "express"

export async function transferFunds(req:Request, res:Response){
    const session = await  mongoose.startSession()

    session.startTransaction()
    const {amount, sendTo} = req.body

    const account = await Account.findOne({userId:req.userId}).session(session)

    if(!account || account.amount < amount){
        await session.abortTransaction()
        return res.json({
            message:'Insufficient Balance.'
        })
    }


    const toAccount = await Account.findOne({userId:sendTo}).session(session)

    if(!toAccount){
        return res.json({
            message:"User doesn't exist"
        })
    }

    const updateAmount = Math.round(Number(amount)*100)

    await Account.updateOne({userId:req.userId},{$inc:{amount:-updateAmount}}).session(session)
    await Account.updateOne({userID:sendTo}, {$inc:{amount:updateAmount}}).session(session)

    session.commitTransaction()

    res.json({
        message:'Transfer Successful',

        amount:(updateAmount/100).toFixed(2)
    })
}



export async function viewFunds(req:Request, res:Response){

    const account = await Account.findOne({userId:req.userId})

    if(!account){
        return res.json({
            message:'No account Found'
        })
    }

    res.json({
        amount:(account.amount/100).toFixed(2)
    })
}