// companies.module.ts
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UserService], // Add both
  exports: [UserService],
})
export class UsersModule {}