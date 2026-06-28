import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceSlot } from '../../generated/prisma/client';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ServiceSlotByReservationLoader {
  constructor(private readonly prisma: PrismaService) {}

  readonly loader = new DataLoader<number, ServiceSlot | null>(
    async (serviceSlotIds) => {
      const allServiceSlots = await this.prisma.serviceSlot.findMany({
        where: { id: { in: [...serviceSlotIds] } },
      });

      const byId = new Map<number, ServiceSlot>();
      for (const serviceSlot of allServiceSlots) {
        byId.set(serviceSlot.id, serviceSlot);
      }

      return serviceSlotIds.map((id) => byId.get(id) ?? null);
    },
  );
}
