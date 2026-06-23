import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  line1!: string;

  @Field({ nullable: true })
  line2?: string;

  @Field()
  city!: string;

  @Field()
  postCode!: string;

  @Field()
  country!: string;
}
