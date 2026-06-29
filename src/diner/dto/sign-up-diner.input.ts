import { Field, InputType } from '@nestjs/graphql';
import { CreateDinerInput } from './create-diner.input';
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SignUpDinerInput {
  @Field(() => CreateDinerInput)
  @ValidateNested()
  @Type(() => CreateDinerInput)
  diner!: CreateDinerInput;

  @Field()
  @IsString()
  @MinLength(8)
  password!: string;
}
