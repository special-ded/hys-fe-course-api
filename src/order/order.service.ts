import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "./schemas/order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private model: Model<OrderDocument>
  ) {}

  public async getAll(): Promise<Order[]> {
    return this.model.find().exec();
  }

  public async getById(id: string | number): Promise<Order> {
    return this.model.findById(id);
  }

  public async create(body: CreateOrderDto): Promise<Order> {
    return new this.model(body).save();
  }

  public async remove(id: string | number): Promise<Order> {
    return this.model.findByIdAndRemove(id);
  }

  public async update(
    id: string | number,
    body: UpdateOrderDto
  ): Promise<Order> {
    return this.model.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
  }
}
