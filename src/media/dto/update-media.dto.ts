import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field(() => [String])
  @IsArray()
  actors: [string];

  @Field()
  @IsString()
  director: string;

  @Field()
  @IsString()
  producer: string;

  @Field()
  @IsNotEmpty()
  runtime: number;
}
