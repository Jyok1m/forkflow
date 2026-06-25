import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';
import { ServiceSlot } from '../service-slot/service-slot.model';
import { ServiceSlotService } from '../service-slot/service-slot.service';
import { TableService } from '../table/table.service';
import { Table } from '../table/table.model';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private service: RestaurantService,
    private tableService: TableService,
    private serviceSlotService: ServiceSlotService,
  ) {}

  // Get all restaurants from DB
  @Query(() => [Restaurant])
  restaurants() {
    return this.service.findAll();
  }

  // Get single restaurant by ID
  @Query(() => Restaurant)
  async restaurant(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne({ id });
  }

  // Populate service slots by restaurant
  @ResolveField('tables', () => [Table])
  async tables(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.tableService.findAllByQuery({ restaurantId: id });
  }

  // Populate service slots by restaurant
  @ResolveField('serviceSlots', () => [ServiceSlot])
  async serviceSlots(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.serviceSlotService.findAllByQuery({ restaurantId: id });
  }
}
