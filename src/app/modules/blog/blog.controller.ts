import { Request, Response } from "express";
import { BlogValidationSchema } from "./blog.validation";
import { BlogServices } from "./blog.service";

const createBlog = (req: Request, res: Response) =>{
    try{
      const {blog: blogData} = req.body;
      const zodParseData = BlogValidationSchema.parse(blogData);
      const result = BlogServices.createBlogIntoDB(zodParseData);
      res.status(200).json({
        success: true,
        message:"blog is created successfully",
        data: result,
    });
    }
    catch(err:any){
        res.status(500).json({
          success: false,
          message:"err.message || something went wrong",
          error: err,
      });
      res.status(400).json({ message: "No blog found", success: false, err });
      }
};

const getAllBlogs = async(req: Request, res: Response) =>{
    try{
      const result = await BlogServices.getAllBlogsFromDB();
  
      res.status(200).json({
          success: true,
          message:"blogs are retrieved successfully",
          data: result,
      });
    }catch(err:any){
      res.status(500).json({
        success: false,
        message:"something went wrong",
        error: err,
    });
    res.status(400).json({ message: "Fail to retrieve blogs", success: false, err });
    };
  };

  const getSingleBlog = async(req: Request, res: Response) =>{
    try{
      const {blogId} = req.params;
      console.log({blogId})
      const result = await BlogServices.getSingleBlogFromDB(blogId);
  
      res.status(200).json({
          success: true,
          message:"blog is retrieved successfully",
          data: result,
      });
    }catch(err:any){
      console.log(err);
      res.status(500).json({
        success: false,
        message:"err.message || something went wrong",
        error: err,
    });
    res.status(400).json({ message: "Fail to retrieve single blog", success: false, err });
  }};

  const updateBlog = async(req: Request, res: Response) =>{
    try{
      const {id} = req.params;
      console.log({id})
      const updatedBlog = req.body;
      console.log(updatedBlog)
      const result = await BlogServices.updateBlogFromDB(id, updatedBlog);
      console.log(result)
  
      res.status(200).json({
        success: true,
        message:"blog is updated successfully",
        data: result,
      });
    }catch(err:any){
      console.log(err);
      res.status(500).json({
        success: false,
        message:"err.message || something went wrong",
        error: err,
    });
    res.status(400).json({ message: "Fail to update blog", success: false, err });
  }};
  
  const deleteBlog = async(req: Request, res: Response) =>{
    try{
      const {id} = req.params;
      console.log(id)
      const result = await BlogServices.deleteBlogFromDB(id);
      console.log(result);
  
      res.status(200).json({
          success: true,
          message:"blog is deleted successfully",
          data: result,
      });
    }catch(err:any){
      console.log(err);
      res.status(500).json({
        success: false,
        message:"err.message || something went wrong",
        error: err,
    });
    res.status(400).json({ message: "blog can not be deleted", success: false, err });
  }};

  
export const BlogControllers = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,

};