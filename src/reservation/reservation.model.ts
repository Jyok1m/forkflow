import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field(() => Int) id!: number;
  @Field(() => Int) dinerId!: number;
  @Field(() => Int) serviceSlotId!: number;
  @Field(() => Int) pax!: number;
  @Field(() => String) status!: string;
}
