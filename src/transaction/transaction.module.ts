import { Module } from '@nestjs/common';
import { TransactionsService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from './transaction.entity';
import { HttpModule } from '@nestjs/axios'; 
import { Bank } from 'src/bank/bank.entity';
import { Category } from 'src/category/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { BankModule } from 'src/bank/bank.module';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionController],
  imports: [
    TypeOrmModule.forFeature([Transaction, Bank]),
    CategoryModule,
    BankModule,
    HttpModule    
  ]
})
export class TransactionModule {}
