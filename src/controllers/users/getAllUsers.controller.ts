import { Request,Response } from "express";
import { getAllUsers } from "../../prisma-models/user.model";

export async function getAllUsersController(req:Request,res:Response){
const users=await getAllUsers();

res.json({
  message:`all users fetched !!`,
  data:users,
});
};