import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './shemas/products.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  public async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  public async getById(id: string | number): Promise<Product> {
    return this.productModel.findById(id);
  }

  public async create(body: CreateProductDto): Promise<Product> {
    return new this.productModel(body).save();
  }

  public async remove(id: string | number): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  public async update(
    id: string | number,
    body: UpdateProductDto
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedat: Date.now(),
      },
      { new: true });
  }
}
