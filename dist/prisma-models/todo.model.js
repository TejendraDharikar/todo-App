"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
const prisma_1 = require("../lib/prisma");
async function createTodo(data) {
    if (!data.status) {
        throw new Error(`please send valid status`);
    }
    const createdTask = await prisma_1.prisma.tasks.create({
        data: {
            title: data.title,
            description: data.description || null,
            status: data.status,
        },
    });
    return createdTask;
}
//# sourceMappingURL=todo.model.js.map