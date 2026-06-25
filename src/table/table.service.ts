import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Table } from '../generated/prisma/client';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  // Get all tables from DB
  findAll() {
    return this.prisma.table.findMany();
  }

  // Get all tables from a query
  async findAllByQuery(input: Prisma.TableWhereInput): Promise<Table[] | []> {
    return this.prisma.table.findMany({
      where: input,
    });
  }

  // Get single table
  async findOne(input: Prisma.TableWhereUniqueInput): Promise<Table> {
    return await this.prisma.table.findUniqueOrThrow({
      where: input,
    });
  }
}
