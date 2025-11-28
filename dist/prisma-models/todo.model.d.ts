import { Prisma } from "../generated/prisma/client";
export declare function createTodo(data: Prisma.tasksCreateInput): Promise<{
    title: string;
    status: import("../generated/prisma/enums").TaskStatus;
    description: string | null;
    completed_at: Date | null;
    created_at: Date;
    updated_at: Date;
    id: number;
}>;
//# sourceMappingURL=todo.model.d.ts.map