import {Request,Response} from 'express';
import { statusType } from '../models/todo.model';
import { getAllTodos } from '../sql-models/todo.model';

export const getAllTodosController = async(req:Request, res:Response) => {
  const query=req.query;
  
// validation for query params can be added here

  const todos =await getAllTodos({status:query.status as statusType});

  res.json({
message:"data fetched",
data:todos
  });
};