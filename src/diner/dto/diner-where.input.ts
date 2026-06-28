import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class DinerWhereInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
