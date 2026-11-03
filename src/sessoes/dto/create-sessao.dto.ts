import { Type } from 'class-transformer';
import { IsDate, IsInt, Min } from 'class-validator';

export class CreateSessaoDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  filmeId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  salaId!: number;

  @Type(() => Date)
  @IsDate()
  dataHoraInicio!: Date;

  @Type(() => Date)
  @IsDate()
  dataHoraFim!: Date;

  @Type(() => Number)
  @IsInt()
  status!: number;
}
