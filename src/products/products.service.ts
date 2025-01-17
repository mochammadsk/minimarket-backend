import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './products.shcema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const products = await this.productModel
      .findOne({ name: createProductDto.name })
      .exec();

    if (products) {
      throw new ConflictException('Product already exists');
    }

    const createdProduct = new this.productModel(createProductDto);

    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
