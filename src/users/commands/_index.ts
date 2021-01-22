import { AddUserHandler } from "./addUser.command";
import { DeleteUserHandler } from "./deleteUser.command";
import { UpdateUserHandler } from "./updateUser.command";

export const CommandHandlers = [
    AddUserHandler,
    UpdateUserHandler,
    DeleteUserHandler
];