import {Request,Response, NextFunction } from "express";

type Role = "super_admin"|"admin"|"user"

export function generateAccessControlMiddleware(roles:Role[]){
return (req:Request,res:Response,next:NextFunction)=>{
 const userRole = req.user?.role;

if(!userRole){
   res.status(401).json({
      message:`your user role not found`,
    });
    return;
}

  if(!roles.includes(userRole)){
    res.status(403).json({
      message:`unauthorized ! you cannot access this resource.expected role : ${roles} but got role:${userRole}`,
    });
    return;
  }

  next();
}
}