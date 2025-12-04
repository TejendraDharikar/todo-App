import { Request,Response } from "express";
import { createCategory } from "../../prisma-models/category.model";


export type CreateCategoryInput={
  title:string;
  description:string;
}

export async function createCategoryController(req:Request,res:Response){
const body = req.body as CreateCategoryInput;

const createdCategory=await createCategory(body);

res.json({
  data:createCategory,
  message:"category created successfully!!!"
});
};