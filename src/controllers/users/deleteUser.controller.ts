import { Request,Response } from "express";
import { deleteUser } from "../../prisma-models/user.model";

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId as string);
 const deletedUser = await deleteUser(userId);

   res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser,
  });
}
