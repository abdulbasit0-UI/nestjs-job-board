import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloResolver } from './hello/hello.resolver';
import { typeormConfig } from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './auth/guards/gql-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req }: { req: unknown }) => ({ req }),
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver, JwtStrategy],
})
export class AppModule { }
