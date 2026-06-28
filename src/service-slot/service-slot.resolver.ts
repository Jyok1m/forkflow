import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ServiceSlot } from './service-slot.model';
import { ServiceSlotService } from './service-slot.service';
import { Reservation } from '../reservation/reservation.model';
import { ReservationsByServiceSlotLoader } from './loaders/reservations-by-service-slot.loader';
import { RestaurantByServiceSlotLoader } from './loaders/restaurant-by-service-slot.loader';
import { Restaurant } from '../restaurant/restaurant.model';
import { ServiceSlotInput } from './dto/service-slot.input';
import { ServiceSlotWhereInput } from './dto/service-slot-where.input';

@Resolver(() => ServiceSlot)
export class ServiceSlotResolver {
  constructor(
    private serviceSlotService: ServiceSlotService,
    private restaurantByServiceSlot: RestaurantByServiceSlotLoader,
    private reservationsByServiceSlot: ReservationsByServiceSlotLoader,
  ) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => ServiceSlot)
  async createServiceSlot(@Args('data') data: ServiceSlotInput) {
    return this.serviceSlotService.create(data);
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  @Query(() => ServiceSlot)
  async serviceSlotByID(@Args('id', { type: () => Int }) id: number) {
    return this.serviceSlotService.findOne({ id });
  }

  @Query(() => [ServiceSlot])
  async serviceSlots(
    @Args('where', { nullable: true }) where?: ServiceSlotWhereInput,
  ) {
    return this.serviceSlotService.findMany(where);
  }

  /* ---------------------------------------------------------------- */
  /*                          Resolve Fields                          */
  /* ---------------------------------------------------------------- */

  @ResolveField('restaurant', () => Restaurant)
  async restaurant(@Parent() serviceSlot: ServiceSlot) {
    const { restaurantId } = serviceSlot;
    return this.restaurantByServiceSlot.loader.load(restaurantId);
  }

  // Bulk load for faster results
  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() serviceSlot: ServiceSlot) {
    const { id } = serviceSlot;
    return this.reservationsByServiceSlot.loader.load(id);
  }
}
