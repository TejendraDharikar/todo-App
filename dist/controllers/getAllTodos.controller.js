"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodosController = void 0;
const todo_model_1 = require("../sql-models/todo.model");
const getAllTodosController = async (req, res) => {
    const query = req.query;
    // validation for query params can be added here
    const todos = await (0, todo_model_1.getAllTodos)({ status: query.status });
    res.json({
        message: "data fetched",
        data: todos
    });
};
exports.getAllTodosController = getAllTodosController;
//# sourceMappingURL=getAllTodos.controller.js.map