import * as todosModels from "./../models/todos";
import { ITodo } from "./../interface/todo";
import { todos } from "./../models/todos";
import * as userModels from "../models/users";
import UnauthorizedError from "../error/unauthorizedError";
import NotFoundError from "../error/notFoundError";
import { NextFunction } from "express";
export function getAllTodos(user: any) {
  return todosModels.getAllTodos(user);
}
export function addTodo(todo: ITodo, headers: any) {
  const userId = headers.id; // Access user ID from headers safely
  const user = userModels.findUserById(userId);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  let message = todosModels.createTodo(todo, user);
  return message;
}
export function updateTodo(
  id: string,
  name: string,
  isDone: boolean,
  userId: string,
  next: NextFunction
) {
  let todo = todosModels.findTodoFromId(id);
  if (todo) {
    const foundUser = userModels.findUserById(userId);
    if (foundUser) {
      let todoIndex = todosModels.findIfTodoBelongsToUser(foundUser, id)!;
      if (todoIndex != -1) {
        todo.isDone = isDone;
        todo.name = name;
        return todo;
      } else {
        throw new UnauthorizedError("Cannot update someone else's Todo");
      }
    } else {
      throw new NotFoundError("User not found");
    }
  } else {
    throw new NotFoundError("Todo with that ID Doesnt exist");
  }
}
export function deleteTodo(id: string, userId: string) {
  let todo = todosModels.findTodoFromId(id);
  if (todo) {
    const foundUser = userModels.findUserById(userId);
    if (foundUser) {
      let todoIndex = todosModels.findIfTodoBelongsToUser(foundUser, id)!;
      if (todoIndex != -1) {
        foundUser.todos.splice(todoIndex, 1);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        todos.length = 0;
        todos.push(...updatedTodos);
        return "Successfully deleted Todo";
      } else {
        throw new UnauthorizedError("Cannot delete someone else's Todo");
      }
    } else {
      throw new NotFoundError("User not found");
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
