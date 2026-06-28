import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Reservation } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class ReservationsByServiceSlotLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly loader = new DataLoader<number, Reservation[]>(
    async (serviceSlotIds) => {
      const allReservations = await this.prisma.reservation.findMany({
        where: { serviceSlotId: { in: [...serviceSlotIds] } },
      });

      const bySlot = new Map<number, Reservation[]>();
      for (const reservation of allReservations) {
        const list = bySlot.get(reservation.serviceSlotId) ?? [];
        list.push(reservation);
        bySlot.set(reservation.serviceSlotId, list);
      }

      return serviceSlotIds.map((id) => bySlot.get(id) ?? []);
    },
  );
}
