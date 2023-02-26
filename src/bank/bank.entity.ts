import { Transaction } from 'src/transaction/transaction.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Privatbank', description: 'Название банка'})
  @Column()
  name: string;

  @Column()
  balance: number;

  @OneToMany(() => Transaction,
   (transaction) => transaction.bank
   )
    transactions: Transaction[]
}