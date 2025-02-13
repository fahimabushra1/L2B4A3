import { model, Schema } from "mongoose";
import { Blog } from "../interfaces/blog.interface";

const blogSchema = new Schema<Blog>({
    
     id: {type: String},
    title: {type: String, required: [true, "title must be needed"]},
    content: {type: String, required: [true, "content must be included"]},
    author:  {type: Schema.Types.ObjectId, ref:"user", required: true},
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
},
     { timestamps: true },
);

// query middleware

blogSchema.pre('find', function(next){
    this.find({isDeleted: {$ne: true}});
   next();
 });
 
 blogSchema.pre('findOne', function(next){
    this.find({isDeleted: {$ne: true}});
   next();
 });
 
 blogSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match:{isDeleted: {$ne: true}}});
   next();
 });

export const blogModel = model<Blog>('blog', blogSchema);