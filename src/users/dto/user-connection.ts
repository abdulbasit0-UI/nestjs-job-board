import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";



@ObjectType()
export class UserConnection {
    @Field(() => [User])
    nodes: User[]

    @Field()
    totalCount: number;
}
