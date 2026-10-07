import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsOptional()
  @IsString()
  sinopse?: string;

  @IsString()
  @IsNotEmpty()
  classificacao!: string;

  @IsInt()
  @Min(1)
  duracaoMinutos!: number;

  @IsString()
  @IsNotEmpty()
  genero!: string;

  @IsString()
  @IsNotEmpty()
  idioma!: string;

  @Type(() => Date)
  @IsDate()
  dataLancamento!: Date;

  @IsOptional()
  @IsString()
  trailer?: string;

  @Type(() => Number)
  @IsInt()
  status!: number;
}
