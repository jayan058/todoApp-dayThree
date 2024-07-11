import { Request, Response, NextFunction } from "express";
import * as authServices from "../services/auth";

import { User } from "../interface/user";

import ForbiddenError from "../error/forbiddenError";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    await authServices.login(email, password, res);
  } catch (error) {
    next(error);
  }
}

export async function handleTokenRefresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.body;
  if (!token) {
    return next(new ForbiddenError("Refresh token missing"));
  }
  if (!authServices.isRefreshTokenValid(token)) {
    return next(new ForbiddenError("Invalid refresh token"));
  }
  try {
    const user = (await authServices.verifyRefreshToken(token)) as User;
    const accessToken = authServices.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    res.json({ accessToken });
  } catch (err) {
    return next(new ForbiddenError("Forbidden"));
  }
}
