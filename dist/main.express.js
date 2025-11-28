"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_routers_1 = require("./routers/todo.routers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    // res.send("hello from express");
    res.json({
        message: "hello from express updated!"
    });
});
(0, todo_routers_1.todoRouters)(app);
app.listen(4000, () => {
    console.log("listening on http://localhost:4000");
});
//# sourceMappingURL=main.express.js.map