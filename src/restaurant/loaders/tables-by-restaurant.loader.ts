import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import DataLoader from 'dataloader';
import { Table } from '../../generated/prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class TablesByRestaurantLoader {
  constructor(private prisma: PrismaService) {}

  readonly loader = new DataLoader<number, Table[]>(async (restaurantIds) => {
    // Find all tables for each restaurant
    const allTables = await this.prisma.table.findMany({
      where: { restaurantId: { in: [...restaurantIds] } },
    });

    // Group those tables by restaurant ID
    const byRestaurant = new Map<number, Table[]>();
    for (const table of allTables) {
      const list = byRestaurant.get(table.restaurantId) ?? []; // retrieve correct restaurant ID entry
      list.push(table);
      byRestaurant.set(table.restaurantId, list);
    }

    // console.log(restaurantIds.map((id) => byRestaurant.get(id) ?? []));
    return restaurantIds.map((id) => byRestaurant.get(id) ?? []);
  });
}
