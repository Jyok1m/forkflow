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
import { Restaurant } from '../restaurant/restaurant.model';
import { RestaurantService } from '../restaurant/restaurant.service';

@Resolver(() => ServiceSlot)
export class ServiceSlotResolver {
  constructor(
    private svc: ServiceSlotService,
    private restaurantSvc: RestaurantService,
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

  @ResolveField('restaurant', () => Restaurant)
  async restaurant(@Parent() serviceSlot: ServiceSlot) {
    return this.restaurantSvc.findOne({ id: serviceSlot.restaurantId });
  }

  // Bulk load for faster results
  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() serviceSlot: ServiceSlot) {
    return this.reservationsLoader.loader.load(serviceSlot.id);
  }
}
