import type { TipoSala as PrismaTipoSala } from '@prisma/client';

export enum TipoSala {
  DoisD = '2D',
  TresD = '3D',
  IMAX = 'IMAX',
}

const prismaTipoSala: Record<TipoSala, PrismaTipoSala> = {
  [TipoSala.DoisD]: 'DoisD',
  [TipoSala.TresD]: 'TresD',
  [TipoSala.IMAX]: 'IMAX',
};

const apiTipoSala: Record<PrismaTipoSala, TipoSala> = {
  DoisD: TipoSala.DoisD,
  TresD: TipoSala.TresD,
  IMAX: TipoSala.IMAX,
};

export function toPrismaTipoSala(tipoSala: TipoSala): PrismaTipoSala {
  return prismaTipoSala[tipoSala];
}

export function fromPrismaTipoSala(tipoSala: PrismaTipoSala): TipoSala {
  return apiTipoSala[tipoSala];
}
