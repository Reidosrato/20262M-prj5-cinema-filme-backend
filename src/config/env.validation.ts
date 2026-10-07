import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty({ message: 'DATABASE_URL é obrigatória' })
  DATABASE_URL!: string;

  @IsOptional()
  @IsInt({ message: 'PORT deve ser um número inteiro' })
  @Min(1)
  @Max(65535)
  PORT: number = 3000;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const validado = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const erros = validateSync(validado, { skipMissingProperties: false });

  if (erros.length > 0) {
    const detalhes = erros
      .map((erro) => Object.values(erro.constraints ?? {}).join('; '))
      .join('\n - ');

    throw new Error(`Configuração inválida. Revise o seu .env:\n - ${detalhes}\n`);
  }

  return validado;
}
