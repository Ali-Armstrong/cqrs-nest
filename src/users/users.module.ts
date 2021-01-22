import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './commands/_index';
import { QueryHandlers } from './queries/_index';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './users.controller';

@Module({
    imports: [
      CqrsModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [
        UserController
    ],
    providers: [
      ...QueryHandlers,
      ...CommandHandlers
    ]
})

export class UserModule { }