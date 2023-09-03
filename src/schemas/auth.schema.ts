import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
export class Token {
  @Field(() => String)
  access_token: string;
}

@ObjectType()
@Schema({
  toJSON: {
    versionKey: false,
    transform: excludeProperties,
  },
  timestamps: true,
  collection: 'auth',
})
export class Auth extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field(() => [String])
  @Prop({ required: true })
  roles: string[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

function excludeProperties(doc: any, ret: any) {
  delete ret.createdAt;
  delete ret.updatedAt;
}
