"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FilmesService = class FilmesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.filme.create({ data: dto });
    }
    findAll() {
        return this.prisma.filme.findMany({
            orderBy: { idFilme: 'asc' },
        });
    }
    async findOne(id) {
        const filme = await this.prisma.filme.findUnique({
            where: { idFilme: id },
        });
        if (!filme) {
            throw new common_1.NotFoundException(`Filme ${id} não encontrado`);
        }
        return filme;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.filme.update({
            where: { idFilme: id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.filme.delete({
            where: { idFilme: id },
        });
    }
};
exports.FilmesService = FilmesService;
exports.FilmesService = FilmesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilmesService);
//# sourceMappingURL=filmes.service.js.map