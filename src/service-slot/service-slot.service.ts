import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceSlot, Prisma } from '../generated/prisma/client';
import { ServiceSlotInput } from './dto/service-slot.input';

@Injectable()
export class ServiceSlotService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: ServiceSlotInput) {
    return this.prisma.serviceSlot.create({ data });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(
    where: Prisma.ServiceSlotWhereUniqueInput,
  ): Promise<ServiceSlot> {
    return this.prisma.serviceSlot.findUniqueOrThrow({ where });
  }

  async findMany(where?: Prisma.ServiceSlotWhereInput): Promise<ServiceSlot[]> {
    return this.prisma.serviceSlot.findMany({ where });
  }
}
