import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Bank } from 'src/bank/bank.entity';
import { Category } from 'src/category/category.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({example: '125.30', description: 'Сумма транзакции'})
  @Column()
  amount: number;

  @ApiProperty({example: 'profitable', description: 'Приход (profitable) или расход (consumable)'})
  @Column()
  type: string;

  @ApiProperty({example: 'Privatbank', description: 'Название банка'})
  @Column()
  bankName: string;

  @ApiProperty({example: 'Бензин', description: 'Название категории'})
  @Column()
  categoryName: string;

  @CreateDateColumn()
    created: Date;

  @ManyToOne(() => Bank, (bank) => bank.transactions)
  bank: Bank

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category
}