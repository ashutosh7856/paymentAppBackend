import mongoose from "mongoose";

const dbUrl = process.env.DB_URL
const schema = mongoose.Schema
const objectId = schema.ObjectId

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not set");
}
mongoose.connect(dbUrl)



const userSchema = new schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})


const User = mongoose.model('User', userSchema)


export {User}
