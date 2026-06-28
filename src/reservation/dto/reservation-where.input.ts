import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Status } from '../../common/status.enum';

@InputType()
export class ReservationWhereInput {
  @Field(() => Int)
  @IsOptional()
  @IsInt()
  dinerId?: number;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  serviceSlotId?: number;

  @Field(() => Status)
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
