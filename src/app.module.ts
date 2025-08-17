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
import { CompaniesModule } from './companies/companies.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/user.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault() as any],
      context: ({ req }: { req: unknown }) => ({ req }),
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    AuthModule,
    CompaniesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelloResolver, JwtStrategy],
})
export class AppModule { }
