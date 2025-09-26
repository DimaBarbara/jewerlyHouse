import { PrismaService } from 'src/prisma/prisma.service';
import { Collection } from '@prisma/client';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const existingCollection = await this.prisma.collection.findUnique({
      where: { name: createCollectionDto.name },
    });

    if (existingCollection) {
      throw new BadRequestException();
    }

    const newCollection = await this.prisma.collection.create({
      data: {
        name: createCollectionDto.name,
      },
    });

    return newCollection;
  }

  findAll() {
    return this.prisma.collection.findMany({
      include: {
        items: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.collection.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    await this.prisma.collection.findUniqueOrThrow({
      where: { id },
    });

    return this.prisma.collection.update({
      where: { id },
      data: { ...updateCollectionDto },
    });
  }

  async remove(id: number) {
    const collection = await this.prisma.collection.findUniqueOrThrow({
      where: { id },
      include: { items: true },
    });

    if (collection.items.length > 0) {
      throw new BadRequestException('Cannot delete a collection with items.');
    }

    return this.prisma.collection.delete({
      where: { id },
    });
  }
}
