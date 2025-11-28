export type statusType = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export interface Todo {
    id: number;
    title: string;
    status: statusType;
}
export declare let todos: Todo[];
export declare function createTodo(todoData: Todo): Todo;
export declare function updateTodo(todoId: number, body: Partial<Todo>): Todo | undefined;
export declare function deleteTodo(todoId: number): Todo[];
export declare function getTodoById(todoId: number): {
    indx: number;
    data: Todo | undefined;
};
export declare function getAllTodos(query: {
    status?: statusType;
}): Todo[];
//# sourceMappingURL=todo.model.d.ts.map