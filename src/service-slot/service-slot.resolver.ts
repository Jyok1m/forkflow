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
import { ReservationsByServiceSlotLoader } from './reservations-by-service-slot.loader';

@Resolver(() => ServiceSlot)
export class ServiceSlotResolver {
  constructor(
    private svc: ServiceSlotService,
    private reservationsLoader: ReservationsByServiceSlotLoader,
  ) {}

  @Query(() => [ServiceSlot])
  async serviceSlots() {
    return this.svc.findAll();
  }

  @Query(() => ServiceSlot)
  async serviceSlot(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne({ id });
  }

  // Bulk load for faster results
  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() serviceSlot: ServiceSlot) {
    return this.reservationsLoader.loader.load(serviceSlot.id);
  }
}
