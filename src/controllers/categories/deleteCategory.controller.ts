import { Request, Response } from "express";
import { deleteCategory } from "../../prisma-models/category.model";

export async function deleteCategoryController(req:Request,res:Response){
    const params=req.params;
    const categoryId= parseInt(params.categoryId as string);  
    const deletedCategory= await deleteCategory(categoryId);

    res.json({
      message:"category deleted successfully",
      data:deletedCategory,
    });
  };