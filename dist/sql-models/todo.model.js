"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getTodoById = getTodoById;
exports.getAllTodos = getAllTodos;
const mysql_1 = require("../lib/mysql");
async function createTodo(todoData) {
    const db = await (0, mysql_1.appDbConnection)();
    const result = db.query(`INSERT INTO
   tasks (
   title,
   status,
   description,
   completed_at,
   created_at,
   updated_at,
   user_id
   )
   VALUES 
   (
   "${todoData.title}",
   "${todoData.status}",
   "${todoData.description}",
   "${todoData.completed_at}",
   "${todoData.created_at}",
   "${todoData.updated_at}",
   ${todoData.user_id}
   );`);
    console.log("created todo result", result);
    return todoData;
}
async function updateTodo(todoId, body) {
    const todo = await getTodoById(todoId);
    if (!todo.data) {
        throw new Error(`there is no such id like -${todoId}`);
    }
    ;
    const db = await (0, mysql_1.appDbConnection)();
    const result = await db.query(`
  UPDATE tasks
  set
  title="${body.title}",
  ${body.description?.length && body.description?.length > 0 ? `description="${body.description}",` : ""}
  status="${body.status}",
  completed_at="${body.completed_at}"
  WHERE id="${todoId}" 
  `);
    console.log("updated result", result);
    return body;
}
;
async function deleteTodo(todoId) {
    const todo = await getTodoById(todoId);
    if (!todo.data) {
        throw new Error(`there is no such id like -${todoId}`);
    }
    ;
    const db = await (0, mysql_1.appDbConnection)();
    const result = await db.query(`
    DELETE FROM
     tasks 
     WHERE
      id=${todoId};
    `);
    console.log("deleted result", result);
    return result[0];
}
;
async function getTodoById(todoId) {
    const db = await (0, mysql_1.appDbConnection)();
    //@ts-ignore
    // or extend okpacket in todo interface
    // or do  as todo[] after result[0] and remove <todo[]>
    const result = await db.query(`
  SELECT * FROM tasks
  WHERE id=${todoId};
  `);
    const todo = result[0];
    console.log("get todo", todo);
    if (todo.length === 0) {
        throw new Error(`there is no such id like - ${todoId}`);
    }
    ;
    return {
        data: todo,
    };
}
;
async function getAllTodos(query) {
    if (!query.status) {
        const db = await (0, mysql_1.appDbConnection)();
        const result = await db.query(`SELECT * FROM TASKS;`);
        return result[0];
    }
    const db = await (0, mysql_1.appDbConnection)();
    const result = await db.query(`SELECT * FROM tasks WHERE status="${query.status}";`);
    return result[0];
}
//# sourceMappingURL=todo.model.js.map