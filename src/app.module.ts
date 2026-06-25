import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TableModule } from './table/table.module';
import { DinerModule } from './diner/diner.module';
import { ReservationModule } from './reservation/reservation.module';
import { ServiceSlotModule } from './service-slot/service-slot.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PrismaModule,
    RestaurantModule,
    TableModule,
    DinerModule,
    ReservationModule,
    ServiceSlotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
