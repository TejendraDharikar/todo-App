import { Request,Response } from "express";
import { deleteTodo } from "../models/todo.model";

export const deleteTodoController=(req:Request,res:Response)=>{
  try {
    const params=req.params;
const todoId= parseInt(params.todoId as string);

const deletedtodo=deleteTodo(todoId);

res.json({
  message:"deleted successfully",
  data:deletedtodo
});
  } catch (error:any) {
    res.status(404).json({error:error.message});
  }

};