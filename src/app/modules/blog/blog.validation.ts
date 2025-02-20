import { Types } from "mongoose";
import { z } from "zod";


const objectIdSchema = z.custom<Types.ObjectId>(
    (value) => Types.ObjectId.isValid(value?.toString()), 
    { message: "Invalid author name" }
  );


const createBlogValidationSchema = z. object({

     id: z.string().nonempty("ID is required"),
     title: z.string().nonempty("Title is required"),
     author: objectIdSchema,
     content: z.string().nonempty("Content is required"),
     isPublished: z.boolean().default(true),
     isDeleted: z.boolean().default(false),
});
const updateBlogValidationSchema = z. object({

     id: z.string().nonempty("ID is required").optional(),
     title: z.string().nonempty("Title is required").optional(),
     author: objectIdSchema.optional(),
     content: z.string().nonempty("Content is required").optional(),
     isPublished: z.boolean().default(true).optional(),
     isDeleted: z.boolean().default(false).optional(),
});

export const userValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};