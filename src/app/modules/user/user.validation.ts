import { AnyZodObject, z } from "zod";

const UserValidationSchema: AnyZodObject = z.object({
        
            body: z.object({
              user: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().email("Invalid email format"),
        password:  z.string({invalid_type_error: "password must be string"}).nonempty("Title is required").min(6, { message: "password must be at least 6 characters" }).max(10, { message: "password must be maximum 10 characters" }). optional(),
        role: z.enum(["admin", "user"], { message: "Role must be 'admin' or 'user'" }),
       })
            })
});

export const UserValidations =  {UserValidationSchema};