import { Request,Response } from "express";
import { loggedInUsers, removeUser } from "./loginUser.controller";

export async function logoutUserController(req:Request,res:Response){
  const token = req.cookies.token as string;

  if(!token){
    throw new Error(`you are not logged in!!`)
  }

  const userFound =loggedInUsers.find(userToken=>userToken===token)

  if(!userFound){
    throw new Error(`you are not logged in!!`) 
  }

  removeUser(token);

res.clearCookie("token");

  res.json({
    message:"you are logged out !!",
  })
}