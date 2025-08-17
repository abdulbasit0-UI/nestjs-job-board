import {  TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Application } from "src/applications/entities/application.entity";
import { Company } from "src/companies/entities/company.entity";
import { Job } from "src/jobs/entities/job.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";


export const typeormConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [User, Company, Job, Application, Skill],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
    
})

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [User, Company, Job, Application, Skill],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
    migrationsTableName: 'migrations',
})