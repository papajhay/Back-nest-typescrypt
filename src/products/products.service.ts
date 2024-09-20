import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async createProduct(name: string, description: string, image: string, price: number): Promise<Product> {
        const product = this.productsRepository.create({ name, description, image, price });
        return await this.productsRepository.save(product);
    }
}

