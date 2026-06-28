import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Diner, Prisma } from '../generated/prisma/client';
import { CreateDinerInput } from './dto/create-diner.input';
import * as argon2 from 'argon2';
import { LoginDinerInput } from './dto/login-diner.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DinerService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async login(data: LoginDinerInput) {
    const { email, password } = data;

    // Vérif email
    const diner = await this.prisma.diner.findUnique({ where: { email } });
    if (!diner || !diner.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérif password
    const valid = await argon2.verify(diner.passwordHash, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Token
    const payload = { sub: diner.id, email: diner.email };
    const accessToken = await this.jwt.signAsync(payload);

    return { accessToken, diner };
  }
}
