import { forwardRef, Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';
import { DinerModule } from '../diner/diner.module';
import { ServiceSlotModule } from '../service-slot/service-slot.module';

@Module({
  imports: [forwardRef(() => DinerModule), ServiceSlotModule],
  providers: [ReservationResolver, ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
