import * as userModels from "../models/users";
import ConflictError from "../error/conflictError";
const bcrypt = require("bcrypt");
import NotFoundError from "../error/notFoundError";
import ValidationError from "../error/validationError";
import { User } from "../interface/user";
export async function createAUser(
  name: string,
  password: string,
  email: string
) {
  if (!userModels.findAUser(email)) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      let data = userModels.createAUser(name, hashedPassword, email);
      return data;
    } catch (error) {
      throw new ValidationError("Error creating user", " ");
    }
  } else {
    throw new ConflictError("Email already taken");
  }
}

export async function findUserById(id: string) {
  let foundUser: User | undefined;
  foundUser = userModels.findUserById(id);
  if (foundUser) {
    return foundUser;
  } else {
    throw new NotFoundError("No user with that id");
  }
}

export function seeAllUsers() {
  let users = userModels.seeAllUsers();
  if (users) {
    return users;
  } else {
    throw new NotFoundError("No users created to show");
  }
}

export function deleteAUser(id: string) {
  let foundUser: User | undefined;
  foundUser = userModels.findUserById(id);
  if (foundUser) {
    userModels.deleteAUser(foundUser);
    return "Successfully deleted user";
  } else {
    throw new NotFoundError("No user with that id");
  }
}

export async function updateAUser(email: string, password: string, id: string) {
  let foundUser: userModels.users | undefined;
  foundUser = userModels.findUserById(id);
  if (foundUser) {
    const existingUser = userModels.findAUser(email);
    if (existingUser && existingUser.id !== foundUser.id) {
      throw new ConflictError("Email already taken");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Update the user
      let data = userModels.updateAUser(foundUser, email, hashedPassword);
      return data;
    }
  } else {
    throw new NotFoundError("No user with that ID");
  }
}
