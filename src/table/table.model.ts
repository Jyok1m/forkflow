import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../restaurant/restaurant.model';

@ObjectType()
export class Table {
  @Field(() => Int) id!: number;
  @Field(() => Int) number!: number;
  @Field(() => Int) seats!: number;
  @Field(() => Restaurant) restaurant!: Restaurant;
}
