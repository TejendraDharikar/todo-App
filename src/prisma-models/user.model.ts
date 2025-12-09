import { TloginUserSchema } from "../controllers/users/loginUser.controller";
import { TSignUpUserSchema } from "../controllers/users/signUpUser.controller";
import { TUpdateUserSchema } from "../controllers/users/updateUser.controller";
import { comparePassword } from "../lib/hash";
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

//check if password matches
const isPasswordCorrect=await comparePassword(dataFound.password,data.password)

if(!isPasswordCorrect){
  throw new Error(`username or password incorrect !!`);
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

if(userFound.email!==data.email){

const emailsFound=await prisma.users.findMany({
  where:{
    email:data.email ||'',
  }
 });

 if (emailsFound){
  throw new Error(`email already exist use different error`)
 };
};

 

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

  const deletedUser=await prisma.users.delete({
    where:{
      id:id
    },
  });
  return deletedUser;
};