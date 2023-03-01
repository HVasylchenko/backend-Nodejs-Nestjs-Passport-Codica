import {Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import {BanksService} from "./bank.service";
import {Bank} from "./bank.entity";
import {CreateBankDto} from "./dto/create-bank.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Банки')
@Controller("bank")
export class BankController {
  constructor(private bankService: BanksService) {}

  @ApiOperation({summary: 'Создание банка'})
  @ApiResponse({status: 200, type: Bank})
  @Post()
  create(@Body() dto: CreateBankDto) {
      return this.bankService.create(dto);
  }

  @ApiOperation({summary: 'Получить банк по Id'})
  @ApiResponse({status: 200, type: Bank})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bankService.getOne(id);
  }

  @ApiOperation({summary: 'Получить все банки'})
  @ApiResponse({status: 200, type: Bank})
  @Get()
 
  getAllBanks() {
    console.log("getallbanks");
      return this.bankService.getAll();
  }

  @ApiOperation({summary: 'Удалить банк по Id'})
  @ApiResponse({status: 200, type: Bank})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bankService.remove(id);
  }

  @ApiOperation({summary: 'Изменить имя банка'})
  @ApiResponse({status: 200, type: Bank})
  @Put()
  update(@Body() dto: CreateBankDto) {
      console.log("dto", dto)
    return this.bankService.update(dto);
  }
}
