import {
  Resolver,
  Query,
  Args,
  Int,
  Parent,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { DinerService } from './diner.service';
import { Diner } from './diner.model';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';
import { Status } from '../generated/prisma/enums';
import { BadRequestException } from '@nestjs/common';
import { CreateDinerInput } from './dto/create-diner.input';

@Resolver(() => Diner)
export class DinerResolver {
  constructor(
    private svc: DinerService,
    private reservationSvc: ReservationService,
  ) {}

  // Create new diner
  @Mutation(() => Diner)
  async createDiner(@Args('data') data: CreateDinerInput) {
    return this.svc.create(data);
  }

  @Query(() => [Diner])
  async diners() {
    return this.svc.findAll();
  }

  // Query 2 in 1 for diner fetching by id and email
  @Query(() => Diner, { nullable: true })
  async diner(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
    @Args('email', { type: () => String, nullable: true }) email?: string,
  ) {
    if (!id && !email) {
      throw new BadRequestException('Provide either id or email');
    }
    return this.svc.findOne(id ? { id } : { email });
  }

  @ResolveField('reservations', () => [Reservation])
  async reservations(
    @Parent() diner: Diner,
    @Args('status', { type: () => String, nullable: true })
    status?: Status,
  ) {
    return this.reservationSvc.findAllByQuery({
      dinerId: diner.id,
      ...(status ? { status } : {}),
    });
  }
}
