import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Diner {
  @Field(() => Int) id!: number;
  @Field(() => String) email!: string;
  @Field(() => String) phone!: string;
  @Field(() => String) firstName!: string;
  @Field(() => String) lastName!: string;
}
