import {Request,Response} from 'express';
import { getAllTodos, statusType } from '../models/todo.model';

export const getAllTodosController = (req:Request, res:Response) => {
  const query=req.query;
  
// validation for query params can be added here

  const todos = getAllTodos({status:query.status as statusType});

  res.json({
message:"data fetched",
data:todos
  });
};