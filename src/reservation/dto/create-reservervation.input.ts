import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
import { Status } from '../../common/status.enum';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  @IsInt()
  dinerId!: number;

  @Field(() => Int)
  @IsInt()
  serviceSlotId!: number;

  @Field(() => Int)
  @IsInt()
  pax!: number;

  @Field()
  @IsEnum(Status)
  status!: Status;
}
