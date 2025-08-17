import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntityWithUUID } from "src/common/entities/base.entity";
import { Job } from "src/jobs/entities/job.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";



@ObjectType()
@Entity('applications')
@Index(['user', 'job'], { unique: true })

export class Application extends BaseEntityWithUUID {
    @ManyToOne(() => User, (user) => user.applications, { lazy: true })
    user: Promise<User>


    @ManyToOne(() => Job, (job) => job.applications, { lazy: true })
    job: Promise<Job>

    @Column({ type: 'text', nullable: true })
    @Field({ nullable: true })
    coverLetter?: string

    @Column({
        type: 'enum',
        enum: ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    })
    @Field()
    status: string



}
