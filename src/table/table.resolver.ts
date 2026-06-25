import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from './table.model';
import { Restaurant } from '../restaurant/restaurant.model';
import { RestaurantService } from '../restaurant/restaurant.service';

@Resolver(() => Table)
export class TableResolver {
  constructor(
    private service: TableService,
    private restaurantService: RestaurantService,
  ) {}

  // Get all tables
  @Query(() => [Table])
  async tables() {
    return this.service.findAll();
  }

  // Get single table by ID
  @Query(() => Table)
  async table(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne({ id });
  }

  // Populate restaurants by table
  @ResolveField('restaurant', () => Restaurant)
  async restaurants(@Parent() table: Table) {
    return this.restaurantService.findOne({ id: table.restaurantId });
  }
}
