import  jwt  from "jsonwebtoken";
import { Roles } from "../generated/prisma/enums";
import { ENV } from "./env";


type TTokenPayload={
  id:number;
  name:string;
  email:string;
  role:Roles;
}

export function generateToken(userPayload:TTokenPayload,expiryTimeInSeconds:number){
  const token = jwt.sign(userPayload,ENV.JWT_SECRET,{
    expiresIn:expiryTimeInSeconds,//in second
  });
  return token;
}


export function verifyToken(token:string){
 try {
   const userPayload =  jwt.verify(token,ENV.JWT_SECRET);
 return userPayload as TTokenPayload;
 } catch (error) {
  console.error(`failed to verify the token`,error);
  return null;
 }
}
