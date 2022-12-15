import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./schemas/order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Controller("orders")
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @Get(":id")
  public getOne(@Param("id") id: number | string): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.create(body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  public remove(@Param("id") id: string | number): Promise<Order> {
    return this.orderService.remove(id);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  public update(
    @Param("id") id: string | number,
    @Body() body: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.update(id, body);
  }
}
