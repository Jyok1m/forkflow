import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceSlot, Prisma } from '../generated/prisma/client';
import { ServiceSlotInput } from './dto/service-slot.input';
import { ServiceSlotWhereInput } from './dto/service-slot-where.input';

@Injectable()
export class ServiceSlotService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: ServiceSlotInput) {
    const { restaurantPublicId, ...rest } = data;
    return this.prisma.serviceSlot.create({
      data: {
        ...rest,
        restaurant: { connect: { publicId: restaurantPublicId } },
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(
    where: Prisma.ServiceSlotWhereUniqueInput,
  ): Promise<ServiceSlot> {
    return this.prisma.serviceSlot.findUniqueOrThrow({ where });
  }

  async findMany(where?: ServiceSlotWhereInput): Promise<ServiceSlot[]> {
    return this.prisma.serviceSlot.findMany({ where: this.toWhere(where) });
  }

  // Map the public-facing where input to a Prisma where (publicId based)
  private toWhere(
    where?: ServiceSlotWhereInput,
  ): Prisma.ServiceSlotWhereInput {
    if (!where) return {};
    const { publicId, restaurantPublicId, period } = where;
    return {
      ...(publicId && { publicId }),
      ...(period && { period }),
      ...(restaurantPublicId && {
        restaurant: { publicId: restaurantPublicId },
      }),
    };
  }
}
