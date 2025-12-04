import {Request,Response} from 'express';
import { getAllTodos } from '../prisma-models/todo.model';
import { TaskStatus } from '../generated/prisma/enums';
// import { getAllTodos } from '../sql-models/todo.model';

export const getAllTodosController = async(req:Request, res:Response) => {
  const query=req.query; // GET /todos?status=completed&completed_at=2025-11-01&title=database&page=1
  
  const status = query.status as TaskStatus;
const completed_at=query.completed_at as string;  //"yyyy-mm-dd"
const title=query.title as string;
const page =query.page || "1";
const pageNum = Number(page);
const perPage= 10;

// validation for query params can be added here

  const todosRes =await getAllTodos({
    status:status,
    completed_at,
    title,
  },{
    page:pageNum,
    perPage:perPage,
  });

  res.json({
message:"data fetched",
data:todosRes.getTodos,
pagination:{
  page:pageNum,
  perPage:perPage,
  total:todosRes.totalTasks,
},
  });
};