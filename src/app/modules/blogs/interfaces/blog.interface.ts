import { Types } from "mongoose";

export type Blog = {
    
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished:boolean;

}