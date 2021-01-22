import { GetUserByIdHandler } from "./getById.query";
import { ListHandler } from "./list.query";

export const QueryHandlers = [
    ListHandler,
    GetUserByIdHandler
];