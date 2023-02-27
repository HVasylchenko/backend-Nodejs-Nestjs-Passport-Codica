import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { Between } from "typeorm";

import { Repository } from "typeorm";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { HttpService } from "@nestjs/axios";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from "nestjs-typeorm-paginate";
import { CreateRequestDto } from "./dto/create-request.dto";
import { CategorysService } from "src/category/category.service";
import { BanksService } from "src/bank/bank.service";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly categoryServise: CategorysService,
    private readonly bankServise: BanksService,
    private readonly httpService: HttpService
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    // https://webhook.site/#!/8a75dca4-28d7-4a19-83e1-f070f979c4f4
    this.httpService
      .post("https://webhook.site/8a75dca4-28d7-4a19-83e1-f070f979c4f4", dto)
      .subscribe({
        complete: () => {
          console.log("webhook completed", dto);
        },
        error: (err) => {
          console.log(err);
        },
      });

    const transaction = new Transaction();
    transaction.amount = dto.amount;
    const category = await this.categoryServise.getOne(dto.categoryId);
    const bank = await this.bankServise.getOne(dto.bankId);
    transaction.type = dto.type;
    transaction.category = category;
    transaction.categoryName = category.name;
    transaction.bank = bank;
    transaction.bankName = bank.name
    return await this.transactionRepository.save({ ...transaction });
  }

  async getOne(id: number): Promise<Transaction> {
    const trans =  await this.transactionRepository.findOne({ where: { id: id } });
    console.log(trans.bank, trans.category)
    return await this.transactionRepository.findOne({ where: { id: id } });
  }

  async paginate(
    options: IPaginationOptions
  ): Promise<Pagination<Transaction>> {
    const queryBuilder = this.transactionRepository.createQueryBuilder("c");
    queryBuilder.orderBy("id", "DESC");
    return paginate<Transaction>(queryBuilder, options);
  }

  async remove(id: number): Promise<Transaction> {
    const category = await this.transactionRepository.findOne({
      where: { id: id },
    });
    await this.transactionRepository.delete({ id });
    return category;
  }

  async request(dto: CreateRequestDto): Promise<any> {
    const category = await this.categoryServise.getOne(dto.categoryIds)
    const transArr = await this.transactionRepository.find({
      where: {
        category: { name: category.name },
        created: Between(
          dto.fromPeriod,
          dto.toPeriod
        ),
      },
      relations: { category: true}
     },
    );

    let amount = 0;
    transArr.forEach((trans)=>{
      trans.type === "profitable" ? amount+= trans.amount : amount-= trans.amount;
    })
    const response = {
      category: category.name,
      amount: amount
    }
    
    return response
  }
}
