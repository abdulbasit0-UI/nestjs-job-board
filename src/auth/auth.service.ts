import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { SignUpInput } from './dto/sign-up.input';
import { AuthPayload } from './dto/auth.payload';
import * as bcrypt from 'bcrypt'
import { SignInInput } from './dto/sign-in.input';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwt: JwtService,
    ) { }

    async signUp(input: SignUpInput): Promise<AuthPayload> {
        const existing = await this.userRepository.findOne({ where: { email: input.email } })

        if (existing) {
            throw new ConflictException("User already exists")
        }

        const hashed = await bcrypt.hash(input.password, 10)
        const user = this.userRepository.create({
            ...input, password: hashed
        })

        await this.userRepository.save(user)

        return {
            accessToken: this.jwt.sign({ id: user.id, role: user.role }),
            user,
        }

    }

    async signIn(input: SignInInput): Promise<AuthPayload> {
        const user = await this.userRepository.findOne({ where: { email: input.email, }, select: ['password', 'id', 'role'] })

        if (!user || !(await bcrypt.compare(input.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials')
        }

        return {
            accessToken: this.jwt.sign({ id: user.id, role: user.role }),
            user,
        }
    }

    async validateUserById(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id }, select: ['id', 'email', 'role'] })
    }
}
