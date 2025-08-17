import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntityWithUUID } from "src/common/entities/base.entity";
import { Job } from "src/jobs/entities/job.entity";
import { Column, Entity, OneToMany } from "typeorm";


@ObjectType()
@Entity('companies')
export class Company extends BaseEntityWithUUID {
   
    @Column()
    @Field()
    name: string;

    @Column({unique: true})
    @Field()
    slug: string;
    

    @Column({ type: 'text', nullable: true })
    @Field()
    description?: string;


    @OneToMany(() => Job, (job) => job.company, { lazy: true })
    jobs?: Promise<Job[]>

}