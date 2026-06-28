import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import DataLoader from 'dataloader';
import { Restaurant } from '../../generated/prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class RestaurantByTableLoader {
  constructor(private readonly prisma: PrismaService) {}

  // Keys are restaurant ids (one per table). Single result per key.
  readonly loader = new DataLoader<number, Restaurant | null>(
    async (restaurantIds) => {
      const allRestaurants = await this.prisma.restaurant.findMany({
        where: { id: { in: [...restaurantIds] } },
      });

      const byId = new Map<number, Restaurant>();
      for (const restaurant of allRestaurants) {
        byId.set(restaurant.id, restaurant);
      }

      return restaurantIds.map((id) => byId.get(id) ?? null);
    },
  );
}
