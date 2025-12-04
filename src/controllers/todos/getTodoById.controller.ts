import { Request,Response } from "express"
import { getTodoById } from "../prisma-models/todo.model";
// import { getTodoById } from "../sql-models/todo.model";


export const getTodoByIdController =async (req:Request,res:Response)=>{
  try {
      const params=req.params;
  const todoId=params.todoId;
  const numTodoId=parseInt(todoId as string);

const todo= await getTodoById(numTodoId);
console.log(todo);
res.json({
  Message:"data fetched by id",
  data: todo,
});
  } catch (error:any) {
    res.status(404).json({ error: error.message });
  }
};