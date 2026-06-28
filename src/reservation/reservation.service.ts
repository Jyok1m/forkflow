import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation } from '../generated/prisma/client';
import { Prisma } from '../generated/prisma/client';
import { CreateReservationInput } from './dto/create-reservervation.input';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateReservationInput) {
    return this.prisma.reservation.create({ data });
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
