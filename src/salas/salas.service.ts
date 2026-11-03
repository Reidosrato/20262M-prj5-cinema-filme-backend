import { Injectable, NotFoundException } from '@nestjs/common';
import type { TipoSala as PrismaTipoSala } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import {
  fromPrismaTipoSala,
  TipoSala,
  toPrismaTipoSala,
} from './dto/tipo-sala.enum';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSalaDto) {
    const sala = await this.prisma.sala.create({
      data: { ...dto, tipoSala: toPrismaTipoSala(dto.tipoSala) },
    });

    return this.toResponse(sala);
  }

  async findAll() {
    const salas = await this.prisma.sala.findMany({
      orderBy: { idSala: 'asc' },
    });

    return salas.map((sala) => this.toResponse(sala));
  }

  async findOne(id: number) {
    const sala = await this.prisma.sala.findUnique({
      where: { idSala: id },
    });

    if (!sala) {
      throw new NotFoundException(`Sala ${id} não encontrada`);
    }

    return this.toResponse(sala);
  }

  async update(id: number, dto: UpdateSalaDto) {
    await this.findOne(id);
    const { tipoSala, ...data } = dto;

    const sala = await this.prisma.sala.update({
      where: { idSala: id },
      data: {
        ...data,
        ...(tipoSala !== undefined && {
          tipoSala: toPrismaTipoSala(tipoSala),
        }),
      },
    });

    return this.toResponse(sala);
  }

  async remove(id: number) {
    await this.findOne(id);

    const sala = await this.prisma.sala.delete({
      where: { idSala: id },
    });

    return this.toResponse(sala);
  }

  private toResponse<T extends { tipoSala: PrismaTipoSala }>(
    sala: T,
  ): Omit<T, 'tipoSala'> & { tipoSala: TipoSala } {
    return { ...sala, tipoSala: fromPrismaTipoSala(sala.tipoSala) };
  }
}
