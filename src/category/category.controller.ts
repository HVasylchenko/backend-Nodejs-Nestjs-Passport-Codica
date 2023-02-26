import {Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import {CategorysService} from "./category.service";
import {Category} from "./category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import { CreateRequestDto } from '../transaction/dto/create-request.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Any } from 'typeorm';

@ApiTags('Категории')
@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategorysService) {}

  @ApiOperation({summary: 'Создание категории'})
  @ApiResponse({status: 200, type: Category})
  @Post()
  create(@Body() dto: CreateCategoryDto) {
      return this.categoryService.create(dto);
  }

  @ApiOperation({summary: 'Получить категорию по Id'})
  @ApiResponse({status: 200, type: Category})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.getOne(id);
  }

  @ApiOperation({summary: 'Получить все категории'})
  @ApiResponse({status: 200, type: Category})
  @Get()
  getAll() {
      return this.categoryService.getAll();
  }
  
  @ApiOperation({summary: 'Удалить категорию по Id'})
  @ApiResponse({status: 200, type: Category})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }

  @ApiOperation({summary: 'Изменить имя категории'})
  @ApiResponse({status: 200, type: Category})
  @Put()
  update(@Body() dto: CreateCategoryDto) {
      console.log("dto", dto)
    return this.categoryService.update(dto);
  }

  // @ApiOperation({ summary: "Запрос статистики" })
  // @ApiResponse({ status: 200, type: Any })
  // @Post("/request")
  // request(@Body() dto: CreateRequestDto) {
  //   return this.categoryService.request(dto);
  // }
}
