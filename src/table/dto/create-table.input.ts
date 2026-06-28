import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class CreateTableInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  number!: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  seats!: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  restaurantId!: number;
}
