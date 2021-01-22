import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  age: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  isActive: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);