import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Mongoose } from "mongoose";
import { AddUserCommand, AddUserHandler } from "./commands/addUser.command";
import { ListUsersQuery } from "./queries/list.query";
import { User } from "./schema/user.schema";

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  @Get()
  public async getAllUsers(
    @Query() request: ListUsersQuery,
    @Res() response
  ) {
  
    const users = await this.queryBus.execute(
      new ListUsersQuery(
        request.page,
        request.pageSize
      )
    );
    response.status(HttpStatus.OK).json(users);
  }

  @Post()
  public async addUser(
    @Body() data: AddUserCommand,
    @Res() response
  ) {
  
    const users = await this.commandBus.execute(
      new AddUserCommand(
        data.id,
        data.firstName,
        data.lastName,
        data.age,
        data.isActive
      )
    );
    response.status(HttpStatus.OK).json(users);
  }
}