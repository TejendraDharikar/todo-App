import { Request,Response } from "express";
import { z } from "zod"; 
import { updateUser } from "../../prisma-models/user.model";

const UpdateUserSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export async function updateUserController(req:Request,res:Response){

  const userId = Number(req.params.userId);
  const body = req.body;

  const parsedBody= UpdateUserSchema.safeParse(body);

  if(!parsedBody.success){
     res.status(400).json({
      message: "Invalid request data",
      errors: parsedBody.error,
    });
    return;
  }

  const updatedUser= updateUser(userId,parsedBody.data);

  res.json({
    message: "User updated successfully",
    data:updatedUser,
  })
    }