import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class LoginDinerInput {
  @Field()
  @Transform(({ value }: { value?: string }) => value?.toLowerCase().trim())
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  @MinLength(8)
  password!: string;
}
