import mongoose from "mongoose";

const dbUrl = process.env.DB_URL
const schema = mongoose.Schema
const objectId = schema.ObjectId

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not set");
}
mongoose.connect(dbUrl)



const userSchema = new schema({
  firstName:{type:String, require:true},
  lastName:{type:String, require:true},
  userName:{type:String, require:true},
  password:String

})


const User = mongoose.model('User', userSchema)


export {User}
