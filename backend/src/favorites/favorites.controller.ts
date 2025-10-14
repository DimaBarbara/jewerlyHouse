import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  HttpCode,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findMyFavorites(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.favoritesService.findMyFavorites(userId);
  }

  @Post(':itemId')
  @HttpCode(201)
  addItemToFavorites(
    @Req() req: AuthenticatedRequest,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    const userId = req.user.id;
    return this.favoritesService.addItemToFavorites(userId, itemId);
  }

  @Delete(':itemId')
  @HttpCode(200)
  removeItemFromFavorites(
    @Req() req: AuthenticatedRequest,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    const userId = req.user.id;
    return this.favoritesService.removeItemFromFavorites(userId, itemId);
  }
}
