import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from './table.model';
import { CreateTableInput } from './dto/create-table.input';
import { BadRequestException } from '@nestjs/common';
import { TableWhereInput } from './dto/table-where.input';
import { Restaurant } from '../restaurant/restaurant.model';
import { RestaurantByTableLoader } from './loaders/restaurant-by-table.loader';

@Resolver(() => Table)
export class TableResolver {
  constructor(
    private tableService: TableService,
    private restaurantByTable: RestaurantByTableLoader,
  ) {}

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
  async table(@Args('publicId', { type: () => ID }) publicId: string) {
    return this.tableService.findOne({ publicId });
  }

  // Utilisation de TableWhereInput comme type pour dire que l'entrée peut être n'importe quelle query Prisma Where
  @Query(() => [Table])
  async tables(@Args('where', { nullable: true }) where?: TableWhereInput) {
    if (
      where &&
      !where.publicId &&
      !where.seats &&
      !where.restaurantPublicId
    ) {
      throw new BadRequestException(
        'Provide either publicId, seats or restaurantPublicId if using where query',
      );
    }

    return this.tableService.findMany(where);
  }

  /* ---------------------------------------------------------------- */
  /*                          Resolved fields                         */
  /* ---------------------------------------------------------------- */

  @ResolveField('restaurant', () => Restaurant)
  async restaurant(@Parent() table: Table) {
    const { restaurantId } = table;
    return this.restaurantByTable.loader.load(restaurantId);
  }
}
