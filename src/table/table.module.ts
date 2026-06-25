import { forwardRef, Module } from '@nestjs/common';
import { TableResolver } from './table.resolver';
import { TableService } from './table.service';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [forwardRef(() => RestaurantModule)],
  providers: [TableResolver, TableService],
  exports: [TableService],
})
export class TableModule {}
