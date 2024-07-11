import { NextFunction, Request, Response } from "express";
import * as todoServices from "./../services/todos";
interface AuthenticatedRequest extends Request {
  user?: { id: string; name: string; email: string };
}
export function getAllTodos(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let data = todoServices.getAllTodos(req.user);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
export function addATodo(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, user } = req;
    let data = todoServices.addATodo(body, user);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
export function updateATodo(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const { name, isDone } = req.body;
    const userId = req.user!.id;
    const message = todoServices.updateATodo(id, name, isDone, userId, next);
    res.json({ message });
  } catch (error) {
    next(error);
  }
}
export function deleteATodo(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const userId = req.user!.id;
    let message = todoServices.deleteATodo(id, userId, next);
    res.json(message);
  } catch (error) {
    next(error);
  }
}
export function completedTodo(req: Request, res: Response) {
  const id = req.params.id;
  let message = todoServices.completedATodo(id);
  res.json(message);
}
