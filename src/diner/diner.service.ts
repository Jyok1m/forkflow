import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Diner, Prisma } from '../generated/prisma/client';
import { CreateDinerInput } from './dto/create-diner.input';

@Injectable()
export class DinerService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateDinerInput) {
    return this.prisma.diner.create({ data });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(where: Prisma.DinerWhereInput): Promise<Diner> {
    return this.prisma.diner.findFirstOrThrow({ where });
  }

  async findMany(where?: Prisma.DinerWhereInput): Promise<Diner[]> {
    return this.prisma.diner.findMany({ where });
  }
}
