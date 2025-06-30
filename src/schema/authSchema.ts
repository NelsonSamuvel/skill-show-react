import { z } from "zod";

export const authSchema = z.object({
    email: z.string().min(1, "Email is required").email({ message: "Invalid Email Id" }),
    password: z.string().min(1, "Password is required").min(6, "Password should have atleast 6 characters")
})

export type AuthSchemaType = z.infer<typeof authSchema>
