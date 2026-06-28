import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DinerService } from './diner.service';
import { Diner } from './diner.model';
import { BadRequestException } from '@nestjs/common';
import { CreateDinerInput } from './dto/create-diner.input';
import { DinerWhereInput } from './dto/diner-where.input';
import { ReservationsByDinerLoader } from './loaders/reservations-by-diner.loader';
import { Reservation } from '../reservation/reservation.model';

@Resolver(() => Diner)
export class DinerResolver {
  constructor(
    private dinerService: DinerService,
    private reservationsByDiner: ReservationsByDinerLoader,
  ) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => Diner)
  async createDiner(@Args('data') data: CreateDinerInput) {
    return this.dinerService.create(data);
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  @Query(() => Diner)
  async diner(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
    @Args('email', { nullable: true }) email?: string,
  ) {
    if (!id && !email) {
      throw new BadRequestException('Provide either id or email');
    }
    return this.dinerService.findOne(id ? { id } : { email });
  }

  @Query(() => [Diner])
  async diners(@Args('where', { nullable: true }) where?: DinerWhereInput) {
    return this.dinerService.findMany(where);
  }

  /* ---------------------------------------------------------------- */
  /*                          Resolve fields                          */
  /* ---------------------------------------------------------------- */

  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() diner: Diner) {
    const { id } = diner;
    return this.reservationsByDiner.loader.load(id);
  }
}
