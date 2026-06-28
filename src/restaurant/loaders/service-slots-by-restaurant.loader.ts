import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import DataLoader from 'dataloader';
import { ServiceSlot } from '../../generated/prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class ServiceSlotsByRestaurantLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly loader = new DataLoader<number, ServiceSlot[]>(
    async (restaurantIds) => {
      const allServiceSlots = await this.prisma.serviceSlot.findMany({
        where: { restaurantId: { in: [...restaurantIds] } },
      });

      const byRestaurant = new Map<number, ServiceSlot[]>();
      for (const serviceSlot of allServiceSlots) {
        const list = byRestaurant.get(serviceSlot.restaurantId) ?? [];
        list.push(serviceSlot);
        byRestaurant.set(serviceSlot.restaurantId, list);
      }

      return restaurantIds.map((id) => byRestaurant.get(id) ?? []);
    },
  );
}
