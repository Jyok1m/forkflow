import { Module } from '@nestjs/common';
import { DinerResolver } from './diner.resolver';
import { DinerService } from './diner.service';
import { ReservationsByDinerLoader } from './loaders/reservations-by-diner.loader';

@Module({
  providers: [DinerResolver, DinerService, ReservationsByDinerLoader],
  exports: [DinerService],
})
export class DinerModule {}
