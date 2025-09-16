import { z } from 'zod'

export const signupSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const signinSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const updateUserSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userName: z.string().optional()
})

export type signUpType = z.infer<typeof signupSchema>
export type signInType = z.infer<typeof signinSchema>