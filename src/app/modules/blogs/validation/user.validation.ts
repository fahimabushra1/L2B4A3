import { z } from "zod";

const UserValidationSchema = z.object({

    name:  z.string().nonempty("Title is required"),
    email:  z.string().nonempty("Title is required"),
    password:  z.string().nonempty("Title is required").min(6, { message: "password must be at least 6 characters" }).max(10, { message: "password must be maximum 10 characters" }),
    role: z.enum(["admin", "user"]),
    isBlocked: z.boolean().default(false),
});

export {UserValidationSchema};