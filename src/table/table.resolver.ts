import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from './table.model';
import { CreateTableInput } from './dto/create-table.input';
import { BadRequestException } from '@nestjs/common';
import { TableWhereInput } from './dto/table-where.input';

@Resolver(() => Table)
export class TableResolver {
  constructor(private tableService: TableService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => Table)
  async createTable(@Args('data') data: CreateTableInput) {
    return this.tableService.create(data);
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  @Query(() => Table)
  async table(@Args('id', { type: () => Int }) id: number) {
    return this.tableService.findOne({ id });
  }

  // Utilisation de TableWhereInput comme type pour dire que l'entrée peut être n'importe quelle query Prisma Where
  @Query(() => [Table])
  async tables(@Args('where', { nullable: true }) where?: TableWhereInput) {
    if (where && !where.id && !where.seats) {
      throw new BadRequestException(
        'Provide either id or seats if using where query',
      );
    }

    return this.tableService.findMany(where);
  }
}
