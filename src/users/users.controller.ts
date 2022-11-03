import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { SigninUserDto } from './dto/signinData.dto';
import { SignupUserDto } from './dto/signupData.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly UserService: UsersService) {}
    
    @Post('/signup')
    async signup(@Body() signupData: SignupUserDto): Promise<User> {
        try {
            const { username, password, confirm, nickname } = signupData;
            if (password !== confirm) {
                throw new HttpException('UNEQUAL PASSWORD', HttpStatus.BAD_REQUEST);
            }

            return await this.UserService.signup({ username, password, nickname });
        } catch(error: any) {
            if (error.message.match(/Duplicate entry/)) {
                throw new HttpException('DUPLICATED ENTRY', HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }

    @Post('/signin')
    async signin(@Body() signinData: SigninUserDto): Promise<Object> {
        const result = await this.UserService.signin(signinData);
        if (!result) {
            throw new HttpException('USER NOT FOUND', HttpStatus.BAD_REQUEST);
        }
        return { message: 'SUCCESS', token: 'isSomeRandomToken' };
    }

    @Get('/')
    async getAll(): Promise<User[]> {
        return await this.UserService.findAll();
    }

    @Get('/:userId')
    async getOne(@Param('userId') userId: number): Promise<User> {
        const user = await this.UserService.findOne(userId);
        if (!user) {
            throw new HttpException('USER NOT FOUND', HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    @Patch('/:userId')
    async updateNickname(
        @Param('userId') userId: number, 
        @Body() nickname: string): Promise<Boolean> {
        
        return await this.UserService.updateNickname(userId, nickname);
    }

    @Delete('/:userId')
    async deleteUser(@Param('userId') userId: number): Promise<Boolean> {
        return await this.UserService.remove(userId);
    }
}
