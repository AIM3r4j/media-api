import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CastAndCrew } from './castandcrew.schema';

@ObjectType()
@Schema({
  toJSON: {
    versionKey: false,
    transform: excludeProperties,
  },
  timestamps: true,
  collection: 'media',
})
export class Media extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  type: string; // 'movie' or 'tv_show'

  @Field(() => [CastAndCrew])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'CastAndCrew' }] })
  actors: CastAndCrew[];

  @Field()
  @Prop({ type: Types.ObjectId, ref: 'CastAndCrew' })
  director: CastAndCrew;

  @Field()
  @Prop({ type: Types.ObjectId, ref: 'CastAndCrew' })
  producer: CastAndCrew;

  @Field()
  @Prop()
  runtime: number;
}

export const MediaSchema = SchemaFactory.createForClass(Media);

function excludeProperties(doc: any, ret: any) {
  delete ret.createdAt;
  delete ret.updatedAt;
}
