import { IQueryHandler } from "@nestjs/cqrs/dist";
import { QueryHandler } from "@nestjs/cqrs/dist/decorators/query-handler.decorator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";

export class ListUsersQuery {
    constructor(
      public page: number = 1,
      public pageSize: number = 10
    ) { }
}


@QueryHandler(ListUsersQuery)
export class ListHandler implements IQueryHandler<ListUsersQuery> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  public async execute(query: ListUsersQuery): Promise<User[]> {
    // Here we are going to have any necessary logic related
    // to that Query and return the request information
    // such as a service method call
    return this.userModel.find().exec();;
  }
}