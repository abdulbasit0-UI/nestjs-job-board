import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { UserRole } from "src/users/entities/user.entity";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.get<UserRole[]>('roles', context.getHandler());
        if (!required) {
            return true;
        }


        const ctx = GqlExecutionContext.create(context);

        const user = ctx.getContext().req.user;

        return required.includes(user.role)
    }

}