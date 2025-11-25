"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let todos = [];
const server = http_1.default.createServer(async (req, res) => {
    console.log('Request received', { url: req.url, method: req.method });
    let body = "";
    if (req.url === '/') {
        //root.page
        console.log("root page");
        ;
        res.writeHead(200, "home page sent successfully", {
            "content-type": "text/html",
        });
        // read the file
        const currentWorkingDirectory = process.cwd();
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/index.html");
        const fileContent = fs_1.default.readFileSync(filePath);
        console.log("file content", fileContent.toString());
        res.write(fileContent.toString());
        res.end();
    }
    else if (req.url === "/contact-us") {
        //contact us page
        console.log("contact us page");
        res.writeHead(200, "contact-us page sent successfully", {
            "content-type": "text/html",
        });
        const currentWorkingDirectory = process.cwd();
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/contact.html");
        const fileContent = fs_1.default.readFileSync(filePath);
        console.log("file content", fileContent.toString());
        res.write(fileContent);
        res.end(); //about us page and 404 page
    }
    else if (req.url === "/about-us") {
        console.log("about us page");
        res.writeHead(200, "about us page sent successfully", {
            "content-type": "text/html",
        });
        const currentWorkingDirectory = process.cwd();
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/about.html");
        const fileContent = fs_1.default.readFileSync(filePath);
        console.log("file content", fileContent.toString());
        res.write(fileContent);
        res.end();
    }
    else if (req.url === '/submit-form' && req.method === 'POST') {
        console.log("SUBMIT PAGE");
        async function processData() {
            return new Promise((resolve, reject) => {
                req.on("data", (data) => {
                    console.log("data received", data.toString());
                    body += data;
                    resolve("all data received");
                });
            });
        }
        await processData();
        async function processError() {
            return new Promise((resolve, reject) => {
                req.on("end", () => {
                    console.log("all data received");
                    resolve("ALL DATA RECEIVED");
                });
            });
        }
        await processError();
        res.writeHead(200, "form is submitted", { "content-type": "application/json" });
        res.write(JSON.stringify({
            message: "form submited successfully",
            data: JSON.parse(body),
        }));
        console.log("response sent");
        res.end();
    }
    else if (req.url === '/todos' && req.method === 'POST') {
        // 1.todos data type 
        let body = '';
        // 2.receive the data in req.body
        async function receiveData() {
            return new Promise((resolve, reject) => {
                req.on("data", (data) => {
                    body += data.toString();
                    resolve(data);
                });
            });
        }
        await receiveData();
        // data is received in binary form so change in json form
        const bodyJson = JSON.parse(body);
        // 3. save the data
        todos.push(bodyJson);
        console.log("todos:", todos);
        // 4. send the response
        res.writeHead(201, "todos created successfully!", {
            "content-type": "application/json",
        });
        res.write(JSON.stringify({
            message: "todo created!",
            data: bodyJson,
        }));
        res.end();
    }
    else if (req.url === '/todos' && req.method === 'GET') {
        // get data from array
        // send response
        res.writeHead(200, "todos fetched!", {
            "content-type": "application/json",
        });
        res.write(JSON.stringify({
            message: "todos fetched!",
            data: todos,
        }));
        res.end();
    }
    else if (req.url?.includes('/todos?id=') && req.method === 'DELETE') {
        // '/todos?id=1'
        // params=http://localhost:3000/todos/:id
        // query=http://localhost:3000/todos?id=1
        const url = req.url;
        console.log("delete a todo", url);
        const idNullable = url.split("=")[1]; // ['/todos?id', '1']
        console.log("id nullable:", idNullable);
        if (!idNullable) {
            res.writeHead(400, "id not valid", {
                "content-type": "application/json",
            });
            res.write(JSON.stringify({
                message: "send correct id",
            }));
            res.end();
            return;
        }
        const idNum = parseInt(idNullable);
        // check if todo exists with the given id in the array
        const todoFound = todos.find((todo) => {
            if (todo.id === idNum) {
                return true;
            }
            else {
                return false;
            }
        });
        if (!todoFound) {
            res.writeHead(400, "id not valid", {
                "content-type": "application/json",
            });
            res.write(JSON.stringify({
                message: "send correct id",
            }));
            res.end();
            return;
        }
        const updatedTodos = todos.filter((todo) => {
            if (todo.id == idNum) {
                return false;
            }
            else {
                return true;
            }
        });
        todos = updatedTodos;
        res.writeHead(200, "Todo deleted", {
            "content-type": "application/json",
        });
        res.write(JSON.stringify({
            message: "Todo deleted successfully!",
        }));
        res.end();
    }
    else if (req.url?.includes('/todos?id=') && req.method === 'GET') {
        const url = req.url;
        const idNullable = url.split("=")[1];
        console.log("id nullable:", idNullable);
        if (!idNullable) {
            res.writeHead(404, "no id found", {
                "content-type": "application/json",
            });
            res.write(JSON.stringify({
                message: "no id found send correct id",
            }));
            res.end();
            return;
        }
        const idNum = parseInt(idNullable);
        const todoFound = todos.find((todo) => {
            if (todo.id === idNum) {
                return true;
            }
            else {
                return false;
            }
        });
        if (!todoFound) {
            res.writeHead(404, "no id matched", {
                "content-type": "application/json",
            });
            res.write(JSON.stringify({
                message: "no id found in array send correct id",
            }));
            res.end();
        }
        const todobyid = todos.filter((todo) => {
            if (todo.id === idNum) {
                res.writeHead(200, "Todo fetched by id", {
                    "content-type": "application/json",
                });
                res.write(JSON.stringify({
                    message: "Todo fetched by id successfully!",
                    data: todoFound,
                }));
                res.end();
            }
        });
    }
    else if (req.url?.includes('/todos?id=') && req.method === 'PATCH') {
        let body = '';
        // getting id from link
        const url = req.url;
        const idNullable = url.split("=")[1];
        if (!idNullable) {
            res.writeHead(404, "enter correct id", {
                "content-type": "application/json",
            });
            res.write(JSON.stringify({
                message: "enter correct id",
            }));
            res.end();
            return;
        }
        const idNum = parseInt(idNullable);
        // getting body data
        async function collectData() {
            return new Promise((resolve, reject) => {
                req.on("data", (data) => {
                    body += data;
                    resolve(data);
                });
            });
        }
        await collectData();
        const bodyJson = JSON.parse(body);
        console.log("json data:", bodyJson);
        const index = todos.findIndex((todo) => todo.id === idNum);
        if (index === -1) {
            res.writeHead(404, "enter correct id", {
                "content-type": "application/json",
            });
            res.write(JSON.stringify({ message: "enter correct id" }));
            res.end();
            return;
        }
        todos[index] = bodyJson;
        res.writeHead(200, "Todo Updated", {
            "content-type": "application/json",
        });
        res.write(JSON.stringify({
            message: "Todo updated successfully!",
            data: todos[index],
        }));
        res.end();
    }
    else {
        res.writeHead(404, "page not found", {
            "content-type": "text/html"
        });
        res.write("<h1>404-page not found</h1>");
        res.end();
    }
});
server.listen(3000, () => {
    console.log('started server @ http://localhost:3000');
});
//# sourceMappingURL=main.js.map