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
  Put
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './shemas/products.schema';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
  ) {
  }

  // @Get()
  // @Redirect('https://google.com', 301)
  // getAll(
  //   @Req() req: Request,
  //   @Res() res: Response
  // ): string {
  //   res.status(222).end('OLOLOLOLO'); // express access
  //   return 'get all 777';
  // }
  @Get()
  @HttpCode(HttpStatus.OK)
  public getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  public getOne(@Param('id') id: number | string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Ololo-Header', '777')
  public create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productsService.create(body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public remove(@Param('id') id: string | number): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public update(
    @Param('id') id: string | number,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, body);
  }
}
