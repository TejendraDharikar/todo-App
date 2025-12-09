import { Request,Response } from "express";
import { z } from "zod";
import { loginUser } from "../../prisma-models/user.model";

const loginUserSchema=z.object({
  name:z.string().min(2).max(40),
  password:z.string().min(6).max(15)
});

export type TloginUserSchema = z.infer<typeof loginUserSchema>

export async function loginUserController(req:Request,res:Response){
const body = req.body;
 const parsedData = loginUserSchema.safeParse(body);

 if(!parsedData.success){
  res.status(400).json({
    message:"invalid input data",
  });
  return;
 }



//  data valid
const user = await loginUser(parsedData.data);

res.json({
  message:"logged in !!",
  data:user,
})
}