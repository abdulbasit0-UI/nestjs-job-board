import {  Args, Query, Resolver } from '@nestjs/graphql';


@Resolver()
export class HelloResolver {
    @Query(() => String) 
    hello(@Args('name', { nullable: true, defaultValue: 'World' }) name: string): string {
        return `Hello ${name}`;
    }


    
}