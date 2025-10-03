import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cart.findMany();
  }

  findOneByUserId(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  findAllItems(cartId: number) {
    return this.prisma.cartItem.findMany({
      where: { cartId: cartId },
      include: {
        item: true,
      },
    });
  }

  async upsertCartItem(userId: number, itemId: number, quantityToAdd: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: userId },
      select: { id: true },
    });

    if (!cart) {
      throw new Error('User cart not found.');
    }

    const cartId = cart.id;

    const updatedItem = await this.prisma.cartItem.upsert({
      where: {
        cartId_itemId: {
          cartId: cartId,
          itemId: itemId,
        },
      },
      include: { item: true },

      update: {
        quantity: {
          increment: quantityToAdd,
        },
      },

      create: {
        cartId: cartId,
        itemId: itemId,
        quantity: quantityToAdd,
      },
    });

    return updatedItem;
  }
}
