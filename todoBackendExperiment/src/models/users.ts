import { User } from "../interface/user";

export type users = {
  id: string;
  name: string;
  password: string;
  email: string;
  todos: string[];
  permission: string[];
};

export let users: users[] = [
  {
    id: "1",
    name: "jayan",
    password: "$2b$10$z/92iZB5uuHVB.5Nwa2DRuV/VCSS8jZMTAnV.IcZzbWm7Jqn7rjMK",
    email: "jayan@jayan.com",
    todos: [],
    permission: ["super admin"],
  },
];

export function createAUser(name: string, password: string, email: string) {
  const id = (users.length + 1).toString();
  const newUser: users = {
    id,
    name,
    password,
    email,
    todos: [],
    permission: [],
  };
  users.push(newUser);
  return newUser;
}

export function findAUser(email: string) {
  return users.find((user) => user.email === email);
}

export function findUserById(id: string) {
  return users.find((user) => user.id == id);
}

export function seeAllUsers() {
  return users;
}

export function deleteAUser(user: User) {
  users = users.filter((existingUser) => existingUser.id !== user.id);
}

export function updateAUser(user: users, email: string, password: string) {
  user.email = email;
  user.password = password;
  return user;
}
