"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoController = void 0;
const todo_model_1 = require("../sql-models/todo.model");
const updateTodoController = async (req, res) => {
    try {
        const params = req.params;
        const todoId = params.todoId;
        const numTodoId = parseInt(todoId);
        const body = req.body;
        const updatedtodo = await (0, todo_model_1.updateTodo)(numTodoId, body);
        res.json({
            message: "edited successfully",
            data: updatedtodo
        });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.updateTodoController = updateTodoController;
//# sourceMappingURL=updateTodo.controller.js.map