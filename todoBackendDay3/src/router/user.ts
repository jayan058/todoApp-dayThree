import express from "express";
import * as userController from "../controller/user";
import * as userMiddleware from "../middleware/auth";

const userRoute = express();

userRoute.post(
  "/",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.createUser
);

userRoute.get(
  "/",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.getUsers
);

userRoute.delete(
  "/:id",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.deleteUser
);

userRoute.put(
  "/:id",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.updateUser
);

userRoute.get(
  "/:id",
  userMiddleware.authenticate,
  userController.fetchUserById
);

export default userRoute;
