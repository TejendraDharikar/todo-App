import express from "express";
import { todoRouters } from "./routers/todo.routers";
import { createCategoryRouter } from "./routers/category.router";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  // res.send("hello from express");
  res.json({
    message: "hello from express updated!"
  });
});


todoRouters(app);
createCategoryRouter(app);

app.listen(4000, () => {
  console.log("listening on http://localhost:4000");

});