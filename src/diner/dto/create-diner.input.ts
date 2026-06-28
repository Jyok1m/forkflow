import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateDinerInput {
  @Field()
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @Transform(({ value }: { value?: string }) => value?.toUpperCase().trim())
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Field()
  @IsPhoneNumber('FR')
  phone!: string;

  @Field()
  @Transform(({ value }: { value?: string }) => value?.toLowerCase().trim())
  @IsEmail()
  email!: string;
}
