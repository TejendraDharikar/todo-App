import { CreateCategoryInput } from "../controllers/categories/createCategory.controller";
import { UpdateCategoryInput } from "../controllers/categories/updateCategory.controller";
import { prisma } from "../lib/prisma";

export async function getAllCategories(){
  const category=await prisma.categories.findMany();
  return category;
};

export async function getCategoryById(id:number){
const category = await prisma.categories.findUnique({
  where:{
    id
  }
});

if (!category){
  throw new Error(`category with id-${id} not found`);
}

return category;
};

export async function createCategory(data:CreateCategoryInput){
 const createdCategory=await prisma.categories.create({
    data:{
      title:data.title,
    description:data.description||null,
    },
  });

  return createCategory;
};

export async function updateCategory(id:number,data:UpdateCategoryInput){

  const categoryFound= await getCategoryById(id);

  const updatedCategory=await prisma.categories.update({
    where:{
      id,
    },
    data:{
      title:data.title||categoryFound.title,
      description:data.description||categoryFound.description,
    }
  });
  return updatedCategory;
};

export async function deleteCategory(id:number){

  const categoryFound= await getCategoryById(id);

  const deletedCategory=await prisma.categories.delete({
    where:{
      id,
    },
  });
  return deletedCategory;
};