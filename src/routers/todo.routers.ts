import { Application } from "express";
import { createTodoController } from "../controllers/createTodo.controller";
import { deleteTodoController } from "../controllers/deleteTodo.controller";
import { getAllTodosController } from "../controllers/getAllTodos.controller";
import { getTodoByIdController } from "../controllers/getTodoById.controller";
import { updateTodoController } from "../controllers/updateTodo.controller";

export function todoRouters(app:Application){
  app.post('/todos',createTodoController);
app.get('/todos',getAllTodosController);
app.get('/todos/:todoId',getTodoByIdController);
app.delete('/todos/:todoId',deleteTodoController);
app.patch('/todos/:todoId',updateTodoController); 
}