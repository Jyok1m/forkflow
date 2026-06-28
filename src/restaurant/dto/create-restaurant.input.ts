import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @Field()
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  line1!: string;

  @Field({ nullable: true })
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  line2?: string;

  @Field()
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  city!: string;

  @Field()
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  postCode!: string;

  @Field()
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  country!: string;
}
