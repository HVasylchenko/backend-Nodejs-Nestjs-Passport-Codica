import {ApiProperty} from "@nestjs/swagger";
export class CreateCategoryDto {
    readonly id: number;
    @ApiProperty({example: 'Бензин', description: 'Название категории'})
    readonly name: string;
}