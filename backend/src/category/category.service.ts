import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException();
    }

    const newCategory = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });

    return newCategory;
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        items: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    if (category.items.length > 0) {
      throw new BadRequestException(`Cannot delete category with items`);
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
