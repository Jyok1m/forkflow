import {
  Resolver,
  Query,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { DinerService } from './diner.service';
import { Diner } from './diner.model';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';

@Resolver(() => Diner)
export class DinerResolver {
  constructor(
    private svc: DinerService,
    private reservationSvc: ReservationService,
  ) {}

  @Query(() => [Diner])
  async diners() {
    return this.svc.findAll();
  }

  @Query(() => Diner)
  async diner(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne({ id });
  }

  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() diner: Diner) {
    return this.reservationSvc.findAllByQuery({ dinerId: diner.id });
  }
}
