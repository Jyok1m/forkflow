import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../restaurant/restaurant.model';

@ObjectType()
export class ServiceSlot {
  @Field(() => Int) id!: number;
  @Field(() => String) date!: string;
  @Field(() => String) period!: string;
  @Field(() => String) openingTime!: string;
  @Field(() => String) closingTime!: string;
  @Field(() => Restaurant) restaurant!: Restaurant;
  @Field(() => Int) capacity!: number;
}
