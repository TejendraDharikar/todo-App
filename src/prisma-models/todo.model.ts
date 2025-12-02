import { Prisma, TaskStatus } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";



export async function createTodo(data:{ title: string; status: TaskStatus; description?: string | null; userId: number }){
  if (!data.status){
    throw new Error(`please send valid status`);
  }

const createdTask = await prisma.tasks.create({
  data:{
    title: data.title,
    status: data.status,
    description: data.description || null,
    user: {
      connect: {
        id: data.userId,
      }
    }
  },
})
return createdTask;
}


type TGetAllTodosWhereInput = {
  status?:TaskStatus ;
  completed_at?:string;
  title?:string;
}
type TGetAllTodosPaginationInput={
page:number;
perPage:number;
}

export  async function getAllTodos(whereInput:TGetAllTodosWhereInput,
  pagination:TGetAllTodosPaginationInput
){
let tempWhereInput :Prisma.tasksWhereInput={};

if(whereInput.status){
  tempWhereInput.status=whereInput.status
}

if(whereInput.completed_at){
  tempWhereInput.completed_at={
    gte:new Date(whereInput.completed_at)
}
}

if(whereInput.title){
  tempWhereInput.title={
    contains:whereInput.title,
  }
}

// perPage=10
// total=35
// page=1


//page: 1  2   3   4
//skip: 0  10  20  30
//formula: (pageNum - 1) * perpage
const totalTasks = await prisma.tasks.count({
  where : tempWhereInput
});
  const getTodos = await prisma.tasks.findMany({
    where:tempWhereInput,
    take:pagination.perPage,
    skip:(pagination.page-1)*pagination.perPage,
    include:{
      user:{
        select:{
          id:true,
          email:true,
          tasks:true
        }
      }
    }
  });
  return {getTodos,totalTasks};
}

export async function getTodoById(id:number){
  const getTodoById =await prisma.tasks.findFirst({
    where:{
      id: id
    }
  });
  if(!getTodoById){
    throw new Error(`task with id-${id} not found`);
  }
  return getTodoById;
};

export async function updateTodo(id:number,data:Prisma.tasksUpdateInput){
  const updateTodo=await prisma.tasks.update({
    where:{
      id
    },
    data:data, 
  })
};

export async function deleteTodo(todoId:number){

 const taskFound=await prisma.tasks.findFirst({
where:{
  id:todoId
}
  });

  if(!taskFound){
    throw new Error(`Task with id - ${todoId} not found`);
  }

  const deleteTodo =await prisma.tasks.delete({
    where:{
      id:todoId,
    },
  })
}