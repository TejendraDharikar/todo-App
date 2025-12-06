import { Request, Response } from "express";
import {z } from "zod";
import { createUser } from "../../prisma-models/user.model";
import { use } from "react";

const SignUpUserSchema = z.object({
  email:z.string().email(),
  username:z.string().min(2).max(50),
  password:z.string().min(6).max(15),
})


export type TSignUpUserSchema = z.infer<typeof SignUpUserSchema>

export async function signUpUserController(req:Request,res:Response){
  const body = req.body;

  // Validation
 const parsedData= SignUpUserSchema.safeParse(body);

if (!parsedData.success){
  //  throw new Error(`Invalid data`);
   res.status(400).json({
    message:"invalid data",
    errors:parsedData.error,
   });
   return;
}

// data is valid 
const user = await createUser(parsedData.data)

    res.json({
        message:"user signed up successfully",
        data:user,
    });
};