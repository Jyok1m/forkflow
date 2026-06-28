import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  id!: number; // internal PK, not exposed (used by loaders)
  @Field(() => ID) publicId!: string;
  @Field() name!: string;
  @Field() line1!: string;
  @Field({ nullable: true }) line2?: string;
  @Field() city!: string;
  @Field() postCode!: string;
  @Field() country!: string;
}
