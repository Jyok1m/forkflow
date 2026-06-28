import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Table {
  id!: number; // internal PK, not exposed
  restaurantId!: number; // internal FK, used by the restaurant loader
  @Field(() => ID) publicId!: string;
  @Field(() => Int) number!: number;
  @Field(() => Int) seats!: number;
}
