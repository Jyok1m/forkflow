import { Field, InputType, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsPositive, Matches } from 'class-validator';
import { Period } from '../../common/period.enum';

@InputType()
export class ServiceSlotInput {
  @Field(() => GraphQLISODateTime) // "2026-06-28"
  @IsDate()
  date!: Date;

  @Field(() => Period) // GraphQL enum xported
  @IsEnum(Period)
  period!: Period;

  @Field() // "19:30"
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'openingTime must be HH:mm (24h)',
  })
  openingTime!: string;

  @Field()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'closingTime must be HH:mm (24h)',
  })
  closingTime!: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  capacity!: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  restaurantId!: number;
}
