import {ApiProperty} from "@nestjs/swagger";
export class CreateTransactionDto {
    readonly id: number;
    @ApiProperty({example: '125.30', description: 'Сумма транзакции'})
    readonly amount: number;
    @ApiProperty({example: 'profitable', description: 'Приход (profitable) или расход (consumable)'})
    readonly type: string;

    readonly bankId: number;
    readonly categoryId: number;
    @ApiProperty({example: 'Privatbank', description: 'Название банка'})
    readonly bankName: string;
    @ApiProperty({example: 'Бензин', description: 'Название категории'})
    readonly categoryName: string;
    readonly created: Date;
}