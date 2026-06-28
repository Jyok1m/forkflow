import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class DinerWhereInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  publicId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}
