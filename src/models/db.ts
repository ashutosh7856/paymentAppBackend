import mongoose from "mongoose";

const dbUrl = process.env.DB_URL
const schema = mongoose.Schema
const objectId = schema.ObjectId

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not set");
}
mongoose.connect(dbUrl)



const userSchema = new schema({
  firstName: { type: String, required: true, trim:true },
  lastName: { type: String, required: true, trim:true },
  userName: { type: String, required: true, unique: true, trim:true },
  password: { type: String, required: true, trim:true }
})


const accountSchema = new schema({
  userId:{type:objectId, ref:'User', required:true},
  amount:{type:Number, required: true}
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)


export {
  User,
  Account
}
