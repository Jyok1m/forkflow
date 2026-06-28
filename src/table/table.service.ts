import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Table } from '../generated/prisma/client';
import { CreateTableInput } from './dto/create-table.input';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateTableInput) {
    return this.prisma.table.create({ data });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(where: Prisma.TableWhereInput): Promise<Table> {
    return this.prisma.table.findFirstOrThrow({ where });
  }

  async findMany(where?: Prisma.TableWhereInput): Promise<Table[]> {
    return this.prisma.table.findMany({ where });
  }
}
