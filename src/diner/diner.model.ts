import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Diner {
  id!: number; // internal PK, not exposed (used by loaders)
  @Field(() => ID) publicId!: string;
  @Field() email!: string;
  @Field() phone!: string;
  @Field() firstName!: string;
  @Field() lastName!: string;
}
