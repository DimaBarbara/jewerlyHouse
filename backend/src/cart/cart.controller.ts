import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

interface AuthRequest extends Request {
  user: { id: number; email: string };
}
// @UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOneByUserId(@Request() req: AuthRequest) {
    return this.cartService.findMyCart(req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('item/:cartId')
  async findAllItems(@Param('cartId') cartId: string) {
    if (!cartId) {
      throw new NotFoundException('User cart not found.');
    }

    return this.cartService.findAllItems(+cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/item')
  addItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { itemId: number; quantityToAdd: number },
  ) {
    const { itemId, quantityToAdd } = body;
    return this.cartService.upsertCartItem(userId, +itemId, +quantityToAdd);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/item')
  deleteItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { itemId: number },
  ) {
    const { itemId } = body;
    return this.cartService.deleteItem(userId, +itemId);
  }
}
