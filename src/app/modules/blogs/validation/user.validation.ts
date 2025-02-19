import { AnyZodObject, z } from "zod";

const UserValidationSchema: AnyZodObject = z.object({
    body: z.object({
        user:z.object({
            password:  z.string({invalid_type_error: "password must be string"}).nonempty("Title is required").min(6, { message: "password must be at least 6 characters" }).max(10, { message: "password must be maximum 10 characters" }). optional(),
        })
    })
});

export const UserValidations =  {UserValidationSchema};