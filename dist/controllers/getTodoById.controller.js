"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoByIdController = void 0;
const todo_model_1 = require("../sql-models/todo.model");
const getTodoByIdController = async (req, res) => {
    try {
        const params = req.params;
        const todoId = params.todoId;
        const numTodoId = parseInt(todoId);
        const todo = await (0, todo_model_1.getTodoById)(numTodoId);
        console.log(todo);
        res.json({
            Message: "data fetched by id",
            data: todo
        });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.getTodoByIdController = getTodoByIdController;
//# sourceMappingURL=getTodoById.controller.js.map