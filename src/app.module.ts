import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { jwtAuth } from './middleware/jwtAuth';


@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot('mongodb+srv://test:test@cluster0.xbbm0a8.mongodb.net/?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(jwtAuth).forRoutes({path:'*', method: RequestMethod.ALL})
  }
}
