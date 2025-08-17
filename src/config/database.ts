import {  TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Application } from "src/applications/entities/application.entity";
import { Company } from "src/companies/entities/company.entity";
import { Job } from "src/jobs/entities/job.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";


export const typeormConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'job_board_dev',
    synchronize: false,
    entities: [User, Company, Job, Application, Skill],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
    
})

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'job_board_dev',
    synchronize: false,
    entities: [User, Company, Job, Application, Skill],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
    migrationsTableName: 'migrations',
})