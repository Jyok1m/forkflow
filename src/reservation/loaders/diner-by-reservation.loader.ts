import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Diner } from '../../generated/prisma/client';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class DinerByReservationLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly loader = new DataLoader<number, Diner | null>(async (dinerIds) => {
    const allDiners = await this.prisma.diner.findMany({
      where: { id: { in: [...dinerIds] } },
    });

    const byId = new Map<number, Diner>();
    for (const diner of allDiners) {
      byId.set(diner.id, diner);
    }

    return dinerIds.map((id) => byId.get(id) ?? null)
  });
}
