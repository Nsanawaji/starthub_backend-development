import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(payload) {
    const product = await this.productRepository.create(payload);
    return this.productRepository.save(product);
  }

  async findAll() {
    const findAll = await this.productRepository.find();
    if (!findAll) {
      throw new HttpException(`Sorry, no product found`, 400);
    }
    return findAll;
  }

  async findOne(name: string) {
    const find = await this.productRepository.findOneBy({ name });
    if (!find) {
      throw new HttpException(
        `Sorry, no product with such name: ${name} found`,
        400,
      );
    }
    return find;
  }

  async update(id: string, payload) {
    await this.findItems(id);
    return await this.productRepository.update(id, payload);
  }

  async remove(id: string) {
    await this.findItems(id);
    return await this.productRepository.delete(id);
  }

  async findItems(id: string) {
    const findPro = await this.productRepository.findOneBy({ id: id });
    if (!findPro) {
      throw new HttpException('Sorry no such product found', 400);
    }

    return findPro;
  }
}
