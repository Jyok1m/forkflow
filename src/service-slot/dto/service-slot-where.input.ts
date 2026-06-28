import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Period } from '../../common/period.enum';

@InputType()
export class ServiceSlotWhereInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  id?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  restaurantId?: number;

  @Field(() => Period, { nullable: true })
  @IsOptional()
  @IsEnum(Period)
  period?: Period;
}
