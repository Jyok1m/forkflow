import { Module } from '@nestjs/common';
import { TableResolver } from './table.resolver';
import { TableService } from './table.service';
import { RestaurantByTableLoader } from './loaders/restaurant-by-table.loader';

@Module({
  providers: [TableResolver, TableService, RestaurantByTableLoader],
  exports: [TableService],
})
export class TableModule {}
