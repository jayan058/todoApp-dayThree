import { NextFunction, Request, Response } from "express";
import * as userServices from "../services/user";

export async function createAUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, password, email } = req.body;
    const message = await userServices.createAUser(name, password, email);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

export async function fetchUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const message = await userServices.findUserById(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

export async function seeAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const message = userServices.seeAllUsers();
    res.json(message);
  } catch (error) {
    next(error);
  }
}

export async function deleteAUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const message = userServices.deleteAUser(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}

export async function updateAUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const { email, password } = req.body;
    const message = await userServices.updateAUser(email, password, id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}
