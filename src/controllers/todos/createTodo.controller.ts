import { Request,Response } from "express";
import { createTodo } from "../../prisma-models/todo.model";

// import { createTodo } from "../sql-models/todo.model";
// import { createTodo } from "../models/todo.model";

export const createTodoController=async(req:Request,res:Response)=>{
const body =req.body;

const createdtodo =await createTodo(body);

// if(createdtodo.status==='COMPLETED'){
//  sendEmailNotificationToUser();
// }

 res.json({
    message: "posting done",
    data:body,
  });
};