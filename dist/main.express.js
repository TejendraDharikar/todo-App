"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let todos = [];
const app = (0, express_1.default)();
app.use(express_1.default.json());
// routes
app.get('/', (req, res) => {
    // res.send("hello from express");
    res.json({
        message: "hello from express updated!"
    });
});
app.get('/contact-us', (req, res) => {
    res.send('<h1>hello from contact us</h1>');
    // res.json({
    // message:"hello from contact express updated!"});
});
app.post('/todos', (req, res) => {
    const body = req.body;
    todos.push(body);
    console.log("body", body);
    console.log("todos", todos);
    res.json({
        message: "postinghello done",
        todos,
    });
});
app.listen(4000, () => {
    console.log("listening on http://localhost:4000");
});
//# sourceMappingURL=main.express.js.map