import { Request, Response } from "express";
import { getUserById } from "../../prisma-models/user.model";

export async function getUserByIdController(req:Request, res:Response){
 
  const userId = parseInt(req.params.userId as string);

  const user= await getUserById(userId);

  res.json({
    message: "user fetched successfully",
    data: user,
  })
  
}