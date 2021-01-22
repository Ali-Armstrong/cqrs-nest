import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
// All we need is the id of the user we want to retrieve the data
export class GetUserByIdQuery {
    constructor(
      public id: string
    ) { }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements
    IQueryHandler<GetUserByIdQuery> {
    // We inject our TypeORM repository to fetch the user data
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    public async execute(query: GetUserByIdQuery): Promise<User> {
      // We fetch user data and return it on the execute method       
      return await this.userModel.findOne({id : query.id});
    }
}