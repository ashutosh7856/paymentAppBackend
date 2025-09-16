import zod, { string } from 'zod'

export const signupSchema = zod.object({
    userName:string(),
    firstName:string(),
    lastName:string(),
    password:string().min(8)
})

export const signinSchema = zod.object({
    userName:string(),
    password:string().min(2)
})

export const updateUserSchema = zod.object({
    password:string(),
    firstName:string().optional(),
    lastName:string().optional(),
    userName:string().optional()
})

export type  signUpType = zod.infer<typeof signupSchema>
export type signInType = zod.infer<typeof signinSchema>