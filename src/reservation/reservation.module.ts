import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { DinerByReservationLoader } from './loaders/diner-by-reservation.loader';
import { ServiceSlotByReservationLoader } from './loaders/service-slot-by-reservation.loader';

@Module({
  providers: [
    ReservationResolver,
    ReservationService,
    DinerByReservationLoader,
    ServiceSlotByReservationLoader,
  ],
  exports: [ReservationService],
})
export class ReservationModule {}
