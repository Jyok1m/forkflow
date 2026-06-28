import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsUUID, ValidateNested } from 'class-validator';
import { Status } from '../../common/status.enum';
import { CreateDinerInput } from '../../diner/dto/create-diner.input';
import { Type } from 'class-transformer';

@InputType()
export class CreateReservationInput {
  @Field(() => CreateDinerInput)
  @ValidateNested()
  @Type(() => CreateDinerInput)
  diner!: CreateDinerInput;

  @Field(() => ID)
  @IsUUID()
  serviceSlotPublicId!: string;

  @Field(() => Int)
  @IsInt()
  pax!: number;

  @Field(() => Status)
  @IsEnum(Status)
  status!: Status;
}
