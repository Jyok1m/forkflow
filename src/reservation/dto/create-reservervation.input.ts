import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, ValidateNested } from 'class-validator';
import { Status } from '../../common/status.enum';
import { CreateDinerInput } from '../../diner/dto/create-diner.input';
import { Type } from 'class-transformer';

@InputType()
export class CreateReservationInput {
  @Field(() => CreateDinerInput)
  @ValidateNested()
  @Type(() => CreateDinerInput)
  diner!: CreateDinerInput;

  @Field(() => Int)
  @IsInt()
  serviceSlotId!: number;

  @Field(() => Int)
  @IsInt()
  pax!: number;

  @Field(() => Status)
  @IsEnum(Status)
  status!: Status;
}
