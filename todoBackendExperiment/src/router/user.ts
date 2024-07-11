import express from "express";
import * as userController from "../controller/user";
import * as userMiddleware from "../middleware/auth";

const userRoute = express();

userRoute.post(
  "/",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.createAUser
);

userRoute.get(
  "/",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.seeAllUsers
);

userRoute.delete(
  "/:id",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.deleteAUser
);

userRoute.put(
  "/:id",
  userMiddleware.authenticate,
  userMiddleware.authorize(),
  userController.updateAUser
);

userRoute.get(
  "/:id",
  userMiddleware.authenticate,
  userController.fetchUserById
);

export default userRoute;
