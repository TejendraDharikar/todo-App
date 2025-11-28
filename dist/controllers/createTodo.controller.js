"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoController = void 0;
const todo_model_1 = require("../prisma-models/todo.model");
// import { createTodo } from "../sql-models/todo.model";
// import { createTodo } from "../models/todo.model";
const createTodoController = async (req, res) => {
    const body = req.body;
    const createdtodo = await (0, todo_model_1.createTodo)(body);
    // if(createdtodo.status==='COMPLETED'){
    //  sendEmailNotificationToUser();
    // }
    res.json({
        message: "posting done",
        data: body,
    });
};
exports.createTodoController = createTodoController;
//# sourceMappingURL=createTodo.controller.js.map