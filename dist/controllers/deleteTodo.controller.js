"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoController = void 0;
const todo_model_1 = require("../sql-models/todo.model");
const deleteTodoController = async (req, res) => {
    try {
        const params = req.params;
        const todoId = parseInt(params.todoId);
        const deletedtodo = await (0, todo_model_1.deleteTodo)(todoId);
        res.json({
            message: "deleted successfully",
            data: deletedtodo
        });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.deleteTodoController = deleteTodoController;
//# sourceMappingURL=deleteTodo.controller.js.map