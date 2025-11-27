import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";


export async function createTodo(data:Prisma.tasksCreateInput){
  if (!data.status){
    throw new Error(`please send valid status`);
  }

const createdTask = await prisma.tasks.create({
  data:{
    title:data.title ,
    description:data.description || null,
    status:data.status,
    user_id:data.user_id,
  },
})
return createdTask;
}

