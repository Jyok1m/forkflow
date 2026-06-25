import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.model';
import { Diner } from '../diner/diner.model';
import { DinerService } from '../diner/diner.service';
import { ServiceSlotService } from '../service-slot/service-slot.service';
import { ServiceSlot } from '../service-slot/service-slot.model';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    private svc: ReservationService,
    private dinerSvc: DinerService,
    private serviceSlotSvc: ServiceSlotService,
  ) {}

  @Query(() => [Reservation])
  async reservations() {
    return this.svc.findAll();
  }

  @Query(() => Reservation)
  async reservation(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne({ id });
  }

  @ResolveField('diner', () => Diner)
  async diner(@Parent() reservation: Reservation) {
    return this.dinerSvc.findOne({ id: reservation.dinerId });
  }

  @ResolveField('serviceSlot', () => ServiceSlot)
  async serviceSlot(@Parent() reservation: Reservation) {
    return this.serviceSlotSvc.findOne({ id: reservation.serviceSlotId });
  }
}
