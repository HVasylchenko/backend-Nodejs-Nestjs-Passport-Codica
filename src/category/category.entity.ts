import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from 'src/transaction/transaction.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example: 'Бензин', description: 'Название категории'})
  @Column()
  name: string;

  @OneToMany(() => Transaction,
  (transaction) => transaction.category
  )
   transactions: Transaction[]
}