import { Injectable, NotFoundException } from '@nestjs/common';
import type { TipoSala as PrismaTipoSala } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { fromPrismaTipoSala } from '../salas/dto/tipo-sala.enum';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessoesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessaoDto) {
    await this.ensureRelations(dto.filmeId, dto.salaId);

    const sessao = await this.prisma.sessao.create({
      data: dto,
      include: { filme: true, sala: true },
    });

    return this.toResponse(sessao);
  }

  async findAll() {
    const sessoes = await this.prisma.sessao.findMany({
      orderBy: { idSessao: 'asc' },
      include: { filme: true, sala: true },
    });

    return sessoes.map((sessao) => this.toResponse(sessao));
  }

  async findOne(id: number) {
    const sessao = await this.prisma.sessao.findUnique({
      where: { idSessao: id },
      include: { filme: true, sala: true },
    });

    if (!sessao) {
      throw new NotFoundException(`Sessão ${id} não encontrada`);
    }

    return this.toResponse(sessao);
  }

  async update(id: number, dto: UpdateSessaoDto) {
    const current = await this.findOne(id);

    if (dto.filmeId !== undefined || dto.salaId !== undefined) {
      await this.ensureRelations(
        dto.filmeId ?? current.filmeId,
        dto.salaId ?? current.salaId,
      );
    }

    const sessao = await this.prisma.sessao.update({
      where: { idSessao: id },
      data: dto,
      include: { filme: true, sala: true },
    });

    return this.toResponse(sessao);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.sessao.delete({
      where: { idSessao: id },
    });
  }

  private async ensureRelations(filmeId: number, salaId: number) {
    const filme = await this.prisma.filme.findUnique({
      where: { idFilme: filmeId },
      select: { idFilme: true },
    });

    if (!filme) {
      throw new NotFoundException(`Filme ${filmeId} não encontrado`);
    }

    const sala = await this.prisma.sala.findUnique({
      where: { idSala: salaId },
      select: { idSala: true },
    });

    if (!sala) {
      throw new NotFoundException(`Sala ${salaId} não encontrada`);
    }
  }

  private toResponse<T extends { sala: { tipoSala: PrismaTipoSala } }>(
    sessao: T,
  ) {
    return {
      ...sessao,
      sala: {
        ...sessao.sala,
        tipoSala: fromPrismaTipoSala(sessao.sala.tipoSala),
      },
    };
  }
}
