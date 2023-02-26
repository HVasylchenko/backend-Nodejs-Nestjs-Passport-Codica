import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './category.entity'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CreateRequestDto } from '../transaction/dto/create-request.dto'
import { Transaction } from 'src/transaction/transaction.entity'


@Injectable()
export class CategorysService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	async create(dto: CreateCategoryDto): Promise<Category> {
		return await this.categoryRepository.save({ ...dto })
	}

	async getOne(id: number): Promise<Category> {
		return await this.categoryRepository.findOne({ where: { id: id }})
	}

	async getAll(): Promise<Category[]> {
		return await this.categoryRepository.find()
	}

	// async request(dto: CreateRequestDto): Promise<any> {
	// 	console.log(dto)
	// 	// const category = await this.categoryRepository.findOne({ where: { id: dto.categoryIds}})
	// 	const response = await this.transactionRepository.find( {where: {category: {id:dto.categoryIds} }}) 
		
	// 	// console.log( category.id)
	// 	// console.log(dto.categoryIds)
	// 	return response
	// 	}

	// async remove(): Promise<Category> {
   	// 	 await this.categoryRepository.clear();
    //    return ;
	// }

	async remove(id: number): Promise<Category> {
		const category = await this.categoryRepository.findOne({ where: { id: id }})
				 await this.categoryRepository.delete({ id });
		   return category;
		}

	async update(dto: CreateCategoryDto): Promise<Category> {
		await this.categoryRepository.update({ id: dto.id }, { name: dto.name})
		return await this.categoryRepository.findOne({ where: { id: dto.id }})
	}
}
