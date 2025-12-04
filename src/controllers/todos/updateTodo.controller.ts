import { Request,Response } from "express";
import { updateTodo } from "../../prisma-models/todo.model";
// import { updateTodo } from "../sql-models/todo.model";

export const updateTodoController=async (req:Request,res:Response)=>{
  try {
      const params=req.params;
  const todoId=params.todoId;
  const numTodoId=parseInt(todoId as string);

  const body = req.body;

  const updatedtodo=await updateTodo(numTodoId,body);

  res.json({
    message:"edited successfully",
    data:updatedtodo,
  });
  } catch (error:any) {
    res.status(404).json({error:error.message});
  }
};