import { forwardRef, Module } from '@nestjs/common';
import { DinerResolver } from './diner.resolver';
import { DinerService } from './diner.service';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [forwardRef(() => ReservationModule)],
  providers: [DinerResolver, DinerService],
  exports: [DinerService],
})
export class DinerModule {}
