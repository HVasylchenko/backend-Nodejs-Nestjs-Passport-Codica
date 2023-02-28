import { Module } from "@nestjs/common";
import { BankModule } from "./bank/bank.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bank } from "./bank/bank.entity";
import { Transaction } from "./transaction/transaction.entity";
import { TransactionModule } from "./transaction/transaction.module";
import { Category } from "./category/category.entity";
import { CategoryModule } from "./category/category.module";
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Bank, Transaction, Category],
      synchronize: true,
    }),
    BankModule,
    TransactionModule,
    CategoryModule,
    AuthModule
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
