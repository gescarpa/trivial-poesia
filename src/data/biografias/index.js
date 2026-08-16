// Índice de metas de biografias detalladas
import { BIOGRAFIAS_DETALLADAS_A } from '../biografiasDetalladasA.js';
import { BIOGRAFIA_201 } from './201-dickinson.js';
import { NERUDA_META } from './202-neruda-meta.js';
import { LORCA_META } from './203-lorca-meta.js';
import { SORJUANA_META } from './204-sorjuana-meta.js';
import { VALLEJO_META } from './205-vallejo-meta.js';
import { PLATH_META } from './206-plath-meta.js';
import { LORCA_FUSILADO_META } from './340-lorca-fusilado-meta.js';
import { ALBERTI_EXILIO_META } from './341-alberti-exilio-meta.js';
import { NERUDA_POLITICO_META } from './342-neruda-politico-meta.js';
import { GONGORA_QUEVEDO_META } from './343-gongora-quevedo-meta.js';
import { SORJUANA_RENUNCIA_META } from './344-sorjuana-renuncia-meta.js';
import { BECQUER_PERIODISTA_META } from './345-becquer-periodista-meta.js';

export const BIOGRAFIAS_METAS = {
  ...BIOGRAFIAS_DETALLADAS_A,
  [BIOGRAFIA_201.id]: BIOGRAFIA_201,
  [NERUDA_META.id]: NERUDA_META,
  [LORCA_META.id]: LORCA_META,
  [SORJUANA_META.id]: SORJUANA_META,
  [VALLEJO_META.id]: VALLEJO_META,
  [PLATH_META.id]: PLATH_META,
  [LORCA_FUSILADO_META.id]: LORCA_FUSILADO_META,
  [ALBERTI_EXILIO_META.id]: ALBERTI_EXILIO_META,
  [NERUDA_POLITICO_META.id]: NERUDA_POLITICO_META,
  [GONGORA_QUEVEDO_META.id]: GONGORA_QUEVEDO_META,
  [SORJUANA_RENUNCIA_META.id]: SORJUANA_RENUNCIA_META,
  [BECQUER_PERIODISTA_META.id]: BECQUER_PERIODISTA_META,
};

export default BIOGRAFIAS_METAS;
