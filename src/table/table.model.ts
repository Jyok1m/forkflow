import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Table {
  @Field(() => Int) id!: number;
  @Field(() => Int) number!: number;
  @Field(() => Int) seats!: number;
  @Field(() => Int) restaurantId!: number;
}
