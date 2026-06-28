import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Table } from '../generated/prisma/client';
import { CreateTableInput } from './dto/create-table.input';
import { TableWhereInput } from './dto/table-where.input';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateTableInput) {
    const { restaurantPublicId, ...rest } = data;
    return this.prisma.table.create({
      data: {
        ...rest,
        restaurant: { connect: { publicId: restaurantPublicId } },
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(where: Prisma.TableWhereInput): Promise<Table> {
    return this.prisma.table.findFirstOrThrow({ where });
  }

  async findMany(where?: TableWhereInput): Promise<Table[]> {
    return this.prisma.table.findMany({ where: this.toWhere(where) });
  }

  // Map the public-facing where input to a Prisma where (publicId based)
  private toWhere(where?: TableWhereInput): Prisma.TableWhereInput {
    if (!where) return {};
    const { publicId, seats, restaurantPublicId } = where;
    return {
      ...(publicId && { publicId }),
      ...(seats && { seats }),
      ...(restaurantPublicId && {
        restaurant: { publicId: restaurantPublicId },
      }),
    };
  }
}
