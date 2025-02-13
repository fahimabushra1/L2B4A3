import { Blog } from "../interfaces/blog.interface";
import { blogModel } from "../models/blog.model";

const createBlogIntoDB = async (blog: Blog)=>{
    const result = await blogModel.create(blog);
    return result;
};

const getAllBlogsFromDB = async() =>{
    const result = await blogModel.find();
    return result;
};

const getSingleBlogFromDB = async(id: string) =>{
    const result = await blogModel.findOne({id});
    return result;
};

const updateBlogFromDB = async (id: string, updateData: Partial<Blog>) =>{
    const result = await blogModel.findOneAndUpdate({id}, updateData,{new: true});
    return result;
};

const deleteBlogFromDB = async (id : string) =>{
    const result = await blogModel.deleteOne({id}, {isDeleted: true});
    return result;
}


export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    updateBlogFromDB,
    deleteBlogFromDB,

}