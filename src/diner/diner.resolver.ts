import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DinerService } from './diner.service';
import { Diner } from './diner.model';
import { BadRequestException } from '@nestjs/common';
import { CreateDinerInput } from './dto/create-diner.input';
import { DinerWhereInput } from './dto/diner-where.input';
import { ReservationsByDinerLoader } from './loaders/reservations-by-diner.loader';
import { Reservation } from '../reservation/reservation.model';
import { LoginDinerInput } from './dto/login-diner.input';
import { AuthPayload } from './dto/auth-payload.model';
import { SignUpDinerInput } from './dto/sign-up-diner.input';

@Resolver(() => Diner)
export class DinerResolver {
  constructor(
    private dinerService: DinerService,
    private reservationsByDiner: ReservationsByDinerLoader,
  ) {}

  /* ---------------------------------------------------------------- */
  /*                              Creates                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => Diner)
  async createDiner(@Args('data') data: CreateDinerInput) {
    return this.dinerService.create(data);
  }

  /* ---------------------------------------------------------------- */
  /*                               Reads                              */
  /* ---------------------------------------------------------------- */

  @Query(() => Diner)
  async diner(@Args('where') where: DinerWhereInput) {
    if (!where) {
      throw new BadRequestException(
        'Provide either publicId, email or lastName',
      );
    }
    return this.dinerService.findOne(where);
  }

  @Query(() => [Diner])
  async diners(@Args('where', { nullable: true }) where?: DinerWhereInput) {
    return this.dinerService.findMany(where);
  }

  /* ---------------------------------------------------------------- */
  /*                          Resolve fields                          */
  /* ---------------------------------------------------------------- */

  @ResolveField('reservations', () => [Reservation])
  async reservations(@Parent() diner: Diner) {
    const { id } = diner;
    return this.reservationsByDiner.loader.load(id);
  }

  /* ---------------------------------------------------------------- */
  /*                              Account                             */
  /* ---------------------------------------------------------------- */

  @Mutation(() => AuthPayload)
  async signIn(@Args('data') data: LoginDinerInput) {
    return this.dinerService.signIn(data);
  }

  @Mutation(() => AuthPayload)
  async signUp(@Args('data') data: SignUpDinerInput) {
    return this.dinerService.signUp(data);
  }
}
