import {  UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { UserService } from "./user.service";
import { UserConnection } from "./dto/user-connection";
import { Roles } from "src/auth/decorators/roles.decorator";
import { User, UserRole } from "./entities/user.entity";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { UpdateUserInput } from "./dto/update-user.input";


@Resolver()
@UseGuards(GqlAuthGuard)
export class UsersResolver {
    constructor(private readonly userService: UserService) { }
    @Query(() => UserConnection)
    @Roles(UserRole.ADMIN)
    async users(@Args('limit', { type: () => Int, defaultValue: 20 }) limit: number, @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number) {
        const [nodes, totalCount] = await this.userService.findAll(limit, offset);
        return {
            nodes,
            totalCount, 
        }
    }

    @Query(() => User) 
    async me(@CurrentUser() user: User) {
        console.log(user)
        return this.userService.findOne(user.id);
    }

    @Mutation(() => User) 
    async updateProfile(@CurrentUser() user: User, @Args('input') input: UpdateUserInput) {
        return this.userService.update(user.id, input, user.id, user.role);
    }

    @Mutation(() => Boolean) 
    async deleteProfile(@CurrentUser() user: User) {
        await this.userService.softDelete(user.id, user.id, user.role);
        return true;
    }

    


}