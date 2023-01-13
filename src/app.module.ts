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
  process.env.DB_PASSWORD || 'qCihZ4yEHzrfWa8n'
}@${
  process.env.DB_CLUSTER || 'cluster0'
}.${
  process.env.DB_SERVICE_HASH || 'oimr5em'
}.mongodb.net/products?retryWrites=true&w=majority`;

@Module({
  imports: [
    ProductsModule,
    ProductsModule,
    UsersModule,
    MongooseModule.forRoot(dbConnection,{
      autoIndex: true, //make this also true
    }),
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
