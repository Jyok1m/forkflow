import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { TablesByRestaurantLoader } from './loaders/tables-by-restaurant.loader';
import { ServiceSlotsByRestaurantLoader } from './loaders/service-slots-by-restaurant.loader';

@Module({
  providers: [
    RestaurantResolver,
    RestaurantService,
    TablesByRestaurantLoader,
    ServiceSlotsByRestaurantLoader,
  ],
  exports: [RestaurantService],
})
export class RestaurantModule {}
