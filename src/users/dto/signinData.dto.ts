import { PartialType } from "@nestjs/mapped-types";
import { SignupUserDto } from "./signupData.dto";


export class SigninUserDto extends PartialType(SignupUserDto) {}