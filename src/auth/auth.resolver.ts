import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth.payload';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Mutation(() => AuthPayload)
    @Public()
    signUp(@Args('input') input: SignUpInput){
        return this.authService.signUp(input)
    }

    @Mutation(() => AuthPayload)
    @Public()
    signIn(@Args('input') input: SignInInput){
        return this.authService.signIn(input)
    }
}


