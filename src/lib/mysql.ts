import { createConnection } from "mysql2/promise";

export async function appDbConnection(){

const mysqlDb =await createConnection({
  user:"root",
  password:"shero1234",
  port:3307,
  host:"localhost",
  database:"todo_app",
});

return mysqlDb;
}

async function getAllDatabases(){
  const db=await appDbConnection();
 const result= await db.query(`SHOW DATABASES;`);
 console.log("RESULT",result);
}

// getAllDatabases();