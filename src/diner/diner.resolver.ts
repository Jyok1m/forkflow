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
  async diner(@Args('where') where: DinerWhereInput) {
    if (!where) {
      throw new BadRequestException('Provide either id, email or lastname');
    }
    return this.dinerService.findOne(where);
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
