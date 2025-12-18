import './express.d.ts';
import express from "express";
import { todoRouters } from "./routers/todo.routers";
import { createCategoryRouter } from "./routers/category.router";
import { createUserRouter } from "./routers/user.router";
import cookieParser from 'cookie-parser';
import { authRouter } from './googleAuth/authRouter.js';
import "./googleAuth/passport.js";
import { passportConfig } from './googleAuth/config.js';


const app = express();
app.use(express.json());
app.use(cookieParser());


app.get('/', 
//   (req, res,next) => {
//  console.log("1 received req on /");
//  const user=req.query.user;
//  if(user==="ram"){
//  next();
//  }else{
//   res.status(401).json({
//     message:"invalid user",
//   });
//  };

// },
  (req, res) => {
  // res.send("hello from express");
  res.json({
    message: "hello from express updated!"
  });
});

passportConfig(app);
authRouter(app);
todoRouters(app);
createCategoryRouter(app);
createUserRouter(app);


app.listen(4000, () => {
  console.log("listening on http://localhost:4000");

});