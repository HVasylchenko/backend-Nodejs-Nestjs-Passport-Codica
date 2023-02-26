
import {ApiProperty} from "@nestjs/swagger";
export class CreateBankDto {

    readonly id: number;
    @ApiProperty({example: 'Privatbank', description: 'Название банка'})
    readonly name: string;
    @ApiProperty({example: '125.30', description: 'Балланс'})
    readonly balance: number;
}