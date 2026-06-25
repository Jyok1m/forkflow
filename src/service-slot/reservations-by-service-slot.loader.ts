import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Reservation } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class ReservationsByServiceSlotLoader {
  constructor(private prisma: PrismaService) {}

  readonly loader = new DataLoader<number, Reservation[]>(
    async (serviceSlotIds) => {
      // Request
      const rows = await this.prisma.reservation.findMany({
        where: { serviceSlotId: { in: [...serviceSlotIds] } },
      });

      // Sub groups
      const bySlot = new Map<number, Reservation[]>();
      for (const r of rows) {
        const list = bySlot.get(r.serviceSlotId) ?? [];
        list.push(r);
        bySlot.set(r.serviceSlotId, list);
      }

      // Render
      return serviceSlotIds.map((id) => bySlot.get(id) ?? []);
    },
  );
}
