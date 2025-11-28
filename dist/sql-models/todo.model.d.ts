export type statusType = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export interface Todo {
    id: number;
    title: string;
    status: statusType;
    description: string;
    completed_at: string;
    created_at: string;
    updated_at: string;
    user_id: number;
}
export declare function createTodo(todoData: Todo): Promise<Todo>;
export declare function updateTodo(todoId: number, body: Partial<Todo>): Promise<Partial<Todo>>;
export declare function deleteTodo(todoId: number): Promise<import("mysql2").QueryResult>;
export declare function getTodoById(todoId: number): Promise<{
    data: Todo[];
}>;
export declare function getAllTodos(query: {
    status?: statusType;
}): Promise<import("mysql2").QueryResult>;
//# sourceMappingURL=todo.model.d.ts.map