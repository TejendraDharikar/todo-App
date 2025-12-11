import { Request,Response } from "express";
import { z } from "zod"; 
import { updateUser } from "../../prisma-models/user.model";

const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export async function updateUserController(req:Request,res:Response){
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
message:`you can only update your user detail`
    });
    return;
  };

  const body = req.body;

  const parsedBody= UpdateUserSchema.safeParse(body);

  if(!parsedBody.success){
     res.status(400).json({
      message: "Invalid request data",
      errors: parsedBody.error,
    });
    return;
  }

  const updatedUser=await updateUser(userId,parsedBody.data);

  res.json({
    message: "User updated successfully",
    data:updatedUser,
  })
    }