import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  id!: number; // internal PK, not exposed
  dinerId!: number; // internal FK, used by the diner loader
  serviceSlotId!: number; // internal FK, used by the service slot loader
  @Field(() => ID) publicId!: string;
  @Field(() => Int) pax!: number;
  @Field(() => String) status!: string;
}
