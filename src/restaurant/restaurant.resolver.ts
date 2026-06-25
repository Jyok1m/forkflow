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
    private svc: RestaurantService,
    private tableSvc: TableService,
    private serviceSlotSvc: ServiceSlotService,
  ) {}

  // Get all restaurants from DB
  @Query(() => [Restaurant])
  async restaurants() {
    return this.svc.findAll();
  }

  // Get single restaurant by ID
  @Query(() => Restaurant)
  async restaurant(@Args('id', { type: () => Int }) id: number) {
    return this.svc.findOne({ id });
  }

  // Populate tables by restaurant
  @ResolveField('tables', () => [Table])
  async tables(@Parent() restaurant: Restaurant) {
    return this.tableSvc.findAllByQuery({ restaurantId: restaurant.id });
  }

  // Populate service slots by restaurant
  @ResolveField('serviceSlots', () => [ServiceSlot])
  async serviceSlots(@Parent() restaurant: Restaurant) {
    return this.serviceSlotSvc.findAllByQuery({
      restaurantId: restaurant.id,
    });
  }
}
