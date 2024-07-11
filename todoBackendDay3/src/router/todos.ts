import express from "express";
import * as todosController from "../controller/todos";
import { authenticate } from "../middleware/auth";
const todoRoute = express();

todoRoute.get("/", authenticate, todosController.getAllTodos);

todoRoute.post("/addTodos", authenticate, todosController.addTodo);

todoRoute.put("/updateTodos/:id", authenticate, todosController.updateTodo);

todoRoute.delete("/deleteTodos/:id", authenticate, todosController.deleteTodo);

export default todoRoute;
