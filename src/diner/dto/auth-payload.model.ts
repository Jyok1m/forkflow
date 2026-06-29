import { Field, ObjectType } from '@nestjs/graphql';
import { Diner } from '../diner.model';

@ObjectType()
export class AuthPayload {
  @Field() accessToken!: string;
  @Field(() => Diner) diner!: Diner;
}
