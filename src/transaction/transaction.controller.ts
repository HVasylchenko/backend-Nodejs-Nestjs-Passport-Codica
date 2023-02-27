import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards
} from "@nestjs/common";
import { TransactionsService } from "./transaction.service";
import { Transaction } from "./transaction.entity";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import {ApiKeyAuthGuard} from '../auth/guard/apikey-auth.guard' 
import { CreateRequestDto } from '../transaction/dto/create-request.dto';

@ApiTags("Плвтежи")
@UseGuards(ApiKeyAuthGuard)
@Controller("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionsService) {}

  @ApiOperation({ summary: "Создание платежа" })
  @ApiResponse({ status: 200, type: Transaction })
  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  // @ApiOperation({ summary: "Запрос статистики" })
  // @ApiResponse({ status: 200, type: Transaction })
  // @Post("/request")
  // request(@Body() dto: CreateRequestDto) {
  //   return this.transactionService.request(dto);
  // }

  @ApiOperation({
    summary: "Получить все платежи c pagination /?page=1&limit=1",
  })
  @ApiResponse({ status: 200, type: Transaction })
  @Get()
  index(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<Pagination<Transaction>> {
    limit = limit > 100 ? 100 : limit;
    return this.transactionService.paginate({
      page,
      limit,
      route: "",
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.getOne(id);
  }

  @ApiOperation({ summary: "Удалить платеж по Id" })
  @ApiResponse({ status: 200, type: Transaction })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.transactionService.remove(id);
  }

  @ApiOperation({ summary: "Запрос статистики" })
  @ApiResponse({ status: 200, type: CreateRequestDto })
  @Post("/request")
  request(@Body() dto: CreateRequestDto) {
    return this.transactionService.request(dto);
  }

}
