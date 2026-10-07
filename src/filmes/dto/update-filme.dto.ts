import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateFilmeDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  sinopse?: string;

  @IsOptional()
  @IsString()
  classificacao?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  duracaoMinutos?: number;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  idioma?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataLancamento?: Date;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;
}
