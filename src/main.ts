import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { GqlAuthGuard } from './auth/guards/gql-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json()); // Parse JSON bodies

  app.useGlobalGuards(new GqlAuthGuard(new Reflector()), new RolesGuard(new Reflector()));
 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
