import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const item = await this.prisma.item.create({
      data: {
        name: createItemDto.name,
        price: createItemDto.price,
        image: createItemDto.image,
        images: createItemDto.images,
        material: createItemDto.material ?? '',
        categoryId: createItemDto.categoryId,
        collectionId: createItemDto.collectionId,
        isNew: createItemDto.isNew ?? true,
      },
    });
    return item;
  }

  async findAll() {
    return this.prisma.item.findMany({
      include: {
        category: true,
        collection: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
        collection: true,
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: number) {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
