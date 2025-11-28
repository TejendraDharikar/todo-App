import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { statusType } from "../models/todo.model";


export async function createTodo(data:Prisma.tasksCreateInput){
  if (!data.status){
    throw new Error(`please send valid status`);
  }

const createdTask = await prisma.tasks.create({
  data:{
    title:data.title ,
    status:data.status,
    description:data.description || null,
  user_id:data.user_id
  },
})
return createdTask;
}

export  async function getAllTodos(  status?: statusType  ){
  const getTodos = await prisma.tasks.findMany({
    where:status?{status:status}:{},
  });
  return getTodos;
}

export async function getTodoById(numTodoId:number){
  const getTodoById =await prisma.tasks.findUnique({
    where:{
      id: numTodoId
    }
  })
  return getTodoById;
};

export async function updateTodo(numTodoId:number,body:Partial<Prisma.tasksUpdateInput>){
  const updateTodo=await prisma.tasks.update({
    where:{
      id:numTodoId
    },
    data:body
  })
};

export async function deleteTodo(todoId:number){
  const deleteTodo =await prisma.tasks.delete({
    where:{
      id:todoId,
    },
  })
}

