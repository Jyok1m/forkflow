import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ServiceSlot } from './service-slot.model';
import { ServiceSlotService } from './service-slot.service';

@Resolver()
export class ServiceSlotResolver {
  constructor(private service: ServiceSlotService) {}

  // Get all service slots
  @Query(() => [ServiceSlot])
  async serviceSlots() {
    return this.service.findAll();
  }

  // Get single service slot by ID
  @Query(() => ServiceSlot)
  async serviceSlot(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne({ id });
  }
}
