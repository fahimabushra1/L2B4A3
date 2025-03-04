import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { blogSearchableFields } from "./blog.constant";
import { Blog } from "./blog.interface";
import { blogModel } from "./blog.model";
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createBlogIntoDB = async (payload: Blog)=>{
    const result = await blogModel.create(payload);
    return result;
};
  
const getAllBlogsFromDB = async(query: Record<string, unknown>) =>{
    const blogQuery = new QueryBuilder(
        blogModel.find(),
        query,
    )
    .search(blogSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
    const result = await blogQuery.modelQuery;
    return result;
};

  

const updateBlogFromDB = async (id: string, payload: Partial<Blog>) =>{
    const {...blogData } = payload;

    const session = await mongoose.startSession();

    try{
        session.startTransaction();
  
        // blog info update
        const updatedBlogInfo = await blogModel.findByIdAndUpdate(
          id,
          blogData,
          {
            new: true,
            runValidators: true,
            session,
          },
        );
    
        if (!updatedBlogInfo) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
        }

        await session.commitTransaction();
        await session.endSession();
    
        const result = await blogModel.findById(id).populate(
          'user',
        );
        return result;
    }catch (err) {
        console.log(err);
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
};

const deleteBlogFromDB = async (id : string) =>{
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    const deletedBlog = await blogModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedBlog) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedBlog;
  }catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete blog');
  }
};


export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    updateBlogFromDB,
    deleteBlogFromDB,

}