import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CategoryModule,
    OrdersModule,
    ItemsModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
