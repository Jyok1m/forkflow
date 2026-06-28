import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
import { ServiceSlot } from '../service-slot/service-slot.model';
import { Table } from '../table/table.model';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { RestaurantWhereInput } from './dto/restaurant-where.input';
import { BadRequestException } from '@nestjs/common';
import { TablesByRestaurantLoader } from './loaders/tables-by-restaurant.loader';
import { ServiceSlotsByRestaurantLoader } from './loaders/service-slots-by-restaurant.loader';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private restaurantService: RestaurantService,
    private tablesByRestaurant: TablesByRestaurantLoader,
    private serviceSlotsByRestaurant: ServiceSlotsByRestaurantLoader,
  ) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => Restaurant)
  async createRestaurant(@Args('data') data: CreateRestaurantInput) {
    return this.restaurantService.create(data);
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  // Only one (find first or throw)
  @Query(() => Restaurant)
  async restaurant(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
    @Args('name', { type: () => String, nullable: true }) name?: string,
  ) {
    if (!id && !name) {
      throw new BadRequestException('Provide either id or name');
    }

    return this.restaurantService.findOne(id ? { id } : { name });
  }

  // All
  @Query(() => [Restaurant])
  async restaurants(
    @Args('where', { nullable: true }) where?: RestaurantWhereInput,
  ) {
    return this.restaurantService.findMany(where);
  }

  /* ---------------------------------------------------------------- */
  /*                          Resolved fields                         */
  /* ---------------------------------------------------------------- */

  // Tables by restaurant
  @ResolveField('tables', () => [Table])
  async tables(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.tablesByRestaurant.loader.load(id);
  }

  // Service slots by restaurant
  @ResolveField('serviceSlots', () => [ServiceSlot])
  async serviceSlots(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.serviceSlotsByRestaurant.loader.load(id);
  }
}
