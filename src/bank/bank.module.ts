import { Module } from '@nestjs/common';
import { BanksService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bank } from './bank.entity';
import { Transaction } from 'src/transaction/transaction.entity';

@Module({
  providers: [BanksService],
  controllers: [BankController],
  imports: [
    TypeOrmModule.forFeature([Bank, Transaction])
  ],
  exports: [BanksService]
})
export class BankModule {}
