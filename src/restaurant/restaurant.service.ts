import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant, Prisma } from '../generated/prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  // Get all restaurants from DB
  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  // Get single restaurant
  async findOne(input: Prisma.RestaurantWhereUniqueInput): Promise<Restaurant> {
    return this.prisma.restaurant.findUniqueOrThrow({
      where: input,
    });
  }
}
