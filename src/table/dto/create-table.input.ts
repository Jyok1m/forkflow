import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

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

  @Field(() => ID)
  @IsUUID()
  restaurantPublicId!: string;
}
