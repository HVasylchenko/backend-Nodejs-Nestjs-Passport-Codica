import {ApiProperty} from "@nestjs/swagger";
export class CreateRequestDto {
    @ApiProperty({example: '1', description: 'Id категории'})
    readonly categoryIds: number;
    @ApiProperty({example: '2023-02-23T10:09:59.540Z', description: 'С какого времени'})
    readonly fromPeriod: Date;
    @ApiProperty({example: '2023-02-27T10:09:59.540Z', description: 'До какого времени'})
    readonly toPeriod: Date;
}