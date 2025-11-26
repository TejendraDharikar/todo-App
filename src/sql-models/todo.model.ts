import { appDbConnection } from "../lib/mysql";

export type statusType = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Todo{
  id: number;
  title: string;
  status: statusType;
  description: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export async function createTodo(todoData: Todo) {
  const db = await appDbConnection();

  const result = db.query(
    `INSERT INTO
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
   );`
  );

  console.log("created todo result", result);
  return todoData;
}

export async function updateTodo(todoId:number,body:Partial<Todo>){
  const todo=await getTodoById(todoId);
  if(!todo.data){
    throw new Error(`there is no such id like -${todoId}`);
  };

  const db =await appDbConnection();
const result = await db.query(`
  UPDATE tasks
  set
  title="${body.title}",
  ${body.description?.length && body.description?.length>0 ? `description="${body.description}",` : ""}
  status="${body.status}",
  completed_at="${body.completed_at}"
  WHERE id="${todoId}" 
  `);

  console.log("updated result",result);
  
return body;
};

export async function deleteTodo(todoId:number){
   const todo= await getTodoById(todoId);
  if(!todo.data){
    throw new Error(`there is no such id like -${todoId}`);
  };
  const db= await appDbConnection();
  const result = await db.query(`
    DELETE FROM
     tasks 
     WHERE
      id=${todoId};
    `);
    console.log("deleted result",result);
    return result[0];
};

export async function getTodoById(todoId:number){
const db=await appDbConnection();

//@ts-ignore
// or extend okpacket in todo interface
// or do  as todo[] after result[0] and remove <todo[]>

const result=await db.query(`
  SELECT * FROM tasks
  WHERE id=${todoId};
  `);

  const todo=result[0] as Todo[];
console.log("get todo",todo);

if(todo.length===0){
  throw new Error(`there is no such id like - ${todoId}`);
};

return {
  data:todo,
};
};

export async function getAllTodos(query:{status?:statusType}){
   if(!query.status){
    const db= await appDbConnection();
    const result = await db.query(`SELECT * FROM TASKS;`);

    return result[0];
   }
   
   const db = await appDbConnection();
   const result =await db.query(`SELECT * FROM tasks WHERE status="${query.status}";`);

   return result[0];
  }
