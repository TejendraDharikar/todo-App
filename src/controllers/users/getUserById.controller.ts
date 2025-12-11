import { Request, Response } from "express";
import { getUserById } from "../../prisma-models/user.model";

export async function getUserByIdController(req:Request, res:Response){
 
  const paramsUserId = parseInt(req.params.userId as string);

  const userId=req.user?.id;

  if(!userId){
    res.status(401).json({
message:`u are not authorized`
    });
    return;
  };

  if(paramsUserId!==userId){
 res.status(401).json({
message:`you can only view your user detail`
    });
    return;
  }

  const user= await getUserById(userId);

  res.json({
    message: "user fetched successfully",
    data: user,
  })
  
}