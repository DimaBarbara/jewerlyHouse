import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  findMyFavorites(userId: number) {
    return this.prisma.favoriteItem.findMany({
      where: { userId },
      include: {
        item: true,
      },
      orderBy: {
        itemId: 'asc',
      },
    });
  }

  async addItemToFavorites(userId: number, itemId: number) {
    const existingFavorite = await this.prisma.favoriteItem.findUnique({
      where: {
        userId_itemId: {
          userId: userId,
          itemId: itemId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Item is already in favorites.');
    }
    const newFavorite = await this.prisma.favoriteItem.create({
      data: {
        userId: userId,
        itemId: itemId,
      },
      include: { item: true },
    });

    return newFavorite;
  }

  async removeItemFromFavorites(userId: number, itemId: number) {
    try {
      const deletedFavorite = await this.prisma.favoriteItem.delete({
        where: {
          userId_itemId: {
            userId: userId,
            itemId: itemId,
          },
        },
        include: { item: true },
      });

      return deletedFavorite;
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Favorite item not found.');
    }
  }
}
