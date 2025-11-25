import express from "express";
import { todoRouters } from "./routers/todo.routers";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  // res.send("hello from express");
  res.json({
    message: "hello from express updated!"
  });
});

todoRouters(app);

app.listen(4000, () => {
  console.log("listening on http://localhost:4000");

});