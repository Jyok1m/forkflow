import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Diner, Reservation } from '../generated/prisma/client';
import { Prisma } from '../generated/prisma/client';
import { CreateReservationInput } from './dto/create-reservervation.input';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateReservationInput) {
    const existing = await this.prisma.reservation.findFirst({
      where: {
        serviceSlotId: data.serviceSlotId,
        diner: { email: data.diner.email },
      },
    });

    if (existing) {
      throw new ConflictException('Reservation already exists');
    }

    return this.prisma.reservation.create({
      data: {
        pax: data.pax,
        serviceSlot: { connect: { id: data.serviceSlotId } },
        status: data.status,
        diner: {
          connectOrCreate: {
            where: { email: data.diner.email },
            create: {
              firstName: data.diner.firstName,
              lastName: data.diner.lastName,
              email: data.diner.email,
              phone: data.diner.phone,
            },
          },
        },
      },
      include: {
        serviceSlot: { include: { restaurant: true } },
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(where: Prisma.ReservationWhereInput): Promise<Reservation> {
    return this.prisma.reservation.findFirstOrThrow({ where });
  }

  async findMany(where?: Prisma.ReservationWhereInput): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where });
  }
}
