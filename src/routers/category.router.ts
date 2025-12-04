import { Application } from "express";
import { getAllCategoriesController } from "../controllers/categories/getAllCategories.controller";
import { getCategoryByIdController } from "../controllers/categories/getCategoryById.controller";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { updateCategoryController } from "../controllers/categories/updateCategory.controller";
import { deleteCategoryController } from "../controllers/categories/deleteCategory.controller";


export function createCategoryRouter(app:Application){
app.get("/categoties",getAllCategoriesController);
app.get("/categories/:categoryId",getCategoryByIdController);
app.post("/categories",createCategoryController);
app.put("/categories/:categoryId",updateCategoryController);
app.delete("/categories/:categoryId",deleteCategoryController);
}