import {Request,Response, NextFunction } from "express";

export async function checkSuperAdminRole(req:Request,res:Response,next:NextFunction) {
 
  const userRole = req.user?.role;

  if(userRole!== 'super_admin'){
    res.status(403).json({
      message:"unauthorized ! you cannot access this resource",
    });
    return;
  }

  next();
}


export async function checkAdminRole(req:Request,res:Response,next:NextFunction) {
 
  const userRole = req.user?.role;

  if(userRole!== 'admin'){
    res.status(403).json({
      message:"unauthorized ! you cannot access this resource",
    });
    return;
  }

  next();
}

export async function checkUserRole(req:Request,res:Response,next:NextFunction) {
 
  const userRole = req.user?.role;

  if(userRole!== 'user'){
    res.status(403).json({
      message:"unauthorized ! you cannot access this resource",
    });
    return;
  }

  next();
}