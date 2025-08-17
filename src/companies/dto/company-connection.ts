import { Field, ObjectType } from "@nestjs/graphql";
import { Company } from "../entities/company.entity";


@ObjectType()
export class CompanyConnection {
    @Field(() => [Company])
    nodes: Company[]

    @Field()
    totalCount: number;
}
