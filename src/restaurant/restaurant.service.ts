import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Restaurant, Prisma } from '../generated/prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  // Get all restaurants from DB
  findAll() {
    return this.prisma.restaurant.findMany();
  }

  // Get single restaurant
  async findOne(input: Prisma.RestaurantWhereUniqueInput): Promise<Restaurant> {
    return await this.prisma.restaurant.findUniqueOrThrow({
      where: input,
    });
  }
}
