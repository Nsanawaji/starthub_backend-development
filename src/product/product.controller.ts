import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.productService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') name: string, @Body() payload) {
    return this.productService.update(name, payload);
  }

  @Delete(':id')
  remove(@Param('id') name: string) {
    return this.productService.remove(name);
  }
}
