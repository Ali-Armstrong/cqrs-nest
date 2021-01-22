import { NotFoundException } from "@nestjs/common";
import { CommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";

export class UpdateUserCommand {
    constructor(
      public id: string,
      public firstName?: string,
      public age?: number,
      public isActive?: boolean
    ) { }

}
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements IQueryHandler<UpdateUserCommand>{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    public async execute(request: UpdateUserCommand): Promise<User>
    {
        const user = await this.userModel.findOne({id : request.id});
        if (!user)
          throw new NotFoundException('User does not exist');
        user.firstName = request.firstName || user.firstName;
        user.age = request.age || user.age;
        user.isActive = request.isActive|| user.isActive;
        return await this.userModel.updateOne( {id : request.id}, user );
    }
}