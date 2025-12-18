import { Request, Response } from "express";
import { generateToken } from "../../lib/token";
import { ENV } from "../../lib/env";

export async function refreshTokenController(req:Request,res:Response){
const user = req.user;

if(!user){
    return res.status(401).json({message:"Unauthorized"});  
}

 const accessToken = generateToken({
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
 },ENV.JWT_EXPIRTATION_TIME_IN_SECONDS);
const refreshToken = generateToken({
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
 },ENV.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS);

res.cookie('token',accessToken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:ENV.JWT_EXPIRTATION_TIME_IN_SECONDS * 1000,//in ms
    path:"/",
    domain:"localhost",
})
res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:ENV.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS * 1000,//in ms
    path:"/",
    domain:"localhost",
})
res.json({
    message:"you are logged in successfully",
    data:{accessToken,refreshToken}
});
}