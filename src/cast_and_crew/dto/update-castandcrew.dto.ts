import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCastAndCrewDto } from './create-castandcrew.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCastAndCrewDto extends PartialType(CreateCastAndCrewDto) {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  role: string;
}
