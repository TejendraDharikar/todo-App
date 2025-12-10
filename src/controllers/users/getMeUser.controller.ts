import { Request,Response } from "express";
import { loggedInUsers } from "./loginUser.controller";

export async function getMeUserController(req:Request,res:Response){
  const token = req.cookies.token as string;

  if(!token){
    throw new Error(`you are not logged in!!`)
  }

  const userFound =loggedInUsers.find(userToken=>userToken===token)

  if(!userFound){
    throw new Error(`you are not logged in!!`) 
  }



  res.json({
    message:"you are logged in !!",
    data:{
      token
    },
  })
}