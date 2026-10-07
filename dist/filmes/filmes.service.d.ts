import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
export declare class FilmesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFilmeDto): import("@prisma/client").Prisma.Prisma__FilmeClient<{
        titulo: string;
        sinopse: string | null;
        classificacao: string | null;
        duracaoMinutos: number;
        genero: string | null;
        idioma: string | null;
        dataLancamento: Date | null;
        trailer: string | null;
        status: number;
        idFilme: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        titulo: string;
        sinopse: string | null;
        classificacao: string | null;
        duracaoMinutos: number;
        genero: string | null;
        idioma: string | null;
        dataLancamento: Date | null;
        trailer: string | null;
        status: number;
        idFilme: number;
    }[]>;
    findOne(id: number): Promise<{
        titulo: string;
        sinopse: string | null;
        classificacao: string | null;
        duracaoMinutos: number;
        genero: string | null;
        idioma: string | null;
        dataLancamento: Date | null;
        trailer: string | null;
        status: number;
        idFilme: number;
    }>;
    update(id: number, dto: UpdateFilmeDto): Promise<{
        titulo: string;
        sinopse: string | null;
        classificacao: string | null;
        duracaoMinutos: number;
        genero: string | null;
        idioma: string | null;
        dataLancamento: Date | null;
        trailer: string | null;
        status: number;
        idFilme: number;
    }>;
    remove(id: number): Promise<{
        titulo: string;
        sinopse: string | null;
        classificacao: string | null;
        duracaoMinutos: number;
        genero: string | null;
        idioma: string | null;
        dataLancamento: Date | null;
        trailer: string | null;
        status: number;
        idFilme: number;
    }>;
}
