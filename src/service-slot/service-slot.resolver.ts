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
import { ReservationsByServiceSlotLoader } from './loaders/reservations-by-service-slot.loader';
import { Restaurant } from '../restaurant/restaurant.model';
import { RestaurantService } from '../restaurant/restaurant.service';

@Resolver(() => ServiceSlot)
export class ServiceSlotResolver {
  constructor(
    private serviceSlotService: ServiceSlotService,
    private restaurantService: RestaurantService,
    private reservationsLoader: ReservationsByServiceSlotLoader,
  ) {}

  @Query(() => [ServiceSlot])
  async serviceSlots() {
    return this.serviceSlotService.findAll();
  }

  @Query(() => ServiceSlot)
  async serviceSlot(@Args('id', { type: () => Int }) id: number) {
    return this.serviceSlotService.findOne({ id });
  }

  @ResolveField('restaurant', () => Restaurant)
  async restaurant(@Parent() serviceSlot: ServiceSlot) {
    return this.restaurantService.findOne({ id: serviceSlot.restaurantId });
  }

  // Bulk load for faster results
  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() serviceSlot: ServiceSlot) {
    return this.reservationsLoader.loader.load(serviceSlot.id);
  }
}
