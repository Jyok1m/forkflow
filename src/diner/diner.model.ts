import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Diner {
  @Field(() => Int) id!: number;
  @Field() email!: string;
  @Field() phone!: string;
  @Field() firstName!: string;
  @Field() lastName!: string;
}
