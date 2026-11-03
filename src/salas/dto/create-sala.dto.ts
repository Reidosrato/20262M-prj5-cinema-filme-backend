import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { TipoSala } from './tipo-sala.enum';

export class CreateSalaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nome!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacidade!: number;

  @IsEnum(TipoSala)
  tipoSala!: TipoSala;

  @Type(() => Number)
  @IsInt()
  status!: number;
}
