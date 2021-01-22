import { CommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ListUsersQuery } from "../queries/list.query";
import { User, UserDocument } from "../schema/user.schema";

export class AddUserCommand {
    constructor(
      public id: string,
      public firstName: string,
      public lastName: string,
      public age : number,
      public isActive : Boolean
    ) { }
}

@CommandHandler(AddUserCommand)
export class AddUserHandler implements IQueryHandler<AddUserCommand> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    public async execute(user: AddUserCommand): Promise<User> {
      // Here we are going to have any necessary logic related
      // to that Command and do any change operations
      const createdUser = new this.userModel(user);
      return createdUser.save();
    }
}