import { Application } from "express";
import { createTodoController } from "../controllers/todos/createTodo.controller";
import { deleteTodoController } from "../controllers/todos/deleteTodo.controller";
import { getAllTodosController } from "../controllers/todos/getAllTodos.controller";
import { getTodoByIdController } from "../controllers/todos/getTodoById.controller";
import { updateTodoController } from "../controllers/todos/updateTodo.controller";
import { assignCategoryToTaskController } from "../controllers/todos/assignCategoryToTask.controller";


export function todoRouters(app:Application){
  app.post('/todos',createTodoController);
app.get('/todos',getAllTodosController);
app.get('/todos/:todoId',getTodoByIdController);
app.delete('/todos/:todoId',deleteTodoController);
app.patch('/todos/:todoId',updateTodoController); 

app.post("/todos/assign-category",assignCategoryToTaskController); 
};