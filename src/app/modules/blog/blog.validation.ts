import { Types } from "mongoose";
import { z } from "zod";


const objectIdSchema = z.custom<Types.ObjectId>(
    (value) => Types.ObjectId.isValid(value?.toString()), 
    { message: "Invalid author name" }
  );


const BlogValidationSchema = z. object({

     id: z.string().nonempty("ID is required"),
     title: z.string().nonempty("Title is required"),
     author: objectIdSchema,
     content: z.string().nonempty("Content is required"),
     isPublished: z.boolean().default(true),
     isDeleted: z.boolean().default(false),
});

export {BlogValidationSchema};