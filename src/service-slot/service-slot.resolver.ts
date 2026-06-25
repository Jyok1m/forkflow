import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ServiceSlot } from './service-slot.model';
import { ServiceSlotService } from './service-slot.service';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';

@Resolver(() => ServiceSlot)
export class ServiceSlotResolver {
  constructor(
    private svc: ServiceSlotService,
    private reservationSvc: ReservationService,
  ) {}

  @Query(() => [ServiceSlot])
  async serviceSlots() {
    return this.svc.findAll();
  }

  @Query(() => ServiceSlot)
  async serviceSlot(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne({ id });
  }

  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() serviceSlot: ServiceSlot) {
    return this.reservationSvc.findAllByQuery({
      serviceSlotId: serviceSlot.id,
    });
  }
}
