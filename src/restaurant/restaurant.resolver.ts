import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => Restaurant, { nullable: true })
  async restaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findById({ id });
  }

  @Query(() => [Restaurant])
  async restaurants() {
    return this.restaurantService.find();
  }
}
