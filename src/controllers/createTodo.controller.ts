import { Request,Response } from "express";
import { createTodo } from "../sql-models/todo.model";
// import { createTodo } from "../models/todo.model";

export const createTodoController=async(req:Request,res:Response)=>{
const body =req.body;

const createdTodo =await createTodo(body);

 res.json({
    message: "posting done",
    data:body,
  });
};