import { Request,Response } from "express";
import { Todo, updateTodo } from "../models/todo.model";

export const updateTodoController=(req:Request,res:Response)=>{
  try {
      const params=req.params;
  const todoId=params.todoId;
  const numTodoId=parseInt(todoId as string);

  const body = req.body;

  const updatedtodo=updateTodo(numTodoId as number,body as Partial<Todo>);

  res.json({
    message:"edited successfully",
    data:updatedtodo
  });
  } catch (error:any) {
    res.status(404).json({error:error.message});
  }

};