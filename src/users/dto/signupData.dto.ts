import { IsString, IsOptional, IsAlphanumeric } from "class-validator";


export class SignupUserDto {

    @IsString()
    @IsAlphanumeric()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly confirm?: string;

    @IsString()
    @IsAlphanumeric()
    readonly nickname: string;
}