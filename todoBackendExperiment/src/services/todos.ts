import * as todosModels from "./../models/todos";
import { ITodo } from "./../interface/todo";

import * as userModels from "../models/users";

import NotFoundError from "../error/notFoundError";
import { NextFunction } from "express";
export function getAllTodos(user: any) {
  return todosModels.getAllTodos(user);
}

export function addATodo(todo: ITodo, headers: any) {
  const userId = headers.id; // Access user ID from headers safely
  const user = userModels.findUserById(userId);

  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  let message = todosModels.createATodo(todo, user);
  return message;
}
export function updateATodo(
  id: string,
  name: string,
  isDone: boolean,
  userId: string,
  next: NextFunction
) {
  let todo = todosModels.findTodoFromId(id);
  if (todo) {
    try {
      const message = todosModels.updateTodo(id, name, isDone, userId);
      return message;
    } catch (error) {
      next(error);
    }
  } else {
    throw new NotFoundError("Todo with that ID Doesnt exist");
  }
}

export function deleteATodo(id: string, userId: string, next: NextFunction) {
  let todo = todosModels.findTodoFromId(id);
  if (todo) {
    try {
      const message = todosModels.checkIfUserHasTodo(id, userId);
      return message;
    } catch (error) {
      next(error);
    }
  } else {
    throw new NotFoundError("Todo with that ID Doesnt exist");
  }
}

export function completedATodo(id: string) {
  const todo = todosModels.todos.find((todo) => todo.id === id);

  if (todo) {
    todo.isDone = true;
    return `Successfully updated Todo status with id ${id}`;
  } else {
    return "Oops Todo With That ID doesnt exist";
  }
}
