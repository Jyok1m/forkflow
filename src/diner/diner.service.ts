import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Diner, Prisma } from '../generated/prisma/client';
import { CreateDinerInput } from './dto/create-diner.input';
import * as argon2 from 'argon2';

@Injectable()
export class DinerService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateDinerInput) {
    const { password, ...rest } = data;
    return this.prisma.diner.create({
      data: {
        ...rest,
        // guest vs registered
        passwordHash: password ? await argon2.hash(password) : null,
      },
    });
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
