import { ITodo } from "./../interface/todo";
import { users, findUserById } from "./users";
export type todos = {
  id: string;
  name: string;
  isDone: boolean;
};
import NotFoundError from "../error/notFoundError";
export let todos: todos[] = [];

export function getAllTodos(user: any) {
  // Find the user from users array
  const foundUser = users.find((u) => u.id === user.id);
  // If user is not found, return an empty array or handle appropriately
  if (!foundUser) {
    return [];
  }

  // Filter todos based on user's todo IDs
  const userTodos = todos.filter((todo) => foundUser.todos.includes(todo.id));
  return userTodos;
}

export function createATodo(todo: ITodo, user: users) {
  const newTodo: todos = {
    id: String(todos.length + 1),
    ...todo,
  };
  // Add new todo to todos array
  todos.push(newTodo);
  // Update user's todos list
  user.todos.push(newTodo.id);
  return newTodo;
}

export function findTodoFromId(id: string) {
  return todos.find((todo) => todo.id === id);
}

export function checkIfUserHasTodo(id: string, userId: string) {
  let foundUser: users | undefined;
  foundUser = findUserById(userId);
  if (foundUser) {
    const todoIndex = foundUser.todos.indexOf(id);
    if (todoIndex !== -1) {
      foundUser.todos.splice(todoIndex, 1);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      todos.length = 0; // Clear the original array
      todos.push(...updatedTodos);
      return `Successfully deleted Todo with id ${id}`;
    } else {
      throw new NotFoundError("Todo with that ID doesnt exist in your list");
    }
  } else {
    throw new NotFoundError("User Not Found");
  }
}

export function updateTodo(
  id: string,
  name: string,
  isDone: boolean,
  userId: string
) {
  let foundUser: users | undefined;
  foundUser = findUserById(userId);
  if (foundUser) {
    const todoIndex = foundUser.todos.indexOf(id);
    if (todoIndex != -1) {
      let todo = findTodoFromId(id)!;
      todo.name = name;
      todo.isDone = isDone;
      return todo;
    } else {
      throw new NotFoundError("Todo with that ID doesnt exist in your list");
    }
  } else {
    throw new NotFoundError("User Not Found");
  }
}
