import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceSlot {
  @Field(() => Int) id!: number;
  @Field(() => Int) restaurantId!: number;
  @Field(() => String) date!: string;
  @Field(() => String) period!: string;
  @Field(() => String) openingTime!: string;
  @Field(() => String) closingTime!: string;
  @Field(() => Int) capacity!: number;
}
