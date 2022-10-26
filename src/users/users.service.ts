import { Injectable } from '@nestjs/common';
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

    async signin(signinData: SigninUserDto): Promise<string> {
        const { username, password } = signinData;

        const user = await this.usersRepository.findOneBy({ username });
        if (password !== user.password) {
            throw new Error('INCORRECT PASSWORD');
        }

        return 'LOGIN SUCCESS';
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({
            where: {}
        });
    }

    async findOne(userId: number): Promise<User> {
        return await this.usersRepository.findOneBy({ userId });
    }

    async remove(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
    }
}
