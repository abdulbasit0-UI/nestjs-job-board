import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";


@InputType()
export class SignUpInput {
    @Field()
    @IsString()
    firstName: string;

    @Field()
    @IsString()
    lastName: string;

    @Field()
    @IsEmail()
    email: string;


    @Field()
    @IsString()
    @MinLength(6)
    password: string;

}