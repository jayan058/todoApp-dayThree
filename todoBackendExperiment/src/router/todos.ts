import express from "express";
import * as todosController from "../controller/todos";
import { authenticate } from "../middleware/auth";
const todoRoute = express();

todoRoute.get("/", authenticate, todosController.getAllTodos);

todoRoute.post("/addTodos", authenticate, todosController.addATodo);

todoRoute.put("/updateTodos/:id", authenticate, todosController.updateATodo);

todoRoute.delete("/deleteTodos/:id", authenticate, todosController.deleteATodo);

export default todoRoute;
