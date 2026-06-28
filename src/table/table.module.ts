import { forwardRef, Module } from '@nestjs/common';
import { TableResolver } from './table.resolver';
import { TableService } from './table.service';

@Module({
  providers: [TableResolver, TableService],
  exports: [TableService],
})
export class TableModule {}
