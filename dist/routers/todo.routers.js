"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouters = todoRouters;
const createTodo_controller_1 = require("../controllers/createTodo.controller");
const deleteTodo_controller_1 = require("../controllers/deleteTodo.controller");
const getAllTodos_controller_1 = require("../controllers/getAllTodos.controller");
const getTodoById_controller_1 = require("../controllers/getTodoById.controller");
const updateTodo_controller_1 = require("../controllers/updateTodo.controller");
function todoRouters(app) {
    app.post('/todos', createTodo_controller_1.createTodoController);
    app.get('/todos', getAllTodos_controller_1.getAllTodosController);
    app.get('/todos/:todoId', getTodoById_controller_1.getTodoByIdController);
    app.delete('/todos/:todoId', deleteTodo_controller_1.deleteTodoController);
    app.patch('/todos/:todoId', updateTodo_controller_1.updateTodoController);
}
//# sourceMappingURL=todo.routers.js.map