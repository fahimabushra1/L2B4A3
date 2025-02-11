import { model, Schema } from "mongoose";
import { Blog } from "../interfaces/blog.interface";

const blogSchema = new Schema<Blog>({
    
    title: {type: String, required: [true, "title must be needed"]},
    content: {type: String, required: [true, "content must be included"]},
    author:  {type: Schema.Types.ObjectId, ref:"user", required: true},
    isPublished: { type: Boolean, default: true },
},
     { timestamps: true },
);

export const orderModel = model<Blog>('blog', blogSchema);