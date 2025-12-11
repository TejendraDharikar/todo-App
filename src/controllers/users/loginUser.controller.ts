import { Request,Response } from "express";
import { z } from "zod";
import { loginUser } from "../../prisma-models/user.model";
import { prisma } from "../../lib/prisma";

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
    errors:parsedData.error,
  });
  return;
 }



//  data valid
const user = await loginUser(parsedData.data);

const randomNumberOfLength6 = Math.floor(Math.random()*1000000);
const randomString = randomNumberOfLength6.toString();

await prisma.userSession.create({
  data:{
    user_id:user.id,
    session_id:randomString,
  }
})

res.cookie("token",randomString,{
  httpOnly: true,
});

res.json({
  message:"logged in !!",
  data:{
    ...user,
    token:randomString
  },
})
}