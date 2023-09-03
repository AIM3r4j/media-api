import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAuthDto extends PartialType(CreateAuthDto) {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
