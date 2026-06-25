import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Diner, Prisma } from '../generated/prisma/client';

@Injectable()
export class DinerService {
  constructor(private prisma: PrismaService) {}

  // Get all diners from DB
  async findAll(): Promise<Diner[]> {
    return this.prisma.diner.findMany();
  }

  // Get all diners from a query
  async findAllByQuery(input: Prisma.DinerWhereInput): Promise<Diner[]> {
    return this.prisma.diner.findMany({
      where: input,
    });
  }

  // Get single diner
  async findOne(input: Prisma.DinerWhereUniqueInput): Promise<Diner> {
    return this.prisma.diner.findUniqueOrThrow({
      where: input,
    });
  }
}
