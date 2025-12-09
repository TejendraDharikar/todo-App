import { Application } from "express";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { getAllUsersController } from "../controllers/users/getAllUsers.controller";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { signUpUserController } from "../controllers/users/signUpUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { getUserByIdController } from "../controllers/users/getUserById.controller";


export async function createUserRouter(app:Application){
app.post('/users/sign-up',signUpUserController);
app.post('/users/login',loginUserController);

app.get('/users/:userId',getUserByIdController);
app.get('/users',getAllUsersController);

app.put('/users/:userId',updateUserController);
app.delete('/users/:userId',deleteUserController);
}