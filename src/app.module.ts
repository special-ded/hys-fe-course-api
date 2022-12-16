import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

const dbConnection: string = `mongodb+srv://${
  process.env.DB_USER || 'admin'
}:${
  process.env.DB_PASSWORD || 'admin'
}@cluster0.okbhktt.mongodb.net/products?retryWrites=true&w=majority`;

@Module({
  imports: [
    ProductsModule,
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot(dbConnection),
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
