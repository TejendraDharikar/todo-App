import { Application } from "express";
import { signUpUserController } from "../controllers/users/signUpUser.controller";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { getAllUsersController } from "../controllers/users/getAllUsers.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";

export async function createUserRouter(app:Application){
app.post('/users/sign-up',signUpUserController);
app.post('/users/login',loginUserController);
app.get('/users',getAllUsersController);
app.get('/users/:userId',getAllUsersController);
app.put('/users/:userId',updateUserController);
app.delete('/users/:userId',deleteUserController);
}