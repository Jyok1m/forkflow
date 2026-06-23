import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Restaurant, Prisma } from '../generated/prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async findById(
    restaurantWhereUniqueInput: Prisma.RestaurantWhereUniqueInput,
  ): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: restaurantWhereUniqueInput,
    });
  }

  async find(): Promise<Restaurant[] | []> {
    return this.prisma.restaurant.findMany();
  }
}
