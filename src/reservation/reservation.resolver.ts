import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.model';
import { Diner } from '../diner/diner.model';
import { ServiceSlot } from '../service-slot/service-slot.model';
import { CreateReservationInput } from './dto/create-reservervation.input';
import { ReservationWhereInput } from './dto/reservation-where.input';
import { DinerByReservationLoader } from './loaders/diner-by-reservation.loader';
import { ServiceSlotByReservationLoader } from './loaders/service-slot-by-reservation.loader';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    private reservationService: ReservationService,
    private dinerByReservation: DinerByReservationLoader,
    private serviceSlotByReservation: ServiceSlotByReservationLoader,
  ) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => Reservation)
  async createReservation(@Args('data') data: CreateReservationInput) {
    return this.reservationService.create(data);
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  @Query(() => Reservation)
  async reservationById(
    @Args('publicId', { type: () => ID }) publicId: string,
  ) {
    return this.reservationService.findOne({ publicId });
  }

  @Query(() => [Reservation])
  async reservations(
    @Args('where', { nullable: true }) where?: ReservationWhereInput,
  ) {
    return this.reservationService.findMany(where);
  }

  /* ---------------------------------------------------------------- */
  /*                          Resolve Fields                          */
  /* ---------------------------------------------------------------- */

  @ResolveField('diner', () => Diner)
  async diner(@Parent() reservation: Reservation) {
    return this.dinerByReservation.loader.load(reservation.dinerId);
  }

  @ResolveField('serviceSlot', () => ServiceSlot)
  async serviceSlot(@Parent() reservation: Reservation) {
    return this.serviceSlotByReservation.loader.load(reservation.serviceSlotId);
  }
}
