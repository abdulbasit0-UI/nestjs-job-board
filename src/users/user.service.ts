import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}


    async findAll(limit  = 20, offset = 0): Promise<[User[], number]> {
        return this.userRepository.findAndCount({
            take: limit,
            skip: offset,
            order: {createdAt: 'DESC'},
            withDeleted: false,
        })
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, withDeleted: false })

        if(!user) throw new NotFoundException("User not found")

        return user
    }

    async create(input: CreateUserInput): Promise<User> {
        const exists = await this.userRepository.findOne({ where: { email: input.email } })

        if(exists) throw new ConflictException("User already exists");

        const user = this.userRepository.create(input);

        return this.userRepository.save(user);
    } 

    async update(id: string, input: UpdateUserInput, actorId: string, actorRole: UserRole) {
        if(id !== actorId && actorRole !== UserRole.ADMIN) {
            throw new ForbiddenException("You are not allowed to update this user")
        }


        await this.userRepository.update(id, input);
        return this.findOne(id);
    }

    async softDelete(id: string, actorId: string, actorRole: UserRole) {
        if(id !== actorId && actorRole !== UserRole.ADMIN) {
            throw new ForbiddenException("You are not allowed to delete this user")
        }

        await this.userRepository.softDelete(id);
        return true;
    }
} 