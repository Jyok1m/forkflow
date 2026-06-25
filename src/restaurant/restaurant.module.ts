import { forwardRef, Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { TableModule } from '../table/table.module';
import { ServiceSlotModule } from '../service-slot/service-slot.module';

@Module({
  imports: [forwardRef(() => TableModule), ServiceSlotModule],
  providers: [RestaurantResolver, RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
