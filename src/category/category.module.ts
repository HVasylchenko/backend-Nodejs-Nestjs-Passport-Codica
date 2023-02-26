import { Module } from '@nestjs/common';
import { CategorysService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from './category.entity';

@Module({
  providers: [CategorysService],
  controllers: [CategoryController],
  imports: [
    TypeOrmModule.forFeature([Category]),
  ], 
  exports: [CategorysService]
})
export class CategoryModule {}
