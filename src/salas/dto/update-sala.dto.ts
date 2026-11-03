import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { TipoSala } from './tipo-sala.enum';

export class UpdateSalaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nome?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacidade?: number;

  @IsOptional()
  @IsEnum(TipoSala)
  tipoSala?: TipoSala;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;
}
