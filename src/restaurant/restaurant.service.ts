import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant, Prisma } from '../generated/prisma/client';
import { CreateRestaurantInput } from './dto/create-restaurant.input';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  async create(data: CreateRestaurantInput) {
    return this.prisma.restaurant.create({ data });
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  async findOne(where: Prisma.RestaurantWhereInput): Promise<Restaurant> {
    return this.prisma.restaurant.findFirstOrThrow({ where });
  }

  async findMany(where?: Prisma.RestaurantWhereInput): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({ where });
  }
}
