"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDbConnection = appDbConnection;
const promise_1 = require("mysql2/promise");
async function appDbConnection() {
    const mysqlDb = await (0, promise_1.createConnection)({
        user: "root",
        password: "shero1234",
        port: 3307,
        host: "localhost",
        database: "todo_app",
    });
    return mysqlDb;
}
async function getAllDatabases() {
    const db = await appDbConnection();
    const result = await db.query(`SHOW DATABASES;`);
    console.log("RESULT", result);
}
// getAllDatabases();
//# sourceMappingURL=mysql.js.map