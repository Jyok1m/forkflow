import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Status } from '../../common/status.enum';

@InputType()
export class ReservationWhereInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  dinerPublicId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  serviceSlotPublicId?: string;

  @Field(() => Status, { nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
