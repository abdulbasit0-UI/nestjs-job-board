import  { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import {  Field, ID } from '@nestjs/graphql';


export abstract class BaseEntityWithUUID {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}