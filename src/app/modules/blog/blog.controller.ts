import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from "express";
import { BlogServices } from "./blog.service";
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

 const createBlog = catchAsync(async (req, res) =>{
  const result = await BlogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllBlogs: RequestHandler = catchAsync(async(req: Request, res: Response) =>{

      const result = await BlogServices.getAllBlogsFromDB(req.query);
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student are retrieved successfully',
        data: result,
      });
  });

  const updateBlog = async(req: Request, res: Response) =>{
    
      const {id} = req.params;
      console.log({id})
      const updatedBlog = req.body;
      console.log(updatedBlog)
      const result = await BlogServices.updateBlogFromDB(id, updatedBlog);
      console.log(result)
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is updated successfully',
        data: result,
      });
  };
  
  const deleteBlog = async(req: Request, res: Response) =>{

      const {id} = req.params;
      console.log(id)
      const result = await BlogServices.deleteBlogFromDB(id);
      console.log(result);
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'blog is deleted successfully',
        data: result,
      });
  };


  
export const BlogControllers = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,

};