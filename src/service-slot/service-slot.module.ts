import { Module } from '@nestjs/common';
import { ServiceSlotService } from './service-slot.service';
import { ServiceSlotResolver } from './service-slot.resolver';
import { ReservationsByServiceSlotLoader } from './reservations-by-service-slot.loader';

@Module({
  providers: [
    ServiceSlotService,
    ServiceSlotResolver,
    ReservationsByServiceSlotLoader, // ← la ligne manquante
  ],
  exports: [ServiceSlotService],
})
export class ServiceSlotModule {}
