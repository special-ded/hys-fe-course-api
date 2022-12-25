import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./schemas/order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ListQueryParamsDto } from "../core/dto/list-query-params.dto";
import { Product } from "../products/shemas/products.schema";

@Controller("orders")
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public getAll(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false
      },
      forbidNonWhitelisted: true
    })) query: ListQueryParamsDto
  ): Promise<Order[]> {
    return this.orderService.getAll(query);
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
