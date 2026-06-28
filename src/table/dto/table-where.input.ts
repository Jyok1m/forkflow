import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

@InputType()
export class TableWhereInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  publicId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  seats?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  restaurantPublicId?: string;
}
