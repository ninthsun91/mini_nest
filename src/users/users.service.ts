import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SigninUserDto } from './dto/signinData.dto';
import { SignupUserDto } from './dto/signupData.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async signup(signupData: SignupUserDto): Promise<User> {
        return this.usersRepository.save(signupData);
    }

    async signin(signinData: SigninUserDto): Promise<User> {
        const { username, password } = signinData;

        const user = await this.usersRepository.findOneBy({ username });
        if (password !== user.password) {
            throw new HttpException('INCORRECT PASSWORD', HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({
            where: {}
        });
    }

    async findOne(userId: number): Promise<User> {
        return await this.usersRepository.findOneBy({ userId });
    }

    async updateNickname(userId: number, nickname: string): Promise<Boolean> {
        const { affected } = await this.usersRepository.update({ userId }, { nickname });
        return affected > 0 ? true : false;
    }

    async remove(userId: number): Promise<Boolean> {
        const { affected } = await this.usersRepository.delete(userId);
        return affected > 0 ? true : false;
    }
}
