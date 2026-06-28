import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation } from '../generated/prisma/client';
import { Prisma } from '../generated/prisma/client';
import { CreateReservationInput } from './dto/create-reservervation.input';
import { ReservationWhereInput } from './dto/reservation-where.input';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateReservationInput) {
    const existing = await this.prisma.reservation.findFirst({
      where: {
        serviceSlot: { publicId: data.serviceSlotPublicId },
        diner: { email: data.diner.email },
      },
    });

    if (existing) {
      throw new ConflictException('Reservation already exists');
    }

    try {
      return await this.prisma.reservation.create({
        data: {
          pax: data.pax,
          serviceSlot: { connect: { publicId: data.serviceSlotPublicId } },
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
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Reservation already exists');
      }
      throw e;
    }
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(where: Prisma.ReservationWhereInput): Promise<Reservation> {
    return this.prisma.reservation.findFirstOrThrow({ where });
  }

  async findMany(where?: ReservationWhereInput): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: this.toWhere(where) });
  }

  // Map the public-facing where input to a Prisma where (publicId based)
  private toWhere(
    where?: ReservationWhereInput,
  ): Prisma.ReservationWhereInput {
    if (!where) return {};
    const { dinerPublicId, serviceSlotPublicId, status } = where;
    return {
      ...(status && { status }),
      ...(dinerPublicId && { diner: { publicId: dinerPublicId } }),
      ...(serviceSlotPublicId && {
        serviceSlot: { publicId: serviceSlotPublicId },
      }),
    };
  }
}
