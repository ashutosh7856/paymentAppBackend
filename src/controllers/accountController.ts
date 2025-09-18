import mongoose, { mongo } from "mongoose"
import { Account } from "../models/db.js"
import type { Request, Response } from "express"

export async function transferFunds(req:Request, res:Response){
    const session = await  mongoose.startSession()

    try {
        session.startTransaction()
        const {amount, sendTo} = req.body

        const account = await Account.findOne({userId:req.userId}).session(session)
        const updateAmount = Math.round(Number(amount)*100)

        if(!account || account.amount < updateAmount){
            await session.abortTransaction()
            return res.json({
                message:'Insufficient Balance.'
            })
        }

        const toAccount = await Account.findOne({userId:sendTo}).session(session)

        if(!toAccount){
            await session.abortTransaction()
            return res.json({
                message:"User doesn't exist"
            })
        }

        

        await Account.updateOne({userId:req.userId},{$inc:{amount:-updateAmount}}).session(session)
        await Account.updateOne({userId:sendTo}, {$inc:{amount:updateAmount}}).session(session)

        await session.commitTransaction()

        res.json({
            message:'Transfer Successful',
            amount:(updateAmount/100).toFixed(2)
        })
    } catch (error) {
        await session.abortTransaction()
        res.status(500).json({
            message: 'Transfer failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        })
    } finally {
        session.endSession()
    }
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