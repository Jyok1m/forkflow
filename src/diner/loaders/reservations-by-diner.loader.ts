import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import DataLoader from 'dataloader';
import { Reservation } from '../../generated/prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class ReservationsByDinerLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly loader = new DataLoader<number, Reservation[]>(async (dinerIds) => {
    const allReservations = await this.prisma.reservation.findMany({
      where: { dinerId: { in: [...dinerIds] } },
    });

    const byDiner = new Map<number, Reservation[]>();
    for (const resa of allReservations) {
      const subList = byDiner.get(resa.dinerId) ?? [];
      subList.push(resa);
      byDiner.set(resa.dinerId, subList);
    }

    return dinerIds.map((id) => byDiner.get(id) ?? []);
  });
}
