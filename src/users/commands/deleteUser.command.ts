import { NotFoundException } from "@nestjs/common";
import { CommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";

export class DeleteUserCommand {
    constructor(
      public id: string
    ) { }

}
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements IQueryHandler<DeleteUserCommand>{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    public async execute(request: DeleteUserCommand): Promise<User>
    {
        return await this.userModel.deleteOne( {id : request.id});
    }
}