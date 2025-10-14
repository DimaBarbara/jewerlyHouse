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
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';
import { EmailModule } from './email/email.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    OrdersModule,
    ItemsModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CollectionModule,
    UploadModule,
    AuthModule,
    CartModule,
    EmailModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
