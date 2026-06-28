import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceSlot {
  id!: number; // internal PK, not exposed
  restaurantId!: number; // internal FK, used by the restaurant loader
  @Field(() => ID) publicId!: string;
  @Field(() => String) date!: string;
  @Field(() => String) period!: string;
  @Field(() => String) openingTime!: string;
  @Field(() => String) closingTime!: string;
  @Field(() => Int) capacity!: number;
}
