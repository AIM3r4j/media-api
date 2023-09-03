import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({
  toJSON: {
    versionKey: false,
    transform: excludeProperties,
  },
})
export class CastAndCrew extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  type: string; // 'cast' or 'crew'

  @Field()
  @Prop({ required: true })
  role: string;
}

export const CastAndCrewSchema = SchemaFactory.createForClass(CastAndCrew);

function excludeProperties(doc: any, ret: any) {
  delete ret.createdAt;
  delete ret.updatedAt;
}
