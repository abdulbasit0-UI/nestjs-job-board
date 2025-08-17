import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntityWithUUID } from "src/common/entities/base.entity";
import { Job } from "src/jobs/entities/job.entity";
import { Column, Entity, ManyToMany } from "typeorm";


@ObjectType()
@Entity('skills')
export class Skill extends BaseEntityWithUUID {
    @Column()
    @Field()
    name: string;

    @ManyToMany(() => Job, (job) => job.skills, { lazy: true })
    jobs?: Promise<Job[]>

   
}