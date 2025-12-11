import { Request,Response } from "express";
import { deleteUser } from "../../prisma-models/user.model";

export const deleteUserController = async (req: Request, res: Response) => {
 const paramsUserId = parseInt(req.params.userId as string);
   const userId=req.user?.id;

  if(!userId){
    res.status(401).json({
message:`u are not authorized`
    });
    return;
  };

  if(paramsUserId!==userId){
 res.status(401).json({
message:`you can only delete your user detail`
    });
    return;
  };

 const deletedUser = await deleteUser(userId);

   res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser,
  });
}
