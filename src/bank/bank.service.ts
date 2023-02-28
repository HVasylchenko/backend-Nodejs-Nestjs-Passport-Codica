import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bank } from "./bank.entity";
import { Repository } from "typeorm";
import { CreateBankDto } from "./dto/create-bank.dto";


@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>
  ) {}
  s
  async create(dto: CreateBankDto): Promise<Bank> {
    return await this.bankRepository.save({ ...dto });
  }

  async getOne(id: number): Promise<Bank> {
    return await this.bankRepository.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Bank[]> {
    return await this.bankRepository.find();
  }

  async remove(id: number): Promise<any> {
    const bank = await this.bankRepository.findOne({
      where: { id: id },
      relations: ["transactions"],
    });
    if (bank.transactions.length === 0) {
      await this.bankRepository.delete({ id });
      return bank;
    } else {
      return " Some transaction contains this bank";
    }
  }

  async update(dto: CreateBankDto): Promise<Bank> {
    await this.bankRepository.update({ id: dto.id }, { name: dto.name });
    return await this.bankRepository.findOne({ where: { id: dto.id } });
  }
}
