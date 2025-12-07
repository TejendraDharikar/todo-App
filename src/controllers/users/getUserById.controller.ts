import { Request, Response } from "express";
import { getUserById } from "../../prisma-models/user.model";

export async function getUserByIdControler(req:Request, res:Response){
 
  const userId = Number(req.params.userId);

  const user= await getUserById(userId);

  res.json({
    message: "user fetched successfully",
    data: user,
  })
  
}