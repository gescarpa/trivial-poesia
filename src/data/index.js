// Punto único de entrada al banco de preguntas.
// Junta las preguntas base, los bloques de biografías y anécdotas, y les
// aplica los metadatos ampliados (explicación larga, poema completo,
// enlaces) usados en modo taller. App.jsx solo necesita importar de aquí.
import { QUESTIONS as BASE_QUESTIONS, CATEGORIES } from "./questions";
import { MAS_BIOGRAFIAS } from "./masBiografias";
import { BIOGRAFIAS_EXTRA } from "./biografiasExtra";
import { POESIA_EXPANSION } from "./poesiaExpansion";
import { BIOGRAFIAS_METAS } from "./biografias/index.js";

function withMeta(question) {
  const meta = BIOGRAFIAS_METAS[question.id];
  if (!meta) return question;
  return {
    ...question,
    longExplanation:
      meta.longExplanation || meta.fullAnswer || question.longExplanation,
    links: meta.links || question.links,
    fullPoem: meta.fullPoem || meta.poemFragment || question.fullPoem,
    poemSource: meta.poemSource || meta.source || question.poemSource,
  };
}

export const QUESTIONS = [
  ...BASE_QUESTIONS,
  ...MAS_BIOGRAFIAS,
  ...BIOGRAFIAS_EXTRA,
  ...POESIA_EXPANSION,
].map(withMeta);

export { CATEGORIES };
