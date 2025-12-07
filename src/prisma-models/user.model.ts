import { TloginUserSchema } from "../controllers/users/loginUser.controller";
import { TSignUpUserSchema } from "../controllers/users/signUpUser.controller";
import { TUpdateUserSchema } from "../controllers/users/updateUser.controller";
import { prisma } from "../lib/prisma";

export async function createUser(data:TSignUpUserSchema){

  const userFound = await prisma.users.findFirst({
    where:{
      OR:[
        {
          email:data.email,
      },
      {
        username:data.username,
      },
    ],
    },
  });
  if(userFound){
    throw new Error(`user already exists`);
  }


  const createdUser=await prisma.users.create({
    data:{
      email:data.email,
      username:data.username,
      password:data.password,
    },
  })
  return createdUser;
}

export async function loginUser(data:TloginUserSchema) {

  const dataFound =await prisma.users.findFirst({
    where:{
      username:data.username
    }
  })
if (!dataFound){
  throw new Error(`you are not registered! please register. `);
};

if(data.password!==dataFound.password){
  throw new Error(`username or password invalid`);

}
  return dataFound; 
}

export async function getAllUsers(){
  const users=await prisma.users.findMany();
  return users;
}

export async function getUserById(id:number){
  const user=await prisma.users.findUnique({
    where:{
      id,
    },
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
      id, 
    },
    data:{
      email:data.email || userFound.email,
      username:data.username || userFound.username,
      password:data.password || userFound.password,
    },
  });
  return updatedUser;
};

export async function deleteUser(id:number){
  const userFound= await getUserById(id);

  const deletedUser=await prisma.users.delete({
    where:{
      id,
    },
  });
  return deletedUser;
};