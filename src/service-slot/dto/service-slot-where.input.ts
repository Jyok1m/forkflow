import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Period } from '../../common/period.enum';

@InputType()
export class ServiceSlotWhereInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  publicId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  restaurantPublicId?: string;

  @Field(() => Period, { nullable: true })
  @IsOptional()
  @IsEnum(Period)
  period?: Period;
}
