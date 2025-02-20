import httpStatus from 'http-status';
import { model, Schema } from "mongoose";
import { Blog } from "./blog.interface";
import AppError from "../../errors/AppError";

const blogSchema = new Schema<Blog>({
    
     id: {type: String, unique: true},
    title: {type: String, required: [true, "title must be needed"]},
    content: {type: String, required: [true, "content must be included"]},
    author:  {type: Schema.Types.ObjectId, ref:"user", required: true},
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
},
     { timestamps: true },
);



blogSchema.pre('save', async function (next) {
  const isBlogExist = await blogModel.findOne({
    id: this.id,
  });

  if (isBlogExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This blog is already exist!',
    );
  }

  next();
});

blogSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isBlogExist = await blogModel.findOne(query);

  if (!isBlogExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This blog does not exist! ',
    );
  }

  next();
});


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