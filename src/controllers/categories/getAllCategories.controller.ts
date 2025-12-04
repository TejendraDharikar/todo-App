import { Request,Response } from "express";
import { getAllCategories } from "../../prisma-models/category.model";

export async function getAllCategoriesController(req:Request,res:Response){
const Categories=await getAllCategories();

res.json({
  data:Categories,
  message:"fetched all categories",
});
}