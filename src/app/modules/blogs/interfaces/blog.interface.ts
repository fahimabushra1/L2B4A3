import { Types } from "mongoose";

export type Blog = {
    
    id: string;
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished:boolean;
    isDeleted: boolean;

};