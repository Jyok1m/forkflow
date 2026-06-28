import { forwardRef, Module } from '@nestjs/common';
import { ServiceSlotService } from './service-slot.service';
import { ServiceSlotResolver } from './service-slot.resolver';
import { ReservationsByServiceSlotLoader } from './loaders/reservations-by-service-slot.loader';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [forwardRef(() => RestaurantModule)],
  providers: [
    ServiceSlotService,
    ServiceSlotResolver,
    ReservationsByServiceSlotLoader,
  ],
  exports: [ServiceSlotService],
})
export class ServiceSlotModule {}
