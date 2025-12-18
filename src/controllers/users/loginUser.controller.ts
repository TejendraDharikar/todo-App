import { Request,Response } from "express";
import { z } from "zod";
import { loginUser } from "../../prisma-models/user.model";
import { prisma } from "../../lib/prisma";
import { generateToken } from "../../lib/token";
import { ENV } from "../../lib/env";

const loginUserSchema=z.object({
  name:z.string().min(2).max(40),
  password:z.string().min(6).max(1000)
});

export type TloginUserSchema = z.infer<typeof loginUserSchema>


export async function loginUserController(req:Request,res:Response){
const body = req.body;
 const parsedData = loginUserSchema.safeParse(body);

console.log("parsedData",parsedData);

 if(!parsedData.success){
  res.status(400).json({
    message:"invalid input data",
    errors:parsedData.error,
  });
  return;
 }



//  data valid
const user = await loginUser(parsedData.data);

const accessToken = generateToken({
  id:user.id,
  name:user.name,
  email:user.email,
  role:user.role
},
ENV.JWT_EXPIRTATION_TIME_IN_SECONDS);


const refreshToken= generateToken({
   id:user.id,
  name:user.name,
  email:user.email,
  role:user.role,
}, ENV.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS);

console.log("refreshToken",refreshToken);
await prisma.userSession.create({
  data:{
    user_id:user.id,
    session_id:refreshToken,
  }
})

res.cookie("accessToken",accessToken,{
  httpOnly: true,
  maxAge:ENV.JWT_TOKEN_COOKIE_AGE_IN_SECONDS*1000,
  domain:"localhost", // if value:"*.skillprompt.com" then only allow "skillprompt.com" and "backend.skillprompt.com" 
  secure:false, // in production keep it always true
  sameSite:"lax",
  path:"/",
});

res.cookie("refreshToken",refreshToken,{
  httpOnly: true,
  maxAge:ENV.REFRESH_TOKEN_COOKIE_AGE_IN_SECONDS*1000,
  domain:"localhost", // if value:"*.skillprompt.com" then only allow "skillprompt.com" and "backend.skillprompt.com" 
  secure:false, // in production keep it always true
  sameSite:"lax",
  path:"/",
});

res.json({
  message:"logged in !!",
  data:{
    ...user,
    token:{...user,
      accessToken,
      refreshToken
    }
  },
})
}
