export type statusType="pending" | "in_progress" | "completed";

export interface Todo {
  id: number;
  title: string;
  status: statusType;
}

export let todos: Todo[] = [];

export function createTodo(todoData:Todo){
  todos.push(todoData);
  return todoData;
};

export function updateTodo(todoId:number,body:Partial<Todo>){
  const todo=getTodoById(todoId);
  if(!todo.data){
    throw new Error(`there is no such id like -${todoId}`);
  };
const updateTodos=todos.map((todo)=>{
  if(todoId===todo.id){
    return{
      ...todo,
      ...body
    }
  }else{
      return todo;
    };
});
todos=updateTodos;
return updateTodos[todo.indx];
};

export function deleteTodo(todoId:number){
   const todo=getTodoById(todoId);
  if(!todo.data){
    throw new Error(`there is no such id like -${todoId}`);
  };
  const splicedTodo= todos.splice(todo.indx,1);
  return splicedTodo;
};

export function getTodoById(todoId:number){
const indx = todos.findIndex((todo)=>{
  if(todo.id===todoId)
    return true;
  else return false;
});
if(indx===-1){
  throw new Error(`there is no such id like - ${todoId}`);
};

return {
  indx:indx,
  data:todos[indx]
};
};

export function getAllTodos(query:{status?:statusType}){
   if(!query.status){
    return todos;
   }
   const filteredTodos = todos.filter((todo)=>{
 if(query.status===todo.status){
  return true;
 }else{
  return false;
 }
   });
   return filteredTodos;
}