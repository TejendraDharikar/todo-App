import { Request,Response } from "express";
import { updateCategory } from "../../prisma-models/category.model";


export type UpdateCategoryInput={
    title?:string;
    description?:string;
};

export const updateCategoryController=async(req:Request,res:Response)=>{
    const params=req.params;
const categoryId=parseInt(params.categoryId as string);
const body=req.body  as UpdateCategoryInput;  
const updatedCategory= await updateCategory(categoryId,body);

res.json({
  message:"category updated successfully",
  data:updatedCategory,
});
};