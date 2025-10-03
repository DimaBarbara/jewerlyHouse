import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  findOneByUserId(@Param('userId') userId: string) {
    return this.cartService.findOneByUserId(+userId);
  }

  @Get('item/:cartId')
  @UseGuards(JwtAuthGuard)
  async findAllItems(@Param('cartId') cartId: string) {
    if (!cartId) {
      throw new NotFoundException('User cart not found.');
    }

    return this.cartService.findAllItems(+cartId);
  }

  @Post(':userId/item')
  @UseGuards(JwtAuthGuard)
  addItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { itemId: number; quantityToAdd: number },
  ) {
    const { itemId, quantityToAdd } = body;
    return this.cartService.upsertCartItem(userId, +itemId, +quantityToAdd);
  }
}
