import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation } from '../generated/prisma/client';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  // Get all reservations from DB
  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  // Get all reservations from a query
  async findAllByQuery(
    input: Prisma.ReservationWhereInput,
  ): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: input,
    });
  }

  // Get single reservation
  async findOne(
    input: Prisma.ReservationWhereUniqueInput,
  ): Promise<Reservation> {
    return this.prisma.reservation.findUniqueOrThrow({
      where: input,
    });
  }
}
