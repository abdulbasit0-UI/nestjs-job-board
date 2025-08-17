import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Repository } from "typeorm";
import { CreateCompanyInput } from "./dto/create-company.input";
import slugify from "slugify";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { UserRole } from "src/users/entities/user.entity";



@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>
    ) { }

    async findAll(limit = 20, offset = 0) {
        return this.companyRepository.findAndCount({
            take: limit,
            skip: offset,
        })
    }

    async findOne(id: string) {
        const company = await this.companyRepository.findOne({ where: { id } })

        if (!company) throw new NotFoundException("Company not found")

        return company
    }

    async create(input: CreateCompanyInput, userId: string) {
        const slug = slugify(input.name, { lower: true });

        return this.companyRepository.save({ ...input, slug })
    }

    async update(id: string, input: UpdateCompanyInput, actorRole: UserRole) {
        if(actorRole !== UserRole.ADMIN) {
            throw new ForbiddenException("You are not allowed to update this company")
        }

        await this.companyRepository.update(id, input);
        return this.findOne(id);
    }

    async remove(id: string, actorRole: UserRole) {
        if(actorRole !== UserRole.ADMIN) {
            throw new ForbiddenException("You are not allowed to delete this company")
        }

        await this.companyRepository.delete(id);
        return true;
    }
}