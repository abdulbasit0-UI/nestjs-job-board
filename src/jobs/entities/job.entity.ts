import { Field, ObjectType } from "@nestjs/graphql";
import { Application } from "src/applications/entities/application.entity";
import { BaseEntityWithUUID } from "src/common/entities/base.entity";
import { Company } from "src/companies/entities/company.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@ObjectType()
@Entity('jobs')
@Index(['status'])
@Index(['slug'])
export class Job extends BaseEntityWithUUID {
    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    slug: string;

    @Column({ type: 'text', nullable: true})
    @Field({ nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: ['OPEN', 'CLOSED', 'ARCHIVED'],
        default: 'OPEN',
    })

    @Field()
    status: string

    @ManyToOne(() => User, (user) => user.jobs, { lazy: true})
    @Field(() => User)
    postedBy: Promise<User>

    @ManyToOne(() => Company, (company) => company.jobs, { lazy: true})
    @Field(() => Company)
    company: Promise<Company>

   @OneToMany(() => Application, (application) => application.job, { lazy: true})
   @Field(() => [Application])
   applications: Promise<Application[]>

   @ManyToMany(() => Skill, (skill) => skill.jobs, { lazy: true})
   @Field(() => [Skill])
   skills: Promise<Skill[]>
}