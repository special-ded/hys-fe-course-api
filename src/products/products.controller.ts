import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, Query, UseGuards, ValidationPipe
} from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './shemas/products.schema';
import { ListQueryParamsDto } from "../core/dto/list-query-params.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
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
  ): Promise<Product[]> {
    return this.productsService.getAll(query || {} as any);
  }

  @Get(':id')
  public getOne(@Param('id') id: number | string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Ololo-Header', '777')
  public create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public remove(@Param('id') id: string | number): Promise<Product> {
    return this.productsService.remove(id);
  }

  // TODO add params validation
  /*
  shared
   export class FindOneParams {
     @IsNumberString()
     id: number;
   }

   @Param() params: FindOneParams,
  * */

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public update(
    @Param('id') id: string | number,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, body);
  }
}
