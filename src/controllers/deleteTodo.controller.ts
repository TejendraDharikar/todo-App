import { Request,Response } from "express";
import { deleteTodo } from "../prisma-models/todo.model";
// import { deleteTodo } from "../sql-models/todo.model";

export const deleteTodoController=async(req:Request,res:Response)=>{
  try {
    const params=req.params;
const todoId= parseInt(params.todoId as string);

const deletedtodo= await deleteTodo(todoId);

res.json({
  message:"deleted successfully",
  data:deletedtodo
});
  } catch (error:any) {
    res.status(404).json({error:error.message});
  }
};