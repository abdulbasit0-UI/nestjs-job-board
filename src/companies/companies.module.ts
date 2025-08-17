// companies.module.ts
import { Module } from '@nestjs/common';
import { CompaniesResolver } from './companies.resolver';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesResolver, CompaniesService], // Add both
  exports: [CompaniesService],
})
export class CompaniesModule {}