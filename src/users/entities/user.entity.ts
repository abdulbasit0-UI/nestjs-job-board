import { Entity, Column, Index, OneToMany } from 'typeorm';

import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

import { BaseEntityWithUUID } from 'src/common/entities/base.entity';


import { Job } from 'src/jobs/entities/job.entity';
import { Application } from 'src/applications/entities/application.entity';


export enum UserRole {
    ADMIN = 'ADMIN',
    RECRUITER = 'RECRUITER',
    CANDIDATE = 'CANDIDATE'
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity('users')
@Index(['email'], { unique: true })
export class User extends BaseEntityWithUUID {
    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CANDIDATE })
    @Field(() => UserRole)
    role: UserRole;

    @OneToMany(() => Job, (job) => job.postedBy, { lazy: true })
    jobs?: Promise<Job[]>

    @OneToMany(() => Application, (application) => application.user, { lazy: true })
    applications?: Promise<Application[]>

}