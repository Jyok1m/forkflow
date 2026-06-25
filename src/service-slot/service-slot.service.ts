import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ServiceSlot, Prisma } from '../generated/prisma/client';

@Injectable()
export class ServiceSlotService {
  constructor(private prisma: PrismaService) {}

  // Get all tables from DB
  async findAll(): Promise<ServiceSlot[]> {
    return this.prisma.serviceSlot.findMany();
  }

  // Get all tables from a query
  async findAllByQuery(
    input: Prisma.ServiceSlotWhereInput,
  ): Promise<ServiceSlot[]> {
    return this.prisma.serviceSlot.findMany({
      where: input,
    });
  }

  // Get single table
  async findOne(
    input: Prisma.ServiceSlotWhereUniqueInput,
  ): Promise<ServiceSlot> {
    return this.prisma.serviceSlot.findUniqueOrThrow({
      where: input,
    });
  }
}
