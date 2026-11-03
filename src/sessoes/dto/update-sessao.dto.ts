import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateSessaoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  filmeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  salaId?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataHoraInicio?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataHoraFim?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number;
}
