import { Request,Response } from "express";
import { createTodo } from "../models/todo.model";

export const createTodoController=(req:Request,res:Response)=>{
const body =req.body;

const createdTodo = createTodo(body);

 res.json({
    message: "posting done",
    data:body,
  });
};