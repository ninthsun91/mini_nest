import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SigninUserDto } from './dto/signinData.dto';
import { SignupUserDto } from './dto/signupData.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly UserService: UsersService) {}
    
    @Post('/signup')
    async signup(@Body() signupData: SignupUserDto): Promise<User> {
        return await this.UserService.signup(signupData);
    }

    @Post('/signin')
    async signin(@Body() signinData: SigninUserDto): Promise<string> {
        return await this.UserService.signin(signinData);
    }

    @Get('/')
    async getAll(): Promise<User[]> {
        return await this.UserService.findAll();
    }

    @Get('/:userId')
    async getOne(@Param('userId') userId: string): Promise<User> {
        return
    }
}
