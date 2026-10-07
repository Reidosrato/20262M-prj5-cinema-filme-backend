import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFilmeDto) {
    return this.prisma.filme.create({ data: dto });
  }

  findAll() {
    return this.prisma.filme.findMany({
      orderBy: { idFilme: 'asc' },
    });
  }

  async findOne(id: number) {
    const filme = await this.prisma.filme.findUnique({
      where: { idFilme: id },
    });

    if (!filme) {
      throw new NotFoundException(`Filme ${id} não encontrado`);
    }

    return filme;
  }

  async update(id: number, dto: UpdateFilmeDto) {
    await this.findOne(id);

    return this.prisma.filme.update({
      where: { idFilme: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.filme.delete({
      where: { idFilme: id },
    });
  }
}
