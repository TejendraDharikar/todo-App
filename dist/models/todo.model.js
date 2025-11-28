"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
exports.getTodoById = getTodoById;
exports.getAllTodos = getAllTodos;
exports.todos = [];
function createTodo(todoData) {
    exports.todos.push(todoData);
    return todoData;
}
;
function updateTodo(todoId, body) {
    const todo = getTodoById(todoId);
    if (!todo.data) {
        throw new Error(`there is no such id like -${todoId}`);
    }
    ;
    const updateTodos = exports.todos.map((todo) => {
        if (todoId === todo.id) {
            return {
                ...todo,
                ...body
            };
        }
        else {
            return todo;
        }
        ;
    });
    exports.todos = updateTodos;
    return updateTodos[todo.indx];
}
;
function deleteTodo(todoId) {
    const todo = getTodoById(todoId);
    if (!todo.data) {
        throw new Error(`there is no such id like -${todoId}`);
    }
    ;
    const splicedTodo = exports.todos.splice(todo.indx, 1);
    return splicedTodo;
}
;
function getTodoById(todoId) {
    const indx = exports.todos.findIndex((todo) => {
        if (todo.id === todoId)
            return true;
        else
            return false;
    });
    if (indx === -1) {
        throw new Error(`there is no such id like - ${todoId}`);
    }
    ;
    return {
        indx: indx,
        data: exports.todos[indx]
    };
}
;
function getAllTodos(query) {
    if (!query.status) {
        return exports.todos;
    }
    const filteredTodos = exports.todos.filter((todo) => {
        if (query.status === todo.status) {
            return true;
        }
        else {
            return false;
        }
    });
    return filteredTodos;
}
//# sourceMappingURL=todo.model.js.map