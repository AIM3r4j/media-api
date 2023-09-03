import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  roles: string[];
}
