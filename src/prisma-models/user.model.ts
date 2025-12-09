import { TloginUserSchema } from "../controllers/users/loginUser.controller";
import { TSignUpUserSchema } from "../controllers/users/signUpUser.controller";
import { TUpdateUserSchema } from "../controllers/users/updateUser.controller";
import { prisma } from "../lib/prisma";

export async function createUser(body:TSignUpUserSchema){

  const userFound = await prisma.users.findFirst({
    where:{
      OR:[
        {name:body.name},
        {email:body.email}
    ],
    },
  });
  if(userFound){
    throw new Error(`user already exists`);
  };


  const createdUser=await prisma.users.create({
    data:{
      email:body.email,
      name:body.name,
      password:body.password,
    },
  })
  return createdUser;
}

export async function loginUser(data:TloginUserSchema) {

  const dataFound =await prisma.users.findFirst({
    where:{
      name:data.name
    }
  })
if (!dataFound){
  throw new Error(`you are not registered! please register. `);
};

if(data.password!==dataFound.password){
  throw new Error(`name or password invalid`);

}
  return dataFound; 
}

export async function getAllUsers(){
  const users=await prisma.users.findMany();
  return users;
}

export async function getUserById(id:number){
  
  const user=await prisma.users.findUnique({
    where:{id:id},
  });
  if(!user){
    throw new Error (`user with id ${id} not found`);
  }
  return user;
};

export async function updateUser(id:number,data:TUpdateUserSchema){
 const userFound= await getUserById(id);

  const updatedUser=await prisma.users.update({
    where:{
      id:id
    },
    data:{
      email:data.email || userFound.email,
      name:data.name || userFound.name,
      password:data.password || userFound.password,
    },
  });
  return updatedUser;
};

export async function deleteUser(id:number){
  const userFound = await getUserById(id);

  // find tasks belonging to the user
  const userTasks = await prisma.tasks.findMany({
    where: { user_id: id },
    select: { id: true },
  });
  const taskIds = userTasks.map((t) => t.id);

  // perform deletions in a single transaction to avoid partial state
  const deletedUser = await prisma.$transaction(async (tx) => {
    if (taskIds.length > 0) {
      // remove join entries first to avoid FK violations
      await tx.tasks_categories.deleteMany({
        where: { task_id: { in: taskIds } },
      });

      // remove tasks for the user
      await tx.tasks.deleteMany({
        where: { id: { in: taskIds } },
      });
    }

    // finally delete the user
    return tx.users.delete({ where: { id: id } });
  });

  return deletedUser;
};