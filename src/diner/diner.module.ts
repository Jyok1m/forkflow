import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DinerResolver } from './diner.resolver';
import { DinerService } from './diner.service';
import { ReservationsByDinerLoader } from './loaders/reservations-by-diner.loader';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DinerResolver, DinerService, ReservationsByDinerLoader],
  exports: [DinerService],
})
export class DinerModule {}
