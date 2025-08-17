import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CompaniesService } from "./companies.service";
import { UserConnection } from "src/users/dto/user-connection";
import { Company } from "./entities/company.entity";
import { Roles } from "src/auth/decorators/roles.decorator";
import { User, UserRole } from "src/users/entities/user.entity";
import { CreateCompanyInput } from "./dto/create-company.input";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { CompanyConnection } from "./dto/company-connection";


@Resolver()
@UseGuards(GqlAuthGuard)
export class CompaniesResolver {
    constructor(private readonly companiesService: CompaniesService) { }

    @Query(() => CompanyConnection) 
    async companies(@Args('limit', { type: () => Int, defaultValue: 20 }) limit: number, @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number) {
        const [nodes, totalCount] = await this.companiesService.findAll(limit, offset);
        return {
            nodes,
            totalCount,
        }
    }

    @Query(() => Company)
    async company(@Args('id') id: string) {
        return this.companiesService.findOne(id);
    }

    @Mutation(() => Company)
    @Roles(UserRole.RECRUITER, UserRole.ADMIN)
    async createCompany(@Args('input') input: CreateCompanyInput, @CurrentUser() user: User) {
        return this.companiesService.create(input, user.id);
    }

    @Mutation(() => Company)
    @Roles(UserRole.ADMIN) 
    async updateCompany(@Args('id') id: string, @Args('input') input: UpdateCompanyInput, @CurrentUser() user: User) {
        return this.companiesService.update(id, input, user.role);
    }

    @Mutation(() => Boolean)
    @Roles(UserRole.ADMIN)
    async deleteCompany(@Args('id') id: string, @CurrentUser() user: User) {
        return this.companiesService.remove(id, user.role);
    }

}