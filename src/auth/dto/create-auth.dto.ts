import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAuthDto {
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
