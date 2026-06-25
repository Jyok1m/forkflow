import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantResolver } from './restaurant/restaurant.resolver';
import { RestaurantService } from './restaurant/restaurant.service';
import { TableResolver } from './table/table.resolver';
import { TableService } from './table/table.service';
import { ServiceSlotResolver } from './service-slot/service-slot.resolver';
import { ServiceSlotService } from './service-slot/service-slot.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RestaurantResolver,
    RestaurantService,
    TableResolver,
    TableService,
    ServiceSlotResolver,
    ServiceSlotService,
    PrismaService,
  ],
})
export class AppModule {}
