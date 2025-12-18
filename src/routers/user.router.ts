import { Application } from "express";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { getAllUsersController } from "../controllers/users/getAllUsers.controller";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { signUpUserController } from "../controllers/users/signUpUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { getUserByIdController } from "../controllers/users/getUserById.controller";
import { getMeUserController } from "../controllers/users/getMeUser.controller";
import { logoutUserController } from "../controllers/users/logoutUser.controller";
import { checkAuth, checkRefreshToken } from "../middleware/checkAuth";
import { generateAccessControlMiddleware } from "../middleware/generateAccessControlMiddleware";
import { refreshTokenController } from "../controllers/users/refreshToken.controller";


export function createUserRouter(app:Application){
app.post('/users/sign-up',signUpUserController);
app.post('/users/login',loginUserController);

app.get('/users',checkAuth,generateAccessControlMiddleware(["super_admin"]),getAllUsersController);

app.put('/users/:userId',checkAuth,generateAccessControlMiddleware(["user","super_admin","admin"]),updateUserController);
app.delete('/users/:userId',checkAuth,generateAccessControlMiddleware(["user","super_admin","admin"]),deleteUserController);

app.get('/users/@me',checkAuth ,generateAccessControlMiddleware(["user","super_admin","admin"]),getMeUserController);
app.get('/users/:userId',checkAuth ,generateAccessControlMiddleware(["user","super_admin","admin"]),getUserByIdController);

app.post('/users/logout',checkAuth,logoutUserController);

app.get('/users/refresh-token',checkRefreshToken,refreshTokenController);
}