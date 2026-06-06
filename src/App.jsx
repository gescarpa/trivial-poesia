import { useEffect, useMemo, useState } from "react";
import "./index.css";
import lopeImg from "./assets/lope.png";
import logoImg from "./assets/logo.png";

const LOCAL_STORAGE_KEY = "trivial-poesia-ranking";

const CATEGORIES = [
  "Siglo de Oro",
  "Generación del 27",
  "Poesía latinoamericana",
  "Poesía escrita por mujeres",
  "Poesía contemporánea",
  "Biografías y anécdotas",
  "Todas las categorías",
];

const QUESTIONS = [
  {
    id: 1,
    category: "Siglo de Oro",
    question: "¿Quién escribió «Mientras por competir con tu cabello»?",
    options: [
      "Luis de Góngora",
      "Lope de Vega",
      "Francisco de Quevedo",
      "Garcilaso de la Vega",
    ],
    correctIndex: 0,
    poemSnippet: "Mientras por competir con tu cabello,\noro bruñido al sol relumbra en vano...",
    author: "Luis de Góngora",
    sourcePeriod: "Barroco, culteranismo",
    explanation:
      "Es uno de los sonetos más célebres de Góngora, paradigma del lenguaje culterano del Barroco.",
    difficulty: "intermedio",
  },
  {
    id: 2,
    category: "Siglo de Oro",
    question:
      "El verso «Cerrar podrá mis ojos la postrera sombra» pertenece a:",
    options: [
      "Fray Luis de León",
      "Francisco de Quevedo",
      "Sor Juana Inés de la Cruz",
      "San Juan de la Cruz",
    ],
    correctIndex: 1,
    poemSnippet:
      "Cerrar podrá mis ojos la postrera\nsombra que me llevare el blanco día...",
    author: "Francisco de Quevedo",
    sourcePeriod: "Barroco, conceptismo",
    explanation:
      "Es el inicio del soneto «Amor constante más allá de la muerte», ejemplo de conceptismo barroco.",
    difficulty: "intermedio",
  },
  {
    id: 3,
    category: "Generación del 27",
    question:
      "¿Cuál de estos poetas se asocia directamente con la Generación del 27?",
    options: [
      "Antonio Machado",
      "Federico García Lorca",
      "Gustavo Adolfo Bécquer",
      "Jorge Manrique",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "Federico García Lorca",
    sourcePeriod: "Generación del 27",
    explanation:
      "Lorca es una de las figuras centrales de la Generación del 27, junto a Cernuda, Alberti, etc.",
    difficulty: "básico",
  },
  {
    id: 4,
    category: "Generación del 27",
    question:
      "¿Qué rasgo se asocia a menudo a la Generación del 27 en su relación con la tradición?",
    options: [
      "Rechazo absoluto de todo lo clásico",
      "Fusión de tradición y vanguardia",
      "Imitación exclusiva del gongorismo",
      "Uso exclusivo del romance octosílabo",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Generación del 27",
    explanation:
      "La Generación del 27 se caracteriza por combinar la tradición (Góngora, cancionero, etc.) con las vanguardias.",
    difficulty: "intermedio",
  },
  {
    id: 5,
    category: "Poesía latinoamericana",
    question:
      "¿Qué poeta escribió «Puedo escribir los versos más tristes esta noche»?",
    options: [
      "Pablo Neruda",
      "César Vallejo",
      "Octavio Paz",
      "Alejandra Pizarnik",
    ],
    correctIndex: 0,
    poemSnippet:
      "Puedo escribir los versos más tristes esta noche.\nEscribir, por ejemplo: «La noche está estrellada...»",
    author: "Pablo Neruda",
    sourcePeriod: "Poesía latinoamericana del siglo XX",
    explanation:
      "Es el poema 20 de «Veinte poemas de amor y una canción desesperada».",
    difficulty: "básico",
  },
  {
    id: 6,
    category: "Poesía latinoamericana",
    question:
      "El verso «Me gusta cuando callas porque estás como ausente» es de:",
    options: [
      "Idea Vilariño",
      "Pablo Neruda",
      "Mario Benedetti",
      "Juan Gelman",
    ],
    correctIndex: 1,
    poemSnippet:
      "Me gusta cuando callas porque estás como ausente,\ny me oyes desde lejos, y mi voz no te toca.",
    author: "Pablo Neruda",
    sourcePeriod: "Poesía latinoamericana del siglo XX",
    explanation:
      "Pertenece al poema 15 del mismo libro de Neruda.",
    difficulty: "básico",
  },
  {
    id: 7,
    category: "Poesía escrita por mujeres",
    question:
      "¿Qué autora hispanoamericana se caracteriza por una voz íntima, fragmentaria y muchas veces nocturna?",
    options: [
      "Alfonsina Storni",
      "Alejandra Pizarnik",
      "Gabriela Mistral",
      "Rosario Castellanos",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "Alejandra Pizarnik",
    sourcePeriod: "Poesía argentina del siglo XX",
    explanation:
      "Alejandra Pizarnik es conocida por su escritura intensa, fragmentaria y de fuerte carga existencial.",
    difficulty: "intermedio",
  },
  {
    id: 8,
    category: "Poesía escrita por mujeres",
    question:
      "¿Cuál de estas poetas pertenece al ámbito de la mística novohispana?",
    options: [
      "Sor Juana Inés de la Cruz",
      "Anne Carson",
      "Chantal Maillard",
      "Ida Vitale",
    ],
    correctIndex: 0,
    poemSnippet: "",
    author: "Sor Juana Inés de la Cruz",
    sourcePeriod: "Barroco novohispano",
    explanation:
      "Sor Juana es una de las grandes figuras barrocas de la Nueva España, con una fuerte dimensión intelectual y religiosa.",
    difficulty: "intermedio",
  },
  {
    id: 9,
    category: "Poesía contemporánea",
    question:
      "¿Qué rasgo se considera central en mucha poesía contemporánea en castellano?",
    options: [
      "Uso estricto del soneto clásico",
      "Predominio del verso libre",
      "Solo versos alejandrinos",
      "Obligatoriedad de la rima consonante",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Contemporánea",
    explanation:
      "El verso libre es un rasgo fundamental, aunque convive con formas métricas tradicionales.",
    difficulty: "básico",
  },
  {
    id: 10,
    category: "Poesía contemporánea",
    question:
      "¿Qué tendencia es frecuente en la poesía contemporánea que se publica en redes sociales?",
    options: [
      "Poemas extensos en verso alejandrino",
      "Textos breves, confesionales y muy directos",
      "Énfasis en formas épicas largas",
      "Exclusivo uso de tercetos encadenados",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía digital / redes",
    explanation:
      "En redes abundan textos breves, de tono confesional, con lenguaje directo y alta compartibilidad.",
    difficulty: "básico",
  },

{
  id: 11,
  category: "Siglo de Oro",
  question: "¿En qué siglos se sitúa habitualmente el llamado Siglo de Oro español?",
  options: [
    "Del XIII al XIV",
    "Del XVI al XVII",
    "Del XVIII al XIX",
    "Del XV al XVI",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Marco general del Siglo de Oro",
  explanation:
    "Aunque el nombre lleve a confusión, se suele situar el Siglo de Oro aproximadamente entre los siglos XVI y XVII.",
  difficulty: "básico",
},
{
  id: 12,
  category: "Siglo de Oro",
  question: "¿Cuál de estos autores se considera fundamental en la poesía del Siglo de Oro?",
  options: [
    "Luis de Góngora",
    "Gustavo Adolfo Bécquer",
    "Rafael Alberti",
    "Pablo Neruda",
  ],
  correctIndex: 0,
  poemSnippet: "",
  author: "Luis de Góngora",
  sourcePeriod: "Barroco, Siglo de Oro",
  explanation:
    "Luis de Góngora es una figura clave del Barroco poético español dentro del Siglo de Oro.",
  difficulty: "básico",
},
{
  id: 13,
  category: "Siglo de Oro",
  question: "¿Qué movimiento se asocia más con Francisco de Quevedo?",
  options: [
    "Culteranismo",
    "Modernismo",
    "Conceptismo",
    "Realismo social",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Francisco de Quevedo",
  sourcePeriod: "Barroco, Siglo de Oro",
  explanation:
    "Quevedo se relaciona principalmente con el conceptismo, que busca densidad intelectual y juegos de significado.",
  difficulty: "básico",
},
{
  id: 14,
  category: "Siglo de Oro",
  question:
    "¿Qué rasgo distingue al culteranismo gongorino frente al conceptismo?",
  options: [
    "El uso intensivo de juegos de palabras y dobles sentidos",
    "La extrema elaboración sintáctica y léxica",
    "La ausencia de metáforas",
    "La escritura exclusiva en prosa",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Luis de Góngora",
  sourcePeriod: "Barroco, culteranismo",
  explanation:
    "El culteranismo se caracteriza por la complejidad sintáctica y el léxico culto, más que por el juego de conceptos.",
  difficulty: "intermedio",
},
{
  id: 15,
  category: "Siglo de Oro",
  question:
    "¿Cuál de estos temas es recurrente en la poesía moral y existencial del Siglo de Oro?",
  options: [
    "La exaltación exclusiva del progreso científico",
    "La burla del amor cortés medieval",
    "La fugacidad de la vida y el tiempo",
    "La vida urbana del siglo XX",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía moral y existencial del Siglo de Oro",
  explanation:
    "La conciencia de la fugacidad de la vida y del tiempo es central en mucha poesía del Siglo de Oro.",
  difficulty: "intermedio",
},
{
  id: 16,
  category: "Siglo de Oro",
  question:
    "¿Qué forma métrica se usa con frecuencia en los sonetos del Siglo de Oro?",
  options: [
    "Verso alejandrino de 14 sílabas",
    "Endecasílabo, normalmente con rima consonante",
    "Verso libre sin medida fija",
    "Hexámetro dactílico clásico",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Métrica renacentista y barroca",
  explanation:
    "El soneto del Siglo de Oro suele escribirse en endecasílabos con rima consonante, siguiendo modelos italianos.",
  difficulty: "intermedio",
},
{
  id: 17,
  category: "Siglo de Oro",
  question:
    "En un soneto barroco donde se describe la belleza femenina para concluir en la muerte, ¿qué tópico tradicional suele aparecer?",
  options: [
    "Carpe diem",
    "Locus amoenus",
    "Ubi sunt",
    "Beatus ille",
  ],
  correctIndex: 0,
  poemSnippet:
    "Coged de vuestra alegre primavera\nel dulce fruto antes que el tiempo airado\ncubra de nieve la hermosa cumbre.",
  author: "Tópico renacentista y barroco",
  sourcePeriod: "Renacimiento y Barroco",
  explanation:
    "El carpe diem invita a aprovechar la juventud antes de que llegue la vejez y la muerte, muy frecuente en la lírica del Siglo de Oro.",
  difficulty: "avanzado",
},
{
  id: 18,
  category: "Siglo de Oro",
  question:
    "En «Cerrar podrá mis ojos la postrera sombra», la tensión entre cuerpo y alma se resuelve a favor de:",
  options: [
    "La materia, que perdura más que el espíritu",
    "El alma, que mantiene el amor más allá de la muerte",
    "La desaparición total de cualquier amor",
    "Un amor puramente político",
  ],
  correctIndex: 1,
  poemSnippet:
    "Alma, a quien todo un dios prisión ha sido,\nvenas, que humor a tanto fuego han dado...",
  author: "Francisco de Quevedo",
  sourcePeriod: "Barroco, conceptismo",
  explanation:
    "El soneto plantea que el amor se mantiene en el alma incluso después de la muerte del cuerpo.",
  difficulty: "avanzado",
},
{
  id: 19,
  category: "Siglo de Oro",
  question:
    "En un poema de Góngora con sintaxis muy enrevesada y abundancia de latinismos, el efecto buscado sobre el lector contemporáneo podría describirse como:",
  options: [
    "Transparencia inmediata y conversación coloquial",
    "Opacidad calculada que exige relectura y desciframiento",
    "Simplicidad casi infantil",
    "Reproducción literal de la prosa medieval",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Luis de Góngora",
  sourcePeriod: "Barroco, culteranismo",
  explanation:
    "El culteranismo propone una dificultad buscada que obliga a leer con detenimiento y a descifrar el poema.",
  difficulty: "avanzado",
},
{
  id: 20,
  category: "Generación del 27",
  question: "¿Qué poeta se asocia de forma central con la Generación del 27?",
  options: [
    "Federico García Lorca",
    "Antonio Machado",
    "Gustavo Adolfo Bécquer",
    "Pablo Neruda",
  ],
  correctIndex: 0,
  poemSnippet: "",
  author: "Federico García Lorca",
  sourcePeriod: "Generación del 27",
  explanation:
    "Lorca es una figura clave del 27, junto a otros como Alberti, Cernuda o Salinas.",
  difficulty: "básico",
},
{
  id: 21,
  category: "Generación del 27",
  question:
    "¿Qué género poético popular rescata y transforma Lorca en obras como el «Romancero gitano»?",
  options: [
    "El haiku",
    "El romance",
    "La oda pindárica",
    "El terceto encadenado",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Federico García Lorca",
  sourcePeriod: "Romancero gitano",
  explanation:
    "Lorca parte del romance tradicional para crear una mitología propia en el «Romancero gitano».",
  difficulty: "básico",
},
{
  id: 22,
  category: "Generación del 27",
  question:
    "¿En qué año se conmemoró el tricentenario de la muerte de Góngora, momento simbólico para el grupo del 27?",
  options: [
    "1527",
    "1627",
    "1727",
    "1927",
  ],
  correctIndex: 3,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Homenaje a Góngora",
  explanation:
    "En 1927 varios poetas se reunieron para homenajear a Góngora, hito simbólico de la Generación del 27.",
  difficulty: "básico",
},
{
  id: 23,
  category: "Generación del 27",
  question:
    "¿Qué rasgo describe mejor la actitud del 27 ante la tradición literaria?",
  options: [
    "Rechazo frontal de todo lo anterior",
    "Fusión de tradición clásica y vanguardia",
    "Imitación exclusiva de Góngora sin innovaciones",
    "Interés solo por la literatura medieval",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Generación del 27",
  explanation:
    "La Generación del 27 se caracteriza por combinar la tradición (Góngora, formas clásicas) con las corrientes de vanguardia.",
  difficulty: "intermedio",
},
{
  id: 24,
  category: "Generación del 27",
  question:
    "¿Cuál de estos poetas del 27 mostró una especial afinidad con el surrealismo en su poesía?",
  options: [
    "Luis Cernuda",
    "Jorge Manrique",
    "Garcilaso de la Vega",
    "Fray Luis de León",
  ],
  correctIndex: 0,
  poemSnippet: "",
  author: "Luis Cernuda",
  sourcePeriod: "Poesía surrealizante del 27",
  explanation:
    "Cernuda incorpora elementos del surrealismo, especialmente en libros como «Un río, un amor».",
  difficulty: "intermedio",
},
{
  id: 25,
  category: "Generación del 27",
  question:
    "¿Qué caracteriza a buena parte de la poesía amorosa de Pedro Salinas dentro del 27?",
  options: [
    "El tono épico y guerrero",
    "La reflexión amorosa intelectualizada y analítica",
    "La narración de aventuras caballerescas",
    "El uso exclusivo del verso alejandrino",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Pedro Salinas",
  sourcePeriod: "Generación del 27",
  explanation:
    "Salinas explora el amor desde una perspectiva reflexiva, muy atenta al lenguaje y a la percepción del otro.",
  difficulty: "intermedio",
},
{
  id: 26,
  category: "Generación del 27",
  question:
    "En los romances de Lorca, la mezcla de símbolos como la luna, la sangre o el caballo suele apuntar a:",
  options: [
    "Un realismo costumbrista sin carga simbólica",
    "Una red de significados trágicos y eróticos",
    "Escenas exclusivamente humorísticas",
    "Descripciones científicas del paisaje",
  ],
  correctIndex: 1,
  poemSnippet:
    "La luna vino a la fragua\ncon su polisón de nardos.\nEl niño la mira mira.\nEl niño la está mirando.",
  author: "Federico García Lorca",
  sourcePeriod: "Romancero gitano",
  explanation:
    "La imaginería de Lorca articula símbolos ambivalentes donde se cruzan eros, muerte y destino trágico.",
  difficulty: "avanzado",
},
{
  id: 27,
  category: "Generación del 27",
  question:
    "Cuando se habla de la 'deshumanización' en Ortega y su influencia en el 27, se suele aludir a:",
  options: [
    "La desaparición de cualquier yo en los poemas",
    "Un alejamiento del sentimentalismo directo hacia una poesía más intelectual y formal",
    "El uso exclusivo de personajes robots",
    "La eliminación de la metáfora en la poesía",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Vanguardia y teoría estética en el 27",
  explanation:
    "La 'deshumanización del arte' propone una estética más intelectual y formal, que influye en parte de la poesía del 27.",
  difficulty: "avanzado",
},
{
  id: 28,
  category: "Generación del 27",
  question:
    "En Cernuda, la tensión entre realidad y deseo suele resolverse:",
  options: [
    "Con una aceptación conformista de la realidad",
    "Con la victoria ingenua del deseo sobre todo límite",
    "Con una conciencia amarga de la imposibilidad de armonizarlos",
    "Con la desaparición total del yo",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Luis Cernuda",
  sourcePeriod: "Poesía del 27 en el exilio",
  explanation:
    "Buena parte de la obra de Cernuda muestra la imposibilidad de reconciliar deseo y realidad sin conflicto.",
  difficulty: "avanzado",
},
{
  id: 29,
  category: "Poesía latinoamericana",
  question:
    "¿Qué poeta chileno escribió «Veinte poemas de amor y una canción desesperada»?",
  options: [
    "Pablo Neruda",
    "Gabriela Mistral",
    "Nicanor Parra",
    "Vicente Huidobro",
  ],
  correctIndex: 0,
  poemSnippet: "",
  author: "Pablo Neruda",
  sourcePeriod: "Poesía latinoamericana del siglo XX",
  explanation:
    "Es uno de los libros más conocidos de Neruda y un clásico de la poesía amorosa en castellano.",
  difficulty: "básico",
},
{
  id: 30,
  category: "Poesía latinoamericana",
  question:
    "¿Cuál de estas poetas recibió el Premio Nobel de Literatura por su obra poética?",
  options: [
    "Gabriela Mistral",
    "Alfonsina Storni",
    "Alejandra Pizarnik",
    "Rosario Castellanos",
  ],
  correctIndex: 0,
  poemSnippet: "",
  author: "Gabriela Mistral",
  sourcePeriod: "Poesía chilena del siglo XX",
  explanation:
    "Gabriela Mistral fue la primera autora latinoamericana en recibir el Nobel de Literatura, en 1945.",
  difficulty: "básico",
},
{
  id: 31,
  category: "Poesía latinoamericana",
  question:
    "¿Qué país se asocia con el poeta César Vallejo, autor de «Trilce»?",
  options: [
    "México",
    "Perú",
    "Argentina",
    "Uruguay",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "César Vallejo",
  sourcePeriod: "Vanguardia latinoamericana",
  explanation:
    "César Vallejo es un poeta peruano central en la renovación vanguardista de la poesía en castellano.",
  difficulty: "básico",
},

{
  id: 32,
  category: "Poesía latinoamericana",
  question:
    "¿Qué rasgo se asocia a menudo con la poesía de César Vallejo en libros como «Trilce»?",
  options: [
    "Lenguaje sencillo y transparente sin juegos formales",
    "Experimentación radical con el lenguaje y la sintaxis",
    "Uso exclusivo de formas clásicas italianas",
    "Poesía narrativa de tono costumbrista",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "César Vallejo",
  sourcePeriod: "Vanguardia latinoamericana",
  explanation:
    "Vallejo lleva la experimentación del lenguaje muy lejos, rompiendo sintaxis y expectativas semánticas.",
  difficulty: "intermedio",
},
{
  id: 33,
  category: "Poesía latinoamericana",
  question:
    "¿Qué tema aparece con frecuencia en la poesía de Mario Benedetti?",
  options: [
    "La épica medieval europea",
    "La vida cotidiana, el amor y el compromiso político",
    "La astronomía y la física cuántica",
    "Exclusivamente mitología griega",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Mario Benedetti",
  sourcePeriod: "Poesía uruguaya del siglo XX",
  explanation:
    "Benedetti combina lo cotidiano, el amor, el humor y la reflexión política de forma accesible.",
  difficulty: "intermedio",
},
{
  id: 34,
  category: "Poesía latinoamericana",
  question:
    "¿Cuál de estas afirmaciones describe mejor a la poesía de Octavio Paz?",
  options: [
    "Se limita a poemas breves humorísticos sin reflexión",
    "Combina reflexión filosófica, exploración del lenguaje y simbología amorosa",
    "Es exclusivamente poesía rural costumbrista",
    "Se centra solo en el verso rimado tradicional",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Octavio Paz",
  sourcePeriod: "Poesía mexicana del siglo XX",
  explanation:
    "Octavio Paz integra reflexión filosófica, exploración del tiempo, el amor y el lenguaje en su poesía.",
  difficulty: "intermedio",
},

{
  id: 35,
  category: "Poesía latinoamericana",
  question:
    "En el verso «Puedo escribir los versos más tristes esta noche», el tono dominante del poema tiende hacia:",
  options: [
    "La exaltación alegre del amor correspondido",
    "La ironía ligera",
    "La melancolía por la pérdida amorosa",
    "La sátira política explícita",
  ],
  correctIndex: 2,
  poemSnippet:
    "Puedo escribir los versos más tristes esta noche.\nEscribir, por ejemplo: «La noche está estrellada...»",
  author: "Pablo Neruda",
  sourcePeriod: "Poesía amorosa latinoamericana",
  explanation:
    "El poema se construye desde la nostalgia y la conciencia de la pérdida del amor.",
  difficulty: "avanzado",
},
{
  id: 36,
  category: "Poesía latinoamericana",
  question:
    "En muchos textos de Alejandra Pizarnik, la relación con la propia voz poética puede describirse como:",
  options: [
    "Segura, expansiva y celebratoria",
    "Distanciada y puramente satírica",
    "Fragmentaria, conflictiva y atravesada por el silencio",
    "Exclusivamente descriptiva del paisaje rural",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Alejandra Pizarnik",
  sourcePeriod: "Poesía argentina del siglo XX",
  explanation:
    "Pizarnik trabaja una voz que vacila, se fragmenta y cuestiona su posibilidad misma de decir.",
  difficulty: "avanzado",
},
{
  id: 37,
  category: "Poesía latinoamericana",
  question:
    "En ciertos poemas de Nicanor Parra, la llamada 'antipoesía' se manifiesta sobre todo en:",
  options: [
    "La solemnidad extrema del tono",
    "El rechazo del humor y la coloquialidad",
    "La ruptura de la retórica elevada mediante ironía y lenguaje cotidiano",
    "El uso exclusivo de endecasílabos clásicos",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Nicanor Parra",
  sourcePeriod: "Antipoesía chilena",
  explanation:
    "La antipoesía de Parra desmonta la solemnidad poética usando humor, coloquialismos y gestos anticlimáticos.",
  difficulty: "avanzado",
},
{
  id: 38,
  category: "Poesía escrita por mujeres",
  question:
    "¿Qué poeta uruguaya es conocida por sus poemas amorosos intensos como «Ya no»?",
  options: [
    "Idea Vilariño",
    "Gabriela Mistral",
    "Alfonsina Storni",
    "Juana de Ibarbourou",
  ],
  correctIndex: 0,
  poemSnippet: "",
  author: "Idea Vilariño",
  sourcePeriod: "Poesía uruguaya del siglo XX",
  explanation:
    "Idea Vilariño es una voz central de la poesía amorosa y existencial en el Río de la Plata.",
  difficulty: "básico",
},
{
  id: 39,
  category: "Poesía escrita por mujeres",
  question:
    "¿Qué poeta argentina escribió el poema «Tú me quieres blanca»?",
  options: [
    "Alejandra Pizarnik",
    "Alfonsina Storni",
    "Juana Bignozzi",
    "Silvina Ocampo",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Alfonsina Storni",
  sourcePeriod: "Poesía modernista y posmodernista argentina",
  explanation:
    "Alfonsina Storni cuestiona en este poema los mandatos patriarcales sobre la pureza femenina.",
  difficulty: "básico",
},
{
  id: 40,
  category: "Poesía escrita por mujeres",
  question:
    "¿Qué poeta ganó el Premio Nobel de Literatura y es autora de «Desolación» y «Ternura»?",
  options: [
    "Rosario Castellanos",
    "Chantal Maillard",
    "Gabriela Mistral",
    "Ida Vitale",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Gabriela Mistral",
  sourcePeriod: "Poesía chilena del siglo XX",
  explanation:
    "Gabriela Mistral recibió el Nobel y es una figura clave de la poesía latinoamericana escrita por mujeres.",
  difficulty: "básico",
},

{
  id: 41,
  category: "Poesía escrita por mujeres",
  question:
    "En «Hombres necios que acusáis», ¿qué critica principalmente Sor Juana Inés de la Cruz?",
  options: [
    "La pobreza de recursos métricos",
    "La falta de fe religiosa",
    "La doble moral masculina hacia las mujeres",
    "El abandono de la tradición clásica",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Sor Juana Inés de la Cruz",
  sourcePeriod: "Barroco novohispano",
  explanation:
    "El poema denuncia la hipocresía de exigir a las mujeres conductas contradictorias.",
  difficulty: "intermedio",
},
{
  id: 42,
  category: "Poesía escrita por mujeres",
  question:
    "¿Qué rasgo se asocia con frecuencia a la poesía de Alejandra Pizarnik?",
  options: [
    "Tono épico y nacionalista",
    "Lenguaje coloquial humorístico",
    "Brevedad, intensidad y tono existencial",
    "Descripciones costumbristas de la vida rural",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Alejandra Pizarnik",
  sourcePeriod: "Poesía argentina del siglo XX",
  explanation:
    "Pizarnik trabaja poemas breves e intensos, con fuerte carga existencial y trabajo con el silencio.",
  difficulty: "intermedio",
},
{
  id: 43,
  category: "Poesía escrita por mujeres",
  question:
    "¿Qué tema recorre buena parte de la obra poética de Rosario Castellanos?",
  options: [
    "La guerra mundial y la tecnología",
    "La relación entre género, poder y cultura",
    "La vida de los emperadores romanos",
    "La pura descripción de paisajes marinos",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Rosario Castellanos",
  sourcePeriod: "Poesía mexicana del siglo XX",
  explanation:
    "Castellanos reflexiona a menudo sobre la condición de las mujeres y las estructuras de poder.",
  difficulty: "intermedio",
},

{
  id: 44,
  category: "Poesía escrita por mujeres",
  question:
    "En muchos textos de Idea Vilariño, la experiencia amorosa aparece marcada por:",
  options: [
    "La euforia permanente",
    "La ironía distante sin implicación afectiva",
    "La intensidad y la conciencia de la pérdida",
    "El puro juego formal sin emociones",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "Idea Vilariño",
  sourcePeriod: "Poesía uruguaya del siglo XX",
  explanation:
    "Su poesía amorosa es extremadamente intensa y a la vez muy lúcida respecto al dolor de la pérdida.",
  difficulty: "avanzado",
},
{
  id: 45,
  category: "Poesía escrita por mujeres",
  question:
    "En «Tú me quieres blanca», el uso de imperativos y enumeraciones sirve para:",
  options: [
    "Describir un paisaje natural sin conflicto",
    "Reforzar el tono de exigencia y denuncia",
    "Imitar la poesía mística del Siglo de Oro",
    "Introducir un juego puramente humorístico",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Alfonsina Storni",
  sourcePeriod: "Poesía feminista de inicios del siglo XX",
  explanation:
    "Los imperativos y la repetición subrayan la denuncia de las imposiciones sobre el cuerpo y la vida de las mujeres.",
  difficulty: "avanzado",
},
{
  id: 46,
  category: "Poesía escrita por mujeres",
  question:
    "En muchos poemas de Gabriela Mistral, la figura de la maternidad aparece como:",
  options: [
    "Una experiencia siempre idílica y sin conflicto",
    "Una metáfora compleja que incluye cuidado, pérdida y dolor",
    "Un tema estrictamente biográfico sin elaboración simbólica",
    "Un motivo puramente decorativo sin importancia temática",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "Gabriela Mistral",
  sourcePeriod: "Poesía chilena del siglo XX",
  explanation:
    "La maternidad en Mistral combina ternura, duelo y dimensión simbólica más allá de lo autobiográfico.",
  difficulty: "avanzado",
},
{
  id: 47,
  category: "Poesía contemporánea",
  question:
    "¿Qué rasgo formal se ha generalizado en mucha poesía contemporánea en castellano?",
  options: [
    "El uso obligatorio del soneto clásico",
    "El verso libre sin medida fija",
    "El alejandrino con cesura siempre marcada",
    "La redondilla con rima abrazada",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía contemporánea",
  explanation:
    "El verso libre es muy frecuente, aunque convive con formas métricas tradicionales.",
  difficulty: "básico",
},
{
  id: 48,
  category: "Poesía contemporánea",
  question:
    "¿Qué medio de difusión se ha vuelto clave para mucha poesía contemporánea reciente?",
  options: [
    "Los cancioneros manuscritos",
    "Las academias reales exclusivamente",
    "Las redes sociales y plataformas digitales",
    "Las inscripciones en piedra",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía digital",
  explanation:
    "Las redes sociales y plataformas digitales han transformado la circulación y recepción de la poesía.",
  difficulty: "básico",
},
{
  id: 49,
  category: "Poesía contemporánea",
  question:
    "¿Qué tema aparece con frecuencia en la llamada 'poesía de la experiencia' en España?",
  options: [
    "La épica mitológica grecolatina",
    "Relatos del yo en contextos cotidianos",
    "Exclusivamente tratados de métrica clásica",
    "La poesía pastoril renacentista",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía de la experiencia",
  explanation:
    "La poesía de la experiencia suele partir de anécdotas o escenas cotidianas para reflexionar sobre la identidad y el tiempo.",
  difficulty: "básico",
},

{
  id: 50,
  category: "Poesía contemporánea",
  question:
    "En mucha poesía que circula en redes, el tono predominante suele ser:",
  options: [
    "Altamente hermético y críptico",
    "Confesional, directo y emocional",
    "Exclusivamente narrativo y épico",
    "Técnico y académico",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía en redes",
  explanation:
    "Los textos breves, confesionales y de tono directo funcionan bien en entornos digitales.",
  difficulty: "intermedio",
},
{
  id: 51,
  category: "Poesía contemporánea",
  question:
    "¿Qué recurso se explota a menudo en la poesía visual y experimental contemporánea?",
  options: [
    "La estricta regularidad de la estrofa",
    "La disposición gráfica del texto en la página",
    "La eliminación total de la imagen",
    "El uso exclusivo de rima consonante",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía visual",
  explanation:
    "En la poesía visual, la disposición gráfica del texto forma parte esencial del significado.",
  difficulty: "intermedio",
},
{
  id: 52,
  category: "Poesía contemporánea",
  question:
    "¿Cuál de estas preocupaciones es muy habitual en la poesía contemporánea escrita en castellano?",
  options: [
    "La vida de los reyes visigodos",
    "La experiencia del cuerpo, el género y la identidad",
    "La física newtoniana",
    "Las epopeyas caballerescas",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía contemporánea",
  explanation:
    "Muchos poemas contemporáneos abordan el cuerpo, el género, la identidad y sus tensiones sociales.",
  difficulty: "intermedio",
},

{
  id: 53,
  category: "Poesía contemporánea",
  question:
    "En cierto tipo de poesía contemporánea 'posmoderna', la mezcla de registros cultos y coloquiales sirve para:",
  options: [
    "Eliminar toda ironía",
    "Reforzar una voz única y homogénea",
    "Cuestionar jerarquías entre lo alto y lo bajo",
    "Volver al estilo de los cantares de gesta",
  ],
  correctIndex: 2,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía posmoderna",
  explanation:
    "La mezcla de registros desestabiliza las fronteras entre lo culto y lo popular, lo serio y lo irónico.",
  difficulty: "avanzado",
},
{
  id: 54,
  category: "Poesía contemporánea",
  question:
    "En la poesía que dialoga con el feminismo contemporáneo, suele cuestionarse:",
  options: [
    "Solo la métrica clásica",
    "Las representaciones tradicionales de género y poder",
    "La existencia misma de la literatura",
    "Únicamente la sintaxis oracional",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía feminista contemporánea",
  explanation:
    "La poesía feminista cuestiona representaciones y estructuras de poder ligadas al género.",
  difficulty: "avanzado",
},
{
  id: 55,
  category: "Poesía contemporánea",
  question:
    "En algunas propuestas de 'poesía documental', ¿qué se incorpora con frecuencia al poema?",
  options: [
    "Solo mitología clásica",
    "Documentos, datos o materiales de archivo",
    "Exclusivamente fórmulas métricas medievales",
    "Canciones infantiles tradicionales",
  ],
  correctIndex: 1,
  poemSnippet: "",
  author: "",
  sourcePeriod: "Poesía documental",
  explanation:
    "La poesía documental integra materiales no ficcionales (archivos, testimonios, datos) en la composición poética.",
  difficulty: "avanzado",
},
{
  id: 101,
  category: "Biografías y anécdotas",
  question: "¿Qué anécdota está asociada a la lectura de 'Cantar de los cantares' por San Juan de la Cruz?",
  options: [
    "Lo leyó en público descalzo",
    "Lo recitaba de memoria a escondidas",
    "Lo escribió de nuevo en clave mística",
    "Lo tradujo al latín"
  ],
  correctIndex: 2,

  longExplanation:
    "San Juan de la Cruz forma parte de una larga tradición de lectura alegórica del 'Cantar de los cantares', donde el diálogo amoroso entre la esposa y el esposo se entiende como una imagen de la unión mística entre el alma y Dios. En el siglo XVI, en pleno clima de reforma y de vigilancia inquisitorial, reescribir este libro bíblico en clave poética y castellana suponía a la vez una fidelidad a la tradición cristiana y un gesto de audacia: el lenguaje erótico del Cantar se desplaza al terreno de la experiencia interior, pero conserva su intensidad corporal y afectiva. Por eso puede decirse que San Juan, más que comentar literalmente el Cantar, lo vuelve a escribir como 'Cántico espiritual': un poema en liras donde la amada busca al Amado ausente, le interroga, le persigue y finalmente se une a él. La anécdota no es una escena pintoresca aislada, sino el propio movimiento de apropiarse del Cantar: tomar un poema bíblico de amor humano y convertirlo en mapa de la vida contemplativa.",
  
  links: [
    {
      label: "Poesía de San Juan de la Cruz (edición en línea)",
      url: "https://mercaba.org/DOCTORES/JUAN-CRUZ/poesias.htm"
    },
    {
      label: "Artículo sobre el Cántico espiritual y el Cantar de los cantares",
      url: "http://www.pliegosdeyuste.eu/n1112pliegos/pdfs/107-116.pdf"
    },
    {
      label: "Comentario y contexto del Cántico espiritual",
      url: "https://wmagazin.com/relatos/vigencia-y-nuevas-interpretaciones-del-cantico-espiritual-de-san-juan-de-la-cruz/"
    }
  ],

  fullPoem:
    "¿Adónde te escondiste,\n" +
    "Amado, y me dejaste con gemido?\n" +
    "Como el ciervo huiste,\n" +
    "habiéndome herido;\n" +
    "salí tras ti clamando, y eras ido.\n\n" +
    "Pastores, los que fuerdes\n" +
    "allá por las majadas al otero,\n" +
    "si por ventura vierdes\n" +
    "aquél que yo más quiero,\n" +
    "decidle que adolezco, peno y muero.\n\n" +
    "[...] (En el modo taller, invita a leer el 'Cántico espiritual' completo en la edición enlazada.)",

  poemSource:
    "Fragmento inicial del 'Cántico espiritual' de San Juan de la Cruz en liras; puede leerse completo en diversas ediciones y repositorios en línea como Mercaba o ediciones críticas accesibles en PDF.",
    difficulty: "avanzado",
},
{
  id: 102,
  category: "Biografías y anécdotas",
  question:
    "¿Qué imagen de Federico García Lorca se desprende de sus conferencias-recital sobre el «Romancero gitano»?",
  options: [
    "Un profesor distante, muy académico",
    "Un recitador frío, casi sin gestos",
    "Un poeta que busca comunicarse y contagiar la poesía",
    "Un crítico que solo analiza métrica y rima"
  ],
  correctIndex: 2,

  longExplanation:
    "Las conferencias-recital de Lorca sobre el «Romancero gitano», como la célebre del Ateneo de Madrid, lo muestran menos como un profesor y más como un juglar moderno: alguien que quiere compartir la poesía como experiencia viva, no como materia escolar. En los testimonios y textos conservados insiste en que no viene a ‘dar cátedra’, sino a comunicarse con el público, a quebrar la distancia entre el escenario y la sala. Esa actitud encaja con toda su trayectoria: un poeta que recorre pueblos con el teatro universitario de La Barraca, que mezcla cultura popular y tradición culta, y que se toma muy en serio la voz, el ritmo y el cuerpo al leer sus propios textos. Pensar esta faceta de Lorca ayuda a entender por qué el «Romancero gitano» se convirtió en un libro tan influyente: no solo por lo que dice, sino por cómo fue dicho y puesto en escena ante generaciones de oyentes.",

  links: [
    {
      label: "Conferencia-recital sobre el Romancero gitano (texto y fragmentos)",
      url: "https://monicatello.es/conferencia-recital-del-romancero-gitano"
    },
    {
      label: "Breve repaso biográfico de Lorca",
      url: "https://avempace.com/wiki/index.php/Trayectoria_po%C3%A9tica_de_Federico_Garc%C3%ADa_Lorca_(1898-1936):_del_neopopularismo_al_su"
    },
    {
      label: "Lorca en la Biblioteca Nacional de España",
      url: "https://www.bne.es/es/autores/garcia-lorca-federico"
    }
  ],

  fullPoem:
    "Verde que te quiero verde.\n" +
    "Verde viento. Verdes ramas.\n" +
    "El barco sobre la mar\n" +
    "y el caballo en la montaña.\n\n" +
    "Con la sombra en la cintura\n" +
    "ella sueña en su baranda,\n" +
    "verde carne, pelo verde,\n" +
    "con ojos de fría plata.\n\n" +
    "[Fragmento del universo lorquiano en «Romance sonámbulo». Para el texto completo del poema y del «Romancero gitano», consulta ediciones autorizadas y recursos especializados en línea.]",

  poemSource:
    "Fragmento célebre de «Romance sonámbulo», del Romancero gitano de Federico García Lorca. El texto completo puede leerse en ediciones impresas y en recursos digitales dedicados a la obra lorquiana.",
    difficulty: "avanzado",
},
{
  id: 103,
  category: "Biografías y anécdotas",
  question:
    "¿Qué gesto de la infancia de Sor Juana Inés de la Cruz se cuenta como muestra extrema de su deseo de aprender?",
  options: [
    "Escribía versos en las paredes del convento",
    "Vendía sus libros para comprar más papel",
    "Se cortaba el cabello si no aprendía la lección",
    "Huyó disfrazada para entrar en la universidad"
  ],
  correctIndex: 2,

  longExplanation:
    "Sor Juana Inés de la Cruz convierte su propia infancia en un pequeño mito de origen del deseo de saber. En sus textos autobiográficos cuenta que, de niña, se encerraba a leer en la biblioteca de su abuelo, que aprendió a leer muy pronto y que incluso llegó a pedir que la disfrazaran de hombre para poder ir a la universidad, vedada a las mujeres en la Nueva España del siglo XVII. Entre esas escenas destaca una especialmente teatral: dice que, cuando no aprendía una lección con la rapidez que ella esperaba, se cortaba un mechón de cabello, porque no consideraba justo que la cabeza luciera adornos si no estaba llena de ideas. Más allá de lo literal o legendario del gesto, la anécdota ayuda a mostrar hasta qué punto Sor Juana construye la figura de una inteligencia femenina que se toma el estudio como una forma de vida, no como un adorno, y que está dispuesta a discutir con todo un sistema que pretende limitar el acceso de las mujeres al conocimiento.",

  links: [
    {
      label: "Breve biografía de Sor Juana Inés de la Cruz",
      url: "https://es.wikipedia.org/wiki/Juana_In%C3%A9s_de_la_Cruz"
    },
    {
      label: "Artículo divulgativo sobre Sor Juana y el saber femenino",
      url: "https://espanaenlahistoria.org/personajes/sor-juana-ines-de-la-cruz-la-primera-feminista-de-nueva-espana/"
    },
    {
      label: "La «Respuesta a Sor Filotea» como defensa del conocimiento",
      url: "https://revistaliterariaelcandelabro.blog/2025/07/respuesta-sor-filotea-defensa-feminista-barroco/"
    }
  ],

  fullPoem:
    "Hombres necios que acusáis\n" +
    "a la mujer sin razón,\n" +
    "sin ver que sois la ocasión\n" +
    "de lo mismo que culpáis.\n\n" +
    "Si con ansia sin igual\n" +
    "solicitáis su desdén,\n" +
    "¿por qué queréis que obren bien\n" +
    "si las incitáis al mal?\n\n" +
    "[Fragmento inicial del poema «Hombres necios que acusáis», donde Sor Juana denuncia la doble moral masculina. El texto completo puede leerse en recursos especializados y ediciones críticas de su obra.]",

  poemSource:
    "Fragmento del poema satírico-filosófico «Hombres necios que acusáis», de Sor Juana Inés de la Cruz, ampliamente accesible en antologías y portales dedicados al Siglo de Oro.",
    difficulty: "avanzado",
},
{
  id: 201,
  category: "Biografías y anécdotas",
  difficulty: "básico",
  question:
    "¿Qué rasgo de la vida de Emily Dickinson se ha convertido en casi una leyenda sobre su figura?",
  options: [
    "Viajó por todo el mundo dando recitales",
    "Fue una poeta muy mediática en su tiempo",
    "Vivió casi siempre recluida y publicó muy poco en vida",
    "Escribía solo en colaboración con otros poetas"
  ],
  correctIndex: 2,
  longExplanation:
    "Emily Dickinson vivió la mayor parte de su vida en Amherst, en una casa familiar de la que apenas salía, lo que alimentó la imagen de una poeta recluida y casi secreta. Durante su vida publicó muy pocos poemas y casi siempre de manera anónima o muy retocada por los editores; el gran descubrimiento vino después de su muerte, cuando se hallaron cientos de poemas cuidadosamente guardados en cuadernos. Esa tensión entre una vida exterior mínima y una vida interior intensísima ha hecho que su biografía se lea a menudo como el reverso de la figura pública del poeta: en lugar del genio visible y aplaudido, una voz que trabaja en silencio y que solo llega al público cuando ella ya no puede verlo. Trabajar esta anécdota en el taller permite pensar en la relación entre escritura, visibilidad y canon: cuánta poesía ha quedado fuera simplemente porque no encajaba en los circuitos de publicación de su época.",
  links: [
    {
      label: "Breve biografía de Emily Dickinson",
      url: "https://www.biography.com/authors-writers/emily-dickinson"
    },
    {
      label: "Perfil en Poetry Foundation",
      url: "https://www.poetryfoundation.org/poets/emily-dickinson"
    }
  ],
  fullPoem:
    "Because I could not stop for Death –\n" +
    "He kindly stopped for me –\n" +
    "The Carriage held but just Ourselves –\n" +
    "And Immortality.\n\n" +
    "[Fragmento en inglés del universo dickinsoniano, útil para trabajar tono y ritmo; el poema completo puede consultarse en ediciones críticas y archivos digitales especializados.]",
  poemSource:
    "Inicio del poema «Because I could not stop for Death –» de Emily Dickinson, accesible en ediciones en inglés y repositorios de poesía anglosajona."
},
{
  id: 202,
  category: "Biografías y anécdotas",
  difficulty: "básico",
  question:
    "¿Qué imagen biográfica se asocia con frecuencia a las casas de Pablo Neruda en Chile?",
  options: [
    "Eran conventos reconvertidos en bibliotecas silenciosas",
    "Eran casas llenas de objetos curiosos y vistas al mar",
    "Eran apartamentos mínimos, casi vacíos",
    "Eran castillos medievales comprados y restaurados"
  ],
  correctIndex: 1,
  longExplanation:
    "Las casas de Pablo Neruda en Chile —La Sebastiana en Valparaíso, Isla Negra o La Chascona en Santiago— se han convertido casi en extensiones de su propia figura poética. Están llenas de objetos marinos, mapas, botellas, mascarones de proa y curiosidades que mezclan el gusto por lo popular, lo kitsch y lo exótico. Esa acumulación de cosas no es solo una manía coleccionista: también puede leerse como una poética del detalle y de la mirada, de alguien que quiere rodearse de materiales para contar historias. Visitar o estudiar esas casas permite pensar la poesía no solo como texto, sino como modo de habitar el espacio: el poeta que convierte su vivienda en un escenario, en un gabinete de maravillas donde cada objeto es un posible disparador de imágenes.",
  links: [
    {
      label: "Fundación Pablo Neruda (casas museo)",
      url: "https://fundacionneruda.org/museos/"
    },
    {
      label: "Reseña biográfica de Pablo Neruda",
      url: "https://www.poetryfoundation.org/poets/pablo-neruda"
    }
  ],
  fullPoem:
    "Puedo escribir los versos más tristes esta noche.\n" +
    "Escribir, por ejemplo: «La noche está estrellada,\n" +
    "y tiritan, azules, los astros, a lo lejos».\n\n" +
    "[Fragmento célebre del Poema 20 de «Veinte poemas de amor y una canción desesperada», útil para trabajar el tono elegíaco y la construcción de la imagen amorosa. El texto completo se encuentra en ediciones impresas y recursos digitales autorizados.]",
  poemSource:
    "Fragmento del Poema 20 de «Veinte poemas de amor y una canción desesperada», de Pablo Neruda."
},
{
  id: 203,
  category: "Biografías y anécdotas",
  difficulty: "básico",
  question:
    "¿Qué combinación de elementos define bien la figura pública de Federico García Lorca en los años 30?",
  options: [
    "Poeta de escritorio que apenas sale de Granada",
    "Poeta y conferenciante que recita y actúa sus textos",
    "Poeta completamente ajeno al teatro y a la música",
    "Poeta que solo publica anónimamente"
  ],
  correctIndex: 1,
  longExplanation:
    "En los años 30, Lorca no es solo el autor de libros como el «Romancero gitano» o «Poeta en Nueva York»: también es un gran comunicador en escena. Sus conferencias-recital mezclan explicación, humor, canto y recitación; y su trabajo con el grupo teatral universitario La Barraca lo lleva a pueblos donde el teatro clásico apenas había llegado. Esa presencia performativa hace que mucha gente lo recuerde tanto por su voz y su manera de decir los poemas como por los textos en el papel. Traer esta dimensión al taller ayuda a pensar la poesía como acto vivo: cómo cambia un poema cuando se imagina dicho en voz alta, con un cuerpo concreto y ante un público concreto.",
  links: [
    {
      label: "Conferencia-recital sobre el Romancero gitano",
      url: "https://monicatello.es/conferencia-recital-del-romancero-gitano"
    },
    {
      label: "Lorca en la Biblioteca Nacional de España",
      url: "https://www.bne.es/es/autores/garcia-lorca-federico"
    }
  ],
  fullPoem:
    "La luna vino a la fragua\n" +
    "con su polisón de nardos.\n" +
    "El niño la mira mira.\n" +
    "El niño la está mirando.\n\n" +
    "[Fragmento del «Romance de la luna, luna» del «Romancero gitano», útil para trabajar símbolo, musicalidad y oralidad. El poema completo puede consultarse en ediciones de la obra de Lorca y recursos digitales especializados.]",
  poemSource:
    "Fragmento del «Romance de la luna, luna», del Romancero gitano de Federico García Lorca."
},
{
  id: 204,
  category: "Biografías y anécdotas",
  difficulty: "intermedio",
  question:
    "¿Qué idea central recorre la famosa «Respuesta a Sor Filotea» de Sor Juana Inés de la Cruz?",
  options: [
    "El rechazo absoluto de la teología",
    "La defensa del derecho de las mujeres a estudiar",
    "La afirmación de que la poesía debe ser solo religiosa",
    "La renuncia definitiva a la escritura"
  ],
  correctIndex: 1,
  longExplanation:
    "La «Respuesta a Sor Filotea» es un texto en el que Sor Juana aprovecha una amonestación para desplegar una defensa apasionada del deseo de saber, especialmente en las mujeres. Recorre su propia biografía intelectual, recoge anécdotas de infancia y muestra cómo la lectura y el estudio han sido para ella una forma de vocación, no un capricho. Al mismo tiempo, tiene que moverse con cautela dentro de un marco eclesiástico y patriarcal: justifica su curiosidad como parte del servicio a Dios, pero deja claro que prohibirle estudiar sería ir contra los talentos que se le han dado. Trabajar este texto en el taller permite conectar biografía, género y retórica: cómo una autora negocia con las voces de autoridad de su tiempo mientras defiende una forma radical de libertad intelectual.",
  links: [
    {
      label: "Texto de la «Respuesta a Sor Filotea»",
      url: "https://web.seducoahuila.gob.mx/biblioweb/upload/RESPUESTA%20A%20SOR%20FILOTEA.pdf"
    },
    {
      label: "Artículo sobre Sor Juana y la defensa del saber",
      url: "https://revistaliterariaelcandelabro.blog/2025/07/respuesta-sor-filotea-defensa-feminista-barroco/"
    }
  ],
  fullPoem:
    "Esta tarde, mi bien, cuando te hablaba,\n" +
    "como en tu rostro y tus acciones vía\n" +
    "que con palabras no te persuadía,\n" +
    "que el corazón me vieses deseaba.\n\n" +
    "[Fragmento de un soneto amoroso de Sor Juana, útil para leer la tensión entre inteligencia, afecto y juego retórico. El poema completo y otros textos pueden consultarse en ediciones de su poesía completa.]",
  poemSource:
    "Fragmento de un soneto amoroso de Sor Juana Inés de la Cruz, presente en sus obras poéticas completas."
},
{
  id: 205,
  category: "Biografías y anécdotas",
  difficulty: "intermedio",
  question:
    "¿Qué episodio vital marcó la imagen de César Vallejo como poeta atravesado por la injusticia y el exilio?",
  options: [
    "Su encarcelamiento en Perú y posterior vida en Europa",
    "Su carrera militar en la Primera Guerra Mundial",
    "Su etapa como diplomático en Estados Unidos",
    "Su retiro silencioso en un monasterio andino"
  ],
  correctIndex: 0,
  longExplanation:
    "César Vallejo fue encarcelado en Perú en circunstancias polémicas, acusado de participar en disturbios de los que su responsabilidad real sigue siendo discutida por la crítica. Ese paso por la cárcel, sumado a la pobreza y al exilio posterior en Europa, ha alimentado la imagen de un poeta muy consciente de la violencia social y de la injusticia histórica. En libros como «Trilce» o «Poemas humanos» la experimentación formal extrema convive con una sensibilidad aguda hacia el sufrimiento colectivo, la precariedad y la fragilidad del cuerpo. Llevar esta anécdota biográfica al taller permite trabajar la relación entre biografía y voz poética sin reducir los poemas a “diario íntimo”: cómo una experiencia concreta puede transformarse en una tensión de lenguaje que ya no pertenece solo al yo del autor.",
  links: [
    {
      label: "Perfil biográfico de César Vallejo",
      url: "https://www.poetryfoundation.org/poets/cesar-vallejo"
    },
    {
      label: "Breve introducción a la obra de Vallejo",
      url: "https://www.britannica.com/biography/Cesar-Vallejo"
    }
  ],
  fullPoem:
    "Me moriré en París con aguacero,\n" +
    "un día del cual tengo ya el recuerdo.\n" +
    "Me moriré en París —y no me corro—,\n" +
    "tal vez un jueves, como es hoy, de otoño.\n\n" +
    "[Fragmento de «Piedra negra sobre una piedra blanca», donde la conciencia de muerte y desplazamiento condensa biografía y visión del mundo. El poema completo se encuentra en ediciones de «Poemas humanos».]",
  poemSource:
    "Fragmento de «Piedra negra sobre una piedra blanca», de César Vallejo."
},
{
  id: 206,
  category: "Biografías y anécdotas",
  difficulty: "intermedio",
  question:
    "¿Por qué la figura de Sylvia Plath suele aparecer ligada a la etiqueta de 'poesía confesional'?",
  options: [
    "Porque solo escribió autobiografías en prosa",
    "Porque sus poemas borran cualquier referencia personal",
    "Porque integra de forma explícita su vida íntima y su malestar psíquico en la poesía",
    "Porque nunca publicó en vida y todo se descubrió después"
  ],
  correctIndex: 2,
  longExplanation:
    "Sylvia Plath es una de las figuras centrales de lo que se ha llamado 'poesía confesional' en el contexto anglosajón: una escritura que incorpora la experiencia íntima, el conflicto psíquico, la familia y el trauma en el centro del poema. Libros como «Ariel» contienen textos donde la voz poética se expone con una intensidad extrema, entre la denuncia y la autodestrucción, y eso ha hecho que su biografía —incluido su suicidio— se lea muchas veces de forma morbosa. En el taller, la anécdota biográfica sirve para abrir preguntas más complejas: cómo leer estos poemas sin reducirlos a documento clínico, cómo distinguir entre el yo biográfico y el yo textual, y qué significa escribir sobre el propio dolor sin que el poema se cierre en la pura autorreferencia.",
  links: [
    {
      label: "Biografía de Sylvia Plath",
      url: "https://www.biography.com/authors-writers/sylvia-plath"
    },
    {
      label: "Perfil en Poetry Foundation",
      url: "https://www.poetryfoundation.org/poets/sylvia-plath"
    }
  ],
  fullPoem:
    "I am silver and exact. I have no preconceptions.\n" +
    "Whatever I see I swallow immediately\n" +
    "Just as it is, unmisted by love or dislike.\n\n" +
    "[Fragmento del poema «Mirror» (Espejo), útil para trabajar la relación entre mirada, identidad y autoimagen. El texto completo puede consultarse en ediciones de su poesía y recursos digitales especializados.]",
  poemSource:
    "Fragmento del poema «Mirror», de Sylvia Plath."
},
  // ---------------------- SIGLO DE ORO ----------------------
  {
    id: 300,
    category: "Siglo de Oro",
    question: "¿Quién es el autor de las «Soledades», cumbre del culteranismo?",
    options: ["Lope de Vega", "Luis de Góngora", "Garcilaso de la Vega", "Fray Luis de León"],
    correctIndex: 1,
    poemSnippet: "",
    author: "Luis de Góngora",
    sourcePeriod: "Barroco, culteranismo",
    explanation: "Las «Soledades» son el gran poema culterano de Góngora, de extraordinaria complejidad sintáctica.",
    difficulty: "básico",
  },
  {
    id: 301,
    category: "Siglo de Oro",
    question: "¿Qué poeta renacentista introdujo, con Boscán, el endecasílabo italiano en la lírica española?",
    options: ["Garcilaso de la Vega", "San Juan de la Cruz", "Jorge Manrique", "Luis de Góngora"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Garcilaso de la Vega",
    sourcePeriod: "Renacimiento español",
    explanation: "Garcilaso, junto a Juan Boscán, aclimató el endecasílabo y las formas italianas en castellano.",
    difficulty: "básico",
  },
  {
    id: 302,
    category: "Siglo de Oro",
    question: "Las «Coplas a la muerte de su padre» son obra de:",
    options: ["Jorge Manrique", "Garcilaso de la Vega", "Fray Luis de León", "Gonzalo de Berceo"],
    correctIndex: 0,
    poemSnippet: "Recuerde el alma dormida,\navive el seso y despierte\ncontemplando...",
    author: "Jorge Manrique",
    sourcePeriod: "Poesía del siglo XV",
    explanation: "Las «Coplas» son una elegía sobre la fugacidad de la vida, escritas en coplas de pie quebrado.",
    difficulty: "intermedio",
  },
  {
    id: 303,
    category: "Siglo de Oro",
    question: "¿A qué autor se asocia la oda «Vida retirada» y el ideal del «beatus ille»?",
    options: ["Fray Luis de León", "Francisco de Quevedo", "Lope de Vega", "Luis de Góngora"],
    correctIndex: 0,
    poemSnippet: "¡Qué descansada vida\nla del que huye del mundanal ruïdo...",
    author: "Fray Luis de León",
    sourcePeriod: "Renacimiento, ascética española",
    explanation: "Fray Luis canta el retiro y la vida sencilla, recogiendo el tópico horaciano del «beatus ille».",
    difficulty: "intermedio",
  },
  {
    id: 304,
    category: "Siglo de Oro",
    question: "¿Qué dramaturgo del Siglo de Oro, autor de miles de comedias, fue además un prolífico poeta lírico?",
    options: ["Lope de Vega", "Calderón de la Barca", "Tirso de Molina", "Juan Ruiz"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Lope de Vega",
    sourcePeriod: "Barroco español",
    explanation: "Lope, el «Fénix de los Ingenios», cultivó con maestría tanto el teatro como la poesía lírica.",
    difficulty: "básico",
  },
  {
    id: 305,
    category: "Siglo de Oro",
    question: "El motivo del «desengaño» y la fugacidad del tiempo, centrales en el Barroco, expresan sobre todo:",
    options: [
      "Una confianza optimista en el progreso",
      "La conciencia de la vanidad de lo mundano y la cercanía de la muerte",
      "Una celebración del lujo cortesano",
      "El rechazo de la religión",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Barroco español",
    explanation: "El desengaño barroco subraya lo efímero de la vida, la riqueza y la belleza frente a la muerte.",
    difficulty: "intermedio",
  },
  {
    id: 306,
    category: "Siglo de Oro",
    question: "En un soneto que comienza describiendo flores y belleza para terminar en «tierra, humo, polvo, sombra, nada», ¿qué estructura retórica domina?",
    options: [
      "Una enumeración ascendente y optimista",
      "Una gradación descendente que culmina en la nada",
      "Una pregunta retórica sin respuesta",
      "Un diálogo entre dos voces",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "Luis de Góngora",
    sourcePeriod: "Barroco, culteranismo",
    explanation: "Góngora cierra varios sonetos con una gradación descendente que reduce la belleza a la nada, expresión del desengaño barroco.",
    difficulty: "avanzado",
  },
  {
    id: 307,
    category: "Siglo de Oro",
    question: "¿Qué poeta místico es autor de la «Noche oscura del alma» y del «Cántico espiritual»?",
    options: ["San Juan de la Cruz", "Fray Luis de León", "Santa Teresa de Jesús", "Francisco de Quevedo"],
    correctIndex: 0,
    poemSnippet: "En una noche oscura,\ncon ansias, en amores inflamada...",
    author: "San Juan de la Cruz",
    sourcePeriod: "Mística española del XVI",
    explanation: "San Juan de la Cruz expresa la unión mística del alma con Dios mediante un intenso lenguaje simbólico y amoroso.",
    difficulty: "intermedio",
  },
  {
    id: 308,
    category: "Siglo de Oro",
    question: "¿Qué forma estrófica italiana, de versos endecasílabos y heptasílabos, emplea San Juan de la Cruz en sus grandes poemas?",
    options: ["La lira", "La octava real", "El terceto encadenado", "La copla de pie quebrado"],
    correctIndex: 0,
    poemSnippet: "",
    author: "San Juan de la Cruz",
    sourcePeriod: "Métrica del Renacimiento",
    explanation: "La lira combina versos de 7 y 11 sílabas; San Juan la usa en la «Noche oscura» y el «Cántico espiritual».",
    difficulty: "avanzado",
  },
  {
    id: 309,
    category: "Siglo de Oro",
    question: "¿Qué poeta cultivó una vena satírica y burlesca feroz, con sonetos como el dedicado a una nariz?",
    options: ["Francisco de Quevedo", "Garcilaso de la Vega", "Fray Luis de León", "San Juan de la Cruz"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Francisco de Quevedo",
    sourcePeriod: "Barroco, conceptismo",
    explanation: "Quevedo dominó tanto la poesía grave y metafísica como la satírico-burlesca de ingenio mordaz.",
    difficulty: "básico",
  },
 
  // ---------------------- GENERACIÓN DEL 27 ----------------------
  {
    id: 310,
    category: "Generación del 27",
    question: "¿Qué poeta del 27 escribió «Poeta en Nueva York»?",
    options: ["Federico García Lorca", "Rafael Alberti", "Luis Cernuda", "Vicente Aleixandre"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Federico García Lorca",
    sourcePeriod: "Generación del 27",
    explanation: "«Poeta en Nueva York» es el libro de Lorca marcado por el surrealismo y la crítica a la ciudad moderna.",
    difficulty: "básico",
  },
  {
    id: 311,
    category: "Generación del 27",
    question: "¿Qué poeta del 27 recibió el Premio Nobel de Literatura en 1977?",
    options: ["Vicente Aleixandre", "Rafael Alberti", "Pedro Salinas", "Gerardo Diego"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Vicente Aleixandre",
    sourcePeriod: "Generación del 27",
    explanation: "Vicente Aleixandre, autor de «La destrucción o el amor», obtuvo el Nobel en 1977.",
    difficulty: "intermedio",
  },
  {
    id: 312,
    category: "Generación del 27",
    question: "«Marinero en tierra», con su añoranza del mar gaditano, es obra de:",
    options: ["Rafael Alberti", "Luis Cernuda", "Federico García Lorca", "Jorge Guillén"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Rafael Alberti",
    sourcePeriod: "Generación del 27, neopopularismo",
    explanation: "«Marinero en tierra» (1924) es el primer gran libro de Alberti, de inspiración popular y nostálgica.",
    difficulty: "intermedio",
  },
  {
    id: 313,
    category: "Generación del 27",
    question: "¿Qué poeta del 27 tituló «La realidad y el deseo» a la reunión de su obra poética?",
    options: ["Luis Cernuda", "Pedro Salinas", "Dámaso Alonso", "Emilio Prados"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Luis Cernuda",
    sourcePeriod: "Generación del 27",
    explanation: "Cernuda agrupó su poesía bajo el título «La realidad y el deseo», eje temático de toda su obra.",
    difficulty: "intermedio",
  },
  {
    id: 314,
    category: "Generación del 27",
    question: "¿Qué dos poetas del 27 fueron también destacados estudiosos y filólogos, autores de ensayos sobre Góngora?",
    options: [
      "Dámaso Alonso y Jorge Guillén",
      "Lorca y Alberti",
      "Cernuda y Prados",
      "Aleixandre y Altolaguirre",
    ],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Generación del 27",
    explanation: "Dámaso Alonso y Jorge Guillén unieron creación y erudición, con estudios clave sobre Góngora.",
    difficulty: "avanzado",
  },
  {
    id: 315,
    category: "Generación del 27",
    question: "La llamada «poesía pura», que influyó en parte del 27, buscaba sobre todo:",
    options: [
      "La denuncia social directa",
      "Una poesía esencial, despojada de anécdota y sentimentalismo",
      "La imitación del romance medieval",
      "El humor y la parodia",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía pura, influjo de Juan Ramón Jiménez",
    explanation: "La poesía pura, ligada a Juan Ramón Jiménez, aspira a la esencialidad y a depurar el poema de lo accesorio.",
    difficulty: "avanzado",
  },
  {
    id: 316,
    category: "Generación del 27",
    question: "¿Qué acontecimiento histórico marcó trágicamente el final de la etapa de esplendor del grupo del 27?",
    options: [
      "La Primera Guerra Mundial",
      "La Guerra Civil española",
      "La Revolución Industrial",
      "La caída del Muro de Berlín",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Contexto histórico del 27",
    explanation: "La Guerra Civil (1936-39) dispersó al grupo: muerte de Lorca, exilio de Alberti, Cernuda, Salinas, Guillén, etc.",
    difficulty: "básico",
  },
 
  // ---------------------- POESÍA LATINOAMERICANA ----------------------
  {
    id: 317,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta nicaragüense lideró el modernismo y escribió «Azul...» y «Cantos de vida y esperanza»?",
    options: ["Rubén Darío", "José Martí", "Amado Nervo", "Leopoldo Lugones"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Rubén Darío",
    sourcePeriod: "Modernismo hispanoamericano",
    explanation: "Rubén Darío es la gran figura del modernismo, renovador del lenguaje poético en castellano.",
    difficulty: "básico",
  },
  {
    id: 318,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta mexicano, autor de «Piedra de sol», recibió el Premio Nobel en 1990?",
    options: ["Octavio Paz", "Jaime Sabines", "José Emilio Pacheco", "Carlos Pellicer"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Octavio Paz",
    sourcePeriod: "Poesía mexicana del siglo XX",
    explanation: "Octavio Paz, ensayista y poeta, obtuvo el Nobel de Literatura en 1990.",
    difficulty: "básico",
  },
  {
    id: 319,
    category: "Poesía latinoamericana",
    question: "El poemario vanguardista «Trilce» (1922), de ruptura radical del lenguaje, es obra de:",
    options: ["César Vallejo", "Pablo Neruda", "Vicente Huidobro", "Jorge Luis Borges"],
    correctIndex: 0,
    poemSnippet: "",
    author: "César Vallejo",
    sourcePeriod: "Vanguardia peruana",
    explanation: "«Trilce» es uno de los libros más rupturistas de la vanguardia en lengua española.",
    difficulty: "intermedio",
  },
  {
    id: 320,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta chileno fundó el «creacionismo», con la idea del poeta como «pequeño dios»?",
    options: ["Vicente Huidobro", "Pablo Neruda", "Nicanor Parra", "Gonzalo Rojas"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Vicente Huidobro",
    sourcePeriod: "Creacionismo, vanguardia",
    explanation: "Huidobro, autor de «Altazor», propugnó el creacionismo: el poema como creación autónoma, no imitación de la realidad.",
    difficulty: "intermedio",
  },
  {
    id: 321,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta cubano es figura central de la poesía afroantillana, con obras como «Sóngoro cosongo»?",
    options: ["Nicolás Guillén", "José Lezama Lima", "Eliseo Diego", "Nicanor Parra"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Nicolás Guillén",
    sourcePeriod: "Poesía afrocubana",
    explanation: "Nicolás Guillén integró el ritmo y la cultura afrocubana (el «son») en su poesía.",
    difficulty: "intermedio",
  },
  {
    id: 322,
    category: "Poesía latinoamericana",
    question: "¿Qué movimiento, surgido tras la vanguardia, busca reconciliar la poesía con el habla común y lo cotidiano en autores como Benedetti o Cardenal?",
    options: [
      "El conversacionalismo / coloquialismo",
      "El culteranismo",
      "El Parnasianismo",
      "El Romanticismo",
    ],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía conversacional latinoamericana",
    explanation: "La poesía conversacional o coloquial acerca el poema al lenguaje cotidiano y a la realidad social.",
    difficulty: "avanzado",
  },
  {
    id: 323,
    category: "Poesía latinoamericana",
    question: "El sacerdote y poeta nicaragüense Ernesto Cardenal es conocido por desarrollar:",
    options: [
      "El soneto clásico",
      "El «exteriorismo», poesía de datos, hechos y referencias concretas",
      "La poesía puramente abstracta",
      "El haiku tradicional japonés",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "Ernesto Cardenal",
    sourcePeriod: "Poesía nicaragüense del siglo XX",
    explanation: "Cardenal teorizó el «exteriorismo», una poesía hecha con elementos del mundo objetivo: nombres, cifras, anécdotas.",
    difficulty: "avanzado",
  },
  {
    id: 324,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta argentino, también narrador, cultivó una poesía de tono metafísico sobre el tiempo, los espejos y el laberinto?",
    options: ["Jorge Luis Borges", "Roberto Juarroz", "Juan Gelman", "Olga Orozco"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Jorge Luis Borges",
    sourcePeriod: "Poesía argentina del siglo XX",
    explanation: "Borges, además de cuentista, escribió una poesía reflexiva sobre el tiempo, la identidad y el infinito.",
    difficulty: "intermedio",
  },
 
  // ---------------------- POESÍA ESCRITA POR MUJERES ----------------------
  {
    id: 325,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta uruguaya modernista es conocida por su poesía erótica y sensual de principios del siglo XX?",
    options: ["Delmira Agustini", "Juana de Ibarbourou", "Idea Vilariño", "Ida Vitale"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Delmira Agustini",
    sourcePeriod: "Modernismo uruguayo",
    explanation: "Delmira Agustini renovó la poesía erótica femenina dentro del modernismo, con una voz audaz para su época.",
    difficulty: "intermedio",
  },
  {
    id: 326,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta uruguaya fue llamada «Juana de América» por su celebrada poesía de tono vitalista y natural?",
    options: ["Juana de Ibarbourou", "Delmira Agustini", "Alfonsina Storni", "Gabriela Mistral"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Juana de Ibarbourou",
    sourcePeriod: "Poesía uruguaya del siglo XX",
    explanation: "Juana de Ibarbourou, «Juana de América», alcanzó enorme popularidad con libros como «Las lenguas de diamante».",
    difficulty: "intermedio",
  },
  {
    id: 327,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta española contemporánea, premio Cervantes 1992, es autora de una extensa obra y de un célebre diario?",
    options: ["María Zambrano", "Gloria Fuertes", "Carmen Conde", "Ángela Figuera"],
    correctIndex: 2,
    poemSnippet: "",
    author: "Carmen Conde",
    sourcePeriod: "Poesía española del siglo XX",
    explanation: "Carmen Conde fue la primera mujer elegida miembro de número de la Real Academia Española (1978).",
    difficulty: "avanzado",
  },
  {
    id: 328,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta española, popular por su presencia en televisión, escribió tanto poesía para adultos como para niños con humor y ternura?",
    options: ["Gloria Fuertes", "Concha Méndez", "Ernestina de Champourcín", "Josefina de la Torre"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Gloria Fuertes",
    sourcePeriod: "Poesía española del siglo XX",
    explanation: "Gloria Fuertes combinó un lenguaje sencillo y humorístico con la crítica social y la ternura.",
    difficulty: "básico",
  },
  {
    id: 329,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta gallega del siglo XIX, figura del Rexurdimento, escribió «Cantares gallegos» y «En las orillas del Sar»?",
    options: ["Rosalía de Castro", "Emilia Pardo Bazán", "Concepción Arenal", "Carolina Coronado"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Rosalía de Castro",
    sourcePeriod: "Romanticismo / Rexurdimento gallego",
    explanation: "Rosalía de Castro es figura clave del Rexurdimento gallego y de la lírica en castellano del XIX.",
    difficulty: "intermedio",
  },
  {
    id: 330,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta uruguaya, ya citada por su poesía amorosa, perteneció a la llamada Generación del 45?",
    options: ["Idea Vilariño", "Delmira Agustini", "Juana de Ibarbourou", "Marosa di Giorgio"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Idea Vilariño",
    sourcePeriod: "Generación del 45 (Uruguay)",
    explanation: "Idea Vilariño formó parte de la Generación del 45 uruguaya, junto a figuras como Benedetti.",
    difficulty: "avanzado",
  },
  {
    id: 331,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta canadiense contemporánea, helenista, mezcla ensayo, poesía y tradición clásica en libros como «La belleza del marido»?",
    options: ["Anne Carson", "Louise Glück", "Margaret Atwood", "Sharon Olds"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Anne Carson",
    sourcePeriod: "Poesía contemporánea anglófona",
    explanation: "Anne Carson, especialista en griego clásico, difumina los límites entre poesía y ensayo.",
    difficulty: "avanzado",
  },
  {
    id: 332,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta estadounidense recibió el Premio Nobel de Literatura en 2020?",
    options: ["Louise Glück", "Sylvia Plath", "Anne Sexton", "Adrienne Rich"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Louise Glück",
    sourcePeriod: "Poesía estadounidense contemporánea",
    explanation: "Louise Glück ganó el Nobel en 2020 por una obra de gran intensidad y aparente sencillez.",
    difficulty: "intermedio",
  },
 
  // ---------------------- POESÍA CONTEMPORÁNEA ----------------------
  {
    id: 333,
    category: "Poesía contemporánea",
    question: "La «poesía de la experiencia», dominante en la España de los años 80-90, se asocia a autores como:",
    options: [
      "Luis García Montero y Felipe Benítez Reyes",
      "Góngora y Quevedo",
      "Lorca y Alberti",
      "Rubén Darío y Amado Nervo",
    ],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía de la experiencia",
    explanation: "La poesía de la experiencia, con figuras como García Montero, parte de lo cotidiano y de un tono narrativo y realista.",
    difficulty: "intermedio",
  },
  {
    id: 334,
    category: "Poesía contemporánea",
    question: "El movimiento poético español de los años 70 conocido como «los novísimos» se caracterizó por:",
    options: [
      "El realismo social y el lenguaje llano",
      "El culturalismo, las referencias a los medios y el experimentalismo",
      "El retorno estricto al soneto clásico",
      "La poesía exclusivamente religiosa",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Los Novísimos (1970)",
    explanation: "Los «novísimos», reunidos por J. M. Castellet, mezclaban culturalismo, cine, cómic y experimentación.",
    difficulty: "avanzado",
  },
  {
    id: 335,
    category: "Poesía contemporánea",
    question: "¿Qué fenómeno reciente designa a autores muy leídos que difunden poemas breves a través de Instagram y otras redes?",
    options: ["Poesía cortesana", "«Instapoetry» o poesía de redes", "Poesía concreta", "Poesía épica"],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía digital contemporánea",
    explanation: "La «instapoetry» reúne textos breves y compartibles que circulan masivamente en redes sociales.",
    difficulty: "básico",
  },
  {
    id: 336,
    category: "Poesía contemporánea",
    question: "El término «spoken word» se refiere a:",
    options: [
      "Una corriente de poesía escrita solo para libros de lujo",
      "Una poesía pensada para ser recitada y representada en directo ante público",
      "Una técnica de rima medieval",
      "Un tipo de soneto inglés",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía oral contemporánea",
    explanation: "El «spoken word» es poesía oral y performativa, muy ligada a recitales, slams y escena.",
    difficulty: "básico",
  },
  {
    id: 337,
    category: "Poesía contemporánea",
    question: "¿Qué es un «poetry slam»?",
    options: [
      "Un certamen de poesía recitada en el que el público puntúa a los participantes",
      "Una antología impresa anual",
      "Un tipo de estrofa de catorce versos",
      "Una editorial especializada en clásicos",
    ],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Escena del slam poético",
    explanation: "El «poetry slam» es una competición de recitado donde el público (o un jurado improvisado) valora las actuaciones.",
    difficulty: "intermedio",
  },
  {
    id: 338,
    category: "Poesía contemporánea",
    question: "La poesía «concreta» o «visual» se distingue porque:",
    options: [
      "Prescinde por completo de las palabras",
      "La disposición tipográfica y espacial del texto es parte esencial del significado",
      "Solo puede escribirse en latín",
      "Exige siempre rima consonante",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía concreta / visual",
    explanation: "En la poesía concreta, la forma visual del texto en la página es inseparable de su sentido.",
    difficulty: "intermedio",
  },
  {
    id: 339,
    category: "Poesía contemporánea",
    question: "¿Qué poeta español, fallecido en 2021 y premio Cervantes 2006, escribió «Descripción de la mentira» y «Libro del frío»?",
    options: ["Antonio Gamoneda", "Pere Gimferrer", "Claudio Rodríguez", "Ángel González"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Antonio Gamoneda",
    sourcePeriod: "Poesía española contemporánea",
    explanation: "Antonio Gamoneda, voz singular y al margen de modas, recibió el Premio Cervantes en 2006.",
    difficulty: "avanzado",
  },
 
  // ---------------------- BIOGRAFÍAS Y ANÉCDOTAS (modo taller, dominio público) ----------------------
  {
    id: 340,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué circunstancia trágica rodeó la muerte de Federico García Lorca en 1936?",
    options: [
      "Murió de enfermedad en el exilio mexicano",
      "Fue fusilado al comienzo de la Guerra Civil española",
      "Falleció muy anciano en Granada",
      "Desapareció en un naufragio",
    ],
    correctIndex: 1,
    longExplanation:
      "Federico García Lorca fue detenido y fusilado en agosto de 1936, en los primeros días de la Guerra Civil española, cerca de Granada. Su muerte, nunca esclarecida del todo y con su cuerpo jamás localizado con certeza, convirtió al poeta en símbolo de la represión y de la cultura truncada por la guerra. Lorca estaba entonces en la cima de su prestigio, tras el «Romancero gitano», «Poeta en Nueva York» y sus grandes tragedias teatrales. Llevar esta anécdota al taller permite hablar de la relación entre poesía e historia: cómo un contexto político puede silenciar una voz y, paradójicamente, amplificar después su leyenda. También invita a leer su obra sin reducirla a su final trágico, atendiendo a la riqueza simbólica y musical que ya estaba en sus textos mucho antes de 1936.",
    links: [
      { label: "Lorca en la Biblioteca Nacional de España", url: "https://www.bne.es/es/autores/garcia-lorca-federico" },
      { label: "Perfil en la Fundación García Lorca", url: "https://www.patronatogarcialorca.org/" },
    ],
    fullPoem: "",
    poemSource:
      "Por respeto a los derechos de autor, no se reproduce aquí el texto completo de los poemas de Lorca; pueden consultarse en ediciones autorizadas de su obra.",
  },
  {
    id: 341,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué hecho biográfico explica la profunda huella del exilio en la obra de Rafael Alberti?",
    options: [
      "Nunca salió de España",
      "Tras la Guerra Civil vivió décadas exiliado en Argentina e Italia",
      "Fue diplomático en Asia",
      "Se retiró a un monasterio",
    ],
    correctIndex: 1,
    longExplanation:
      "Rafael Alberti, militante comunista, marchó al exilio tras la derrota republicana en la Guerra Civil y pasó largos años en Argentina y, después, en Roma, hasta su regreso a España en 1977. El exilio atraviesa buena parte de su poesía madura: la nostalgia del mar de Cádiz que ya estaba en «Marinero en tierra» se carga ahora de pérdida real, de distancia y de memoria de un país al que no puede volver. Su caso, como el de Cernuda, Salinas, Guillén o tantos otros, muestra cómo la Generación del 27 quedó partida en dos por la guerra: los que murieron o se quedaron y los que escribieron desde fuera. En el taller, esta anécdota sirve para pensar el exilio no solo como dato biográfico, sino como una experiencia que transforma el tono, los temas y hasta la lengua de un poeta.",
    links: [
      { label: "Fundación Rafael Alberti", url: "https://www.rafaelalberti.es/" },
      { label: "Contexto del exilio republicano español", url: "https://www.cervantes.es/" },
    ],
    fullPoem: "",
    poemSource:
      "Los poemas de Rafael Alberti están sujetos a derechos de autor; se recomienda consultarlos en ediciones autorizadas.",
  },
  {
    id: 342,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué actividad política internacional marcó la vida de Pablo Neruda además de la poesía?",
    options: [
      "Fue astronauta",
      "Ejerció como diplomático y senador, y fue candidato a la presidencia de Chile",
      "Dirigió una orquesta sinfónica",
      "Fue piloto de carreras",
    ],
    correctIndex: 1,
    longExplanation:
      "Pablo Neruda no fue solo uno de los poetas más leídos del siglo XX: también desarrolló una intensa vida pública. Trabajó como cónsul en diversos países (de Birmania a España, donde vivió de cerca el estallido de la Guerra Civil), fue senador por el Partido Comunista de Chile, sufrió persecución política y exilio, y en 1970 llegó a ser candidato presidencial antes de retirarse en favor de Salvador Allende. En 1971 recibió el Premio Nobel de Literatura. Esta dimensión política se refleja en libros como «España en el corazón» o el monumental «Canto general», donde la historia y la geografía de América se vuelven materia poética. Para el taller, su biografía permite discutir la figura del poeta comprometido: las tensiones entre arte y militancia, y cómo la experiencia pública puede ampliar —o condicionar— la voz de un autor.",
    links: [
      { label: "Fundación Pablo Neruda", url: "https://fundacionneruda.org/" },
      { label: "Perfil en Poetry Foundation", url: "https://www.poetryfoundation.org/poets/pablo-neruda" },
    ],
    fullPoem: "",
    poemSource:
      "La obra de Pablo Neruda permanece sujeta a derechos de autor; conviene leerla en ediciones autorizadas.",
  },
  {
    id: 343,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué disputa erudita célebre rodeó en vida a Luis de Góngora?",
    options: [
      "Su rivalidad literaria y los ataques mutuos con Francisco de Quevedo",
      "Una polémica sobre astronomía con Galileo",
      "Un pleito por tierras con Lope de Vega",
      "Una discusión sobre gramática latina con Nebrija",
    ],
    correctIndex: 0,
    longExplanation:
      "La enemistad entre Luis de Góngora y Francisco de Quevedo es una de las rivalidades literarias más famosas del Siglo de Oro. Ambos representaban tendencias estéticas distintas —el culteranismo elaborado de Góngora frente al conceptismo cortante de Quevedo— y se dedicaron sonetos satíricos feroces, burlándose el uno del otro con ingenio mordaz. Más allá de la anécdota pintoresca, esta disputa condensa un debate real sobre la lengua poética: hasta qué punto el poema debe buscar la dificultad y la belleza sonora, o la densidad de pensamiento y el juego de conceptos. En el taller, contraponer a Góngora y Quevedo ayuda a entender que el Barroco no fue un bloque uniforme, sino un campo de tensiones donde se discutía apasionadamente qué debía ser la poesía.",
    links: [
      { label: "Góngora en la Biblioteca Virtual Miguel de Cervantes", url: "https://www.cervantesvirtual.com/portales/gongora/" },
      { label: "Quevedo en la Biblioteca Virtual Miguel de Cervantes", url: "https://www.cervantesvirtual.com/portales/francisco_de_quevedo/" },
    ],
    fullPoem:
      "Mientras por competir con tu cabello,\noro bruñido al sol relumbra en vano;\nmientras con menosprecio en medio el llano\nmira tu blanca frente el lilio bello;\n\n[Cuarteto inicial de un soneto de Góngora, en dominio público, útil para apreciar la musicalidad culterana.]",
    poemSource:
      "Cuarteto inicial del soneto «Mientras por competir con tu cabello», de Luis de Góngora (dominio público).",
  },
  {
    id: 344,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué decisión final marcó los últimos años de Sor Juana Inés de la Cruz?",
    options: [
      "Se casó y abandonó el convento",
      "Renunció a las letras y se desprendió de su biblioteca poco antes de morir",
      "Viajó a España para estudiar en la universidad",
      "Fundó una imprenta propia",
    ],
    correctIndex: 1,
    longExplanation:
      "En los últimos años de su vida, tras las presiones eclesiásticas que siguieron a su «Respuesta a Sor Filotea», Sor Juana Inés de la Cruz se desprendió de su extraordinaria biblioteca y de sus instrumentos científicos y musicales, y se recluyó en una vida penitencial. Murió en 1695 atendiendo a sus hermanas enfermas durante una epidemia. Esa renuncia ha sido interpretada de muchas maneras: como sometimiento forzado al poder religioso, como crisis espiritual sincera o como gesto ambiguo difícil de descifrar a la distancia. Para el taller, el episodio abre preguntas potentes sobre los límites impuestos a una inteligencia femenina excepcional en la Nueva España del XVII, y sobre cómo leer hoy un silencio final que contrasta con la brillante defensa del saber que ella misma había escrito.",
    links: [
      { label: "Sor Juana en la Biblioteca Virtual Miguel de Cervantes", url: "https://www.cervantesvirtual.com/portales/sor_juana_ines_de_la_cruz/" },
      { label: "Biografía de Sor Juana Inés de la Cruz", url: "https://es.wikipedia.org/wiki/Juana_In%C3%A9s_de_la_Cruz" },
    ],
    fullPoem:
      "Hombres necios que acusáis\na la mujer sin razón,\nsin ver que sois la ocasión\nde lo mismo que culpáis:\n\n[Redondilla inicial del célebre poema satírico de Sor Juana, en dominio público.]",
    poemSource:
      "Redondilla inicial de «Hombres necios que acusáis», de Sor Juana Inés de la Cruz (dominio público).",
  },
  {
    id: 345,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué profesión, además de la poesía, ejerció el sevillano Gustavo Adolfo Bécquer para ganarse la vida?",
    options: [
      "Marinero",
      "Periodista y escritor de artículos y leyendas",
      "Médico militar",
      "Arquitecto",
    ],
    correctIndex: 1,
    longExplanation:
      "Gustavo Adolfo Bécquer, autor de las «Rimas» y de las «Leyendas», vivió de su trabajo como periodista y escritor en la prensa de su tiempo, en una vida marcada por la precariedad económica y la enfermedad. Murió joven, en 1870, y buena parte de su fama llegó tras su muerte, cuando sus amigos reunieron y publicaron sus «Rimas». Aunque cronológicamente es posterior al Romanticismo europeo, Bécquer está considerado el gran poeta del posromanticismo español y un puente hacia la poesía moderna: su lenguaje sencillo, intimista y musical influyó enormemente en autores posteriores, incluidos varios del 27. En el taller, su biografía permite hablar de la figura del escritor que vive del periodismo, de la fama póstuma y de cómo una obra breve puede tener una influencia desproporcionada respecto a su extensión.",
    links: [
      { label: "Bécquer en la Biblioteca Virtual Miguel de Cervantes", url: "https://www.cervantesvirtual.com/portales/becquer/" },
      { label: "Biografía de Gustavo Adolfo Bécquer", url: "https://es.wikipedia.org/wiki/Gustavo_Adolfo_B%C3%A9cquer" },
    ],
    fullPoem:
      "Volverán las oscuras golondrinas\nen tu balcón sus nidos a colgar,\ny otra vez con el ala a sus cristales\njugando llamarán;\n\n[Estrofa inicial de la Rima LIII de Bécquer, en dominio público.]",
    poemSource:
      "Estrofa inicial de la Rima LIII, de Gustavo Adolfo Bécquer (dominio público).",
  },
 
  // ---------------------- MÁS SIGLO DE ORO ----------------------
  {
    id: 346,
    category: "Siglo de Oro",
    question: "¿Qué tópico literario invita a «aprovechar el día» y la juventud antes de que llegue la vejez?",
    options: ["Carpe diem", "Ubi sunt", "Locus amoenus", "Memento mori"],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Tópicos clásicos en el Siglo de Oro",
    explanation: "El «carpe diem» (toma el día), de origen horaciano, anima a disfrutar el presente y la juventud.",
    difficulty: "básico",
  },
  {
    id: 347,
    category: "Siglo de Oro",
    question: "El tópico «ubi sunt» («¿dónde están?») sirve sobre todo para:",
    options: [
      "Describir un paisaje idílico",
      "Lamentar la desaparición de quienes ya murieron y la fugacidad de las glorias pasadas",
      "Celebrar una boda",
      "Elogiar la riqueza",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Tópicos medievales y áureos",
    explanation: "El «ubi sunt» pregunta por los que ya no están, subrayando lo efímero de la vida y la fama (presente en Manrique).",
    difficulty: "intermedio",
  },
 
  // ---------------------- MÁS GENERACIÓN DEL 27 ----------------------
  {
    id: 348,
    category: "Generación del 27",
    question: "¿Qué poeta del 27, autor de «Cántico», buscó una poesía de celebración del mundo y de la existencia?",
    options: ["Jorge Guillén", "Rafael Alberti", "Federico García Lorca", "Emilio Prados"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Jorge Guillén",
    sourcePeriod: "Generación del 27, poesía pura",
    explanation: "Jorge Guillén, con «Cántico», representa una poesía afirmativa, esencial y celebratoria del ser.",
    difficulty: "intermedio",
  },
  {
    id: 349,
    category: "Generación del 27",
    question: "Además de poetas, el ambiente del 27 estuvo ligado a artistas e instituciones como:",
    options: [
      "La Residencia de Estudiantes de Madrid, Dalí y Buñuel",
      "La corte de Versalles",
      "Los talleres del Renacimiento florentino",
      "Los cafés del Romanticismo alemán",
    ],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Contexto cultural del 27",
    explanation: "La Residencia de Estudiantes fue un hervidero cultural donde coincidieron Lorca, Dalí y Buñuel, entre otros.",
    difficulty: "básico",
  },
 
  // ---------------------- MÁS POESÍA LATINOAMERICANA ----------------------
  {
    id: 350,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta cubano, autor de «Versos sencillos» y figura de la independencia, es precursor del modernismo?",
    options: ["José Martí", "Rubén Darío", "Nicolás Guillén", "José Lezama Lima"],
    correctIndex: 0,
    poemSnippet: "",
    author: "José Martí",
    sourcePeriod: "Precursores del modernismo",
    explanation: "José Martí, héroe de la independencia cubana, es además precursor del modernismo con sus «Versos sencillos».",
    difficulty: "intermedio",
  },
  {
    id: 351,
    category: "Poesía latinoamericana",
    question: "¿Qué poeta cubano lideró el grupo «Orígenes» y desarrolló un neobarroquismo muy denso y culto?",
    options: ["José Lezama Lima", "Nicolás Guillén", "Eliseo Diego", "Roberto Fernández Retamar"],
    correctIndex: 0,
    poemSnippet: "",
    author: "José Lezama Lima",
    sourcePeriod: "Neobarroco cubano",
    explanation: "José Lezama Lima, autor de «Paradiso», encabezó la revista «Orígenes» y un estilo neobarroco exuberante.",
    difficulty: "avanzado",
  },
 
  // ---------------------- MÁS POESÍA ESCRITA POR MUJERES ----------------------
  {
    id: 352,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta estadounidense del siglo XIX, hoy considerada esencial, vivió recluida y publicó casi toda su obra de forma póstuma?",
    options: ["Emily Dickinson", "Elizabeth Bishop", "Marianne Moore", "Adrienne Rich"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Emily Dickinson",
    sourcePeriod: "Poesía estadounidense del siglo XIX",
    explanation: "Emily Dickinson escribió cientos de poemas que solo se publicaron y valoraron plenamente tras su muerte.",
    difficulty: "básico",
  },
  {
    id: 353,
    category: "Poesía escrita por mujeres",
    question: "¿Qué poeta uruguaya contemporánea, premio Cervantes 2018, es una de las grandes voces actuales en español?",
    options: ["Ida Vitale", "Idea Vilariño", "Marosa di Giorgio", "Cristina Peri Rossi"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Ida Vitale",
    sourcePeriod: "Poesía uruguaya contemporánea",
    explanation: "Ida Vitale, ligada a la Generación del 45, recibió el Premio Cervantes en 2018.",
    difficulty: "avanzado",
  },
 
  // ---------------------- MÁS POESÍA CONTEMPORÁNEA ----------------------
  {
    id: 354,
    category: "Poesía contemporánea",
    question: "¿Qué poeta español, fallecido en 2014 y voz central de la «poesía de la experiencia» con tono irónico, escribió «Tratado de urbanismo»?",
    options: ["Ángel González", "Jaime Gil de Biedma", "José Hierro", "Claudio Rodríguez"],
    correctIndex: 0,
    poemSnippet: "",
    author: "Ángel González",
    sourcePeriod: "Generación del 50 / poesía española",
    explanation: "Ángel González, de la Generación del 50, combinó la reflexión cívica con la ironía y la ternura.",
    difficulty: "avanzado",
  },
  {
    id: 355,
    category: "Poesía contemporánea",
    question: "¿Qué premio se considera el más importante de las letras en lengua española, otorgado anualmente desde 1976?",
    options: ["El Premio Cervantes", "El Premio Goncourt", "El Premio Booker", "El Premio Strega"],
    correctIndex: 0,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Institución literaria contemporánea",
    explanation: "El Premio Cervantes reconoce la trayectoria de autores en lengua española; varios poetas lo han recibido.",
    difficulty: "básico",
  },
  {
    id: 356,
    category: "Poesía contemporánea",
    question: "La «poesía social», muy presente en la España de los años 50, se caracterizaba por:",
    options: [
      "Evadirse de la realidad en mundos fantásticos",
      "Denunciar la injusticia y dirigirse «a la inmensa mayoría»",
      "Cultivar exclusivamente el soneto amoroso",
      "Rechazar cualquier compromiso con la realidad",
    ],
    correctIndex: 1,
    poemSnippet: "",
    author: "",
    sourcePeriod: "Poesía social española (años 50)",
    explanation: "La poesía social (Blas de Otero, Gabriel Celaya…) entendía el poema como herramienta de denuncia y comunicación con la mayoría.",
    difficulty: "intermedio",
  },
 
  // ---------------------- MÁS BIOGRAFÍAS Y ANÉCDOTAS ----------------------
  {
    id: 357,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué tiene de singular la transmisión de la obra poética de Gustavo Adolfo Bécquer?",
    options: [
      "La publicó toda en vida en grandes tiradas",
      "Sus «Rimas» se ordenaron y publicaron tras su muerte, a partir de un manuscrito",
      "Se conserva solo en grabaciones sonoras",
      "Nunca se ha llegado a publicar",
    ],
    correctIndex: 1,
    longExplanation:
      "Gran parte de la fama de Bécquer es póstuma. Murió joven y pobre en 1870, y fueron sus amigos quienes reunieron sus «Rimas» y las publicaron al año siguiente, ordenándolas en una secuencia que sugiere casi una historia de amor y desengaño. El manuscrito conocido como «Libro de los gorriones» recoge muchos de estos textos. Esta circunstancia editorial es relevante porque el orden y la lectura «de conjunto» de las «Rimas» que conocemos hoy no es necesariamente la que el propio Bécquer habría fijado: en parte es una construcción posterior. Para el taller, el caso permite hablar de algo poco visible para el lector común: cómo la mano de los editores, el azar de los manuscritos y la muerte temprana de un autor pueden modelar la forma en que una obra llega finalmente a nosotros.",
    links: [
      { label: "Bécquer en la Biblioteca Virtual Miguel de Cervantes", url: "https://www.cervantesvirtual.com/portales/becquer/" },
      { label: "El «Libro de los gorriones» (Biblioteca Nacional)", url: "https://www.bne.es/" },
    ],
    fullPoem:
      "Podrá nublarse el sol eternamente;\npodrá secarse en un instante el mar;\npodrá romperse el eje de la Tierra\ncomo un débil cristal.\n\n[Estrofa de la Rima del «amor eterno» de Bécquer, en dominio público.]",
    poemSource:
      "Estrofa de una de las Rimas de Gustavo Adolfo Bécquer (dominio público).",
  },
  {
    id: 358,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué dato biográfico hizo de Gabriela Mistral una figura pionera en 1945?",
    options: [
      "Fue la primera mujer en pilotar un avión por los Andes",
      "Fue la primera persona latinoamericana en recibir el Premio Nobel de Literatura",
      "Fundó la primera universidad de Chile",
      "Fue la primera presidenta de un país americano",
    ],
    correctIndex: 1,
    longExplanation:
      "Gabriela Mistral, seudónimo de Lucila Godoy Alcayaga, fue en 1945 la primera persona latinoamericana en recibir el Premio Nobel de Literatura, un hito enorme para la región y, en particular, para una mujer que venía del mundo rural y de la enseñanza. Antes de la fama internacional, Mistral fue maestra durante años, y la educación, la infancia y el cuidado son temas que recorren su obra junto al dolor, la maternidad simbólica y lo sagrado. Su reconocimiento abrió camino a otras voces latinoamericanas que vendrían después. En el taller, su biografía sirve para hablar de cómo el origen social y geográfico, la condición de mujer y la vocación docente pueden cruzarse con la creación poética, y de la importancia de los premios como gestos que cambian la visibilidad de toda una tradición.",
    links: [
      { label: "Gabriela Mistral en Poetry Foundation", url: "https://www.poetryfoundation.org/poets/gabriela-mistral" },
      { label: "Biografía de Gabriela Mistral", url: "https://es.wikipedia.org/wiki/Gabriela_Mistral" },
    ],
    fullPoem: "",
    poemSource:
      "Buena parte de la obra de Gabriela Mistral está sujeta a derechos; conviene consultarla en ediciones autorizadas.",
  },
  {
    id: 359,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué refleja la relación de Garcilaso de la Vega entre su vida y su poesía?",
    options: [
      "Fue un monje alejado del mundo",
      "Fue un soldado y cortesano que murió joven en campaña militar",
      "Fue un comerciante que nunca viajó",
      "Fue un rey que abandonó el trono",
    ],
    correctIndex: 1,
    longExplanation:
      "Garcilaso de la Vega encarna el ideal renacentista del hombre completo: a la vez soldado al servicio del emperador Carlos V y refinado poeta. Llevó una vida cortesana y militar intensa, viajó por Italia —donde asimiló la nueva poesía— y murió joven, en 1536, a consecuencia de las heridas sufridas en una acción militar en el sur de Francia. Esa biografía de armas y letras está muy presente en la lectura de su obra: sus églogas y sonetos, de aparente serenidad clásica, dejan entrever la melancolía, el amor no correspondido y la conciencia de la fragilidad de la vida. En el taller, su caso permite discutir el ideal renacentista de equilibrio entre acción y contemplación, y cómo una vida breve e intensa puede condensarse en una obra reducida pero decisiva para toda la poesía posterior en castellano.",
    links: [
      { label: "Garcilaso en la Biblioteca Virtual Miguel de Cervantes", url: "https://www.cervantesvirtual.com/portales/garcilaso/" },
      { label: "Biografía de Garcilaso de la Vega", url: "https://es.wikipedia.org/wiki/Garcilaso_de_la_Vega" },
    ],
    fullPoem:
      "Cuando me paro a contemplar mi estado\ny a ver los pasos por do me han traído,\nhallo, según por do anduve perdido,\nque a mayor mal pudiera haber llegado;\n\n[Cuarteto inicial de un soneto de Garcilaso, en dominio público.]",
    poemSource:
      "Cuarteto inicial del Soneto I de Garcilaso de la Vega (dominio público).",
  },
];
function App() {
  const [screen, setScreen] = useState("home"); // home | quiz | results | ranking
  const [mode, setMode] = useState("juego"); // juego | taller
  const [level, setLevel] = useState("básico"); // básico | intermedio | avanzado
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [correctByCategory, setCorrectByCategory] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setRanking(JSON.parse(stored));
      } catch {
        setRanking([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ranking));
  }, [ranking]);

  const totalQuestions = currentQuestions.length;

  const currentQuestion = useMemo(
    () => currentQuestions[currentIndex],
    [currentQuestions, currentIndex]
  );

  function handleStart(category) {
    setSelectedCategory(category);
    setCorrectByCategory({});

    let filtered;
    
  if (category === "Todas las categorías") {
    // mezcla de todas las categorías, solo por nivel
    filtered = QUESTIONS.filter((q) => q.difficulty === level);
  } else {
    // comportamiento actual: misma categoría + nivel
    filtered = QUESTIONS.filter(
      (q) => q.category === category && q.difficulty === level
    );
  }
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScreen("quiz");
  }

  function handleOptionClick(index) {
    if (showFeedback || !currentQuestion) return;

    setSelectedOption(index);
    setShowFeedback(true);

    const isCorrect = index === currentQuestion.correctIndex;

    if (mode === "juego" && isCorrect) {
      setCurrentScore((prev) => prev + 10);
    }
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setCorrectByCategory((prev) => {
        const cat = currentQuestion.category;
        return {
          ...prev,
          [cat]: (prev[cat] || 0) + 1,
        };
      });
    }
  }

  function handleNextQuestion() {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setScreen("results");
    }
  }

  function handleSaveRanking(name) {
    if (!name) return;
    const newEntry = {
      name,
      score: currentScore,
      correct: correctCount,
      total: totalQuestions,
      category: selectedCategory,
      mode,
      level,
      date: new Date().toISOString(),
    };
    const updated = [...ranking, newEntry].sort((a, b) => b.score - a.score);
    setRanking(updated.slice(0, 50));
  }

  function handleRestart() {
    setScreen("home");
    setSelectedCategory(null);
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setShowFeedback(false);
  }

  return (
    <div className="app-container">
      <header className="app-header">
  <img src={logoImg} alt="POETRIVIAL" className="app-logo" />
  <p className="subtitle">
    Pon a prueba tus conocimientos poéticos y deja ya de creerte Lope de Vega.
  </p>
</header>
      {screen === "home" && (
        <HomeScreen
          categories={CATEGORIES}
          mode={mode}
          level={level}
          onModeChange={setMode}
          onLevelChange={setLevel}
          onStart={handleStart}
          onViewRanking={() => setScreen("ranking")}
        />
      )}

      {screen === "quiz" && currentQuestion && (
        <QuizScreen
          mode={mode}
          category={selectedCategory}
          question={currentQuestion}
          questionIndex={currentIndex}
          totalQuestions={totalQuestions}
          score={currentScore}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          onOptionClick={handleOptionClick}
          onNext={handleNextQuestion}
        />
      )}

     {screen === "results" && (
  <ResultsScreen
    mode={mode}
    score={currentScore}
    correct={correctCount}
    total={totalQuestions}
    category={selectedCategory}
    correctByCategory={correctByCategory}
    onRestart={handleRestart}
    onSaveRanking={handleSaveRanking}
    onViewRanking={() => setScreen("ranking")}
  />
)}

      {screen === "ranking" && (
        <RankingScreen ranking={ranking} onBack={() => setScreen("home")} />
      )}

      <footer className="app-footer">
        <small>POETRIVIAL · Un jueguito de{" "}
    <a
      href="https://instagram.com/escarpa"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-link"
    >
      Gonzalo Escarpa
    </a></small>
      </footer>
    </div>
  );
}

function HomeScreen({
  categories,
  mode,
  level,
  onModeChange,
  onLevelChange,
  onStart,
  onViewRanking,
}) {
  return (
    <main className="screen">
      <img
      src={lopeImg}
      alt="Lope de Vega"
      className="lope-hero"
    />
      <h2>Elige cómo quieres jugar</h2>

      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === "juego" ? "active" : ""}`}
          onClick={() => onModeChange("juego")}
        >
          Modo juego
        </button>
        <button
          className={`mode-btn ${mode === "taller" ? "active" : ""}`}
          onClick={() => onModeChange("taller")}
        >
          Modo taller
        </button>
      </div>

      <p className="mode-description">
        {mode === "juego"
          ? "Puntuación, ranking y ritmo más ágil, ideal para divertirte."
          : "Sin puntuación, con más énfasis en explicaciones, fragmentos y contexto, ideal para aprender."}
      </p>

      <h3>Nivel de dificultad</h3>
      <div className="mode-toggle">
        <button
          className={`mode-btn ${level === "básico" ? "active" : ""}`}
          onClick={() => onLevelChange("básico")}
        >
          Básico
        </button>
        <button
          className={`mode-btn ${level === "intermedio" ? "active" : ""}`}
          onClick={() => onLevelChange("intermedio")}
        >
          Intermedio
        </button>
        <button
          className={`mode-btn ${level === "avanzado" ? "active" : ""}`}
          onClick={() => onLevelChange("avanzado")}
        >
          Avanzado
        </button>
      </div>

      <h3>Categorías</h3>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className="btn category-btn"
            onClick={() => onStart(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <button className="btn secondary" onClick={onViewRanking}>
        Ver ranking
      </button>
    </main>
  );
}

function QuizScreen({
  mode,
  category,
  question,
  questionIndex,
  totalQuestions,
  score,
  selectedOption,
  showFeedback,
  onOptionClick,
  onNext,
}) {
  const isCorrect =
    selectedOption !== null && selectedOption === question.correctIndex;

  return (
    <main className="screen">
      
      <div className="quiz-header">
        <span className="badge">
          {category} · {question.difficulty}
        </span>
        <span>
          Pregunta {questionIndex + 1} / {totalQuestions}
        </span>
        {mode === "juego" && <span>Puntuación: {score}</span>}
        {mode === "taller" && <span>Modo taller</span>}
      </div>
<div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
      />
    </div>
      <h2 className="question-text">{question.question}</h2>

      {mode === "taller" && question.poemSnippet && (
        <pre className="poem-snippet">{question.poemSnippet}</pre>
      )}

      <div className="options-list">
        {question.options.map((opt, index) => {
          let className = "option-btn";
          if (showFeedback) {
            if (index === question.correctIndex) {
              className += " correct";
            } else if (index === selectedOption) {
              className += " incorrect";
            }
          }
          return (
            <button
              key={index}
              className={className}
              onClick={() => onOptionClick(index)}
              disabled={showFeedback}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showFeedback && (
  <div className={`feedback ${isCorrect ? "ok" : "fail"}`}>
    <p>{isCorrect ? "¡Correcto!" : "Respuesta incorrecta."}</p>

    {/* MODO JUEGO: tu bloque actual, tal cual */}
    {mode === "juego" && (
      (question.author ||
        question.sourcePeriod ||
        question.explanation ||
        question.difficulty) && (
        <div className="meta-block">
          {question.author && (
            <p>
              <strong>Autoría:</strong> {question.author}
            </p>
          )}
          {question.sourcePeriod && (
            <p>
              <strong>Contexto:</strong> {question.sourcePeriod}
            </p>
          )}
          {question.difficulty && (
            <p>
              <strong>Dificultad:</strong> {question.difficulty}
            </p>
          )}
          {question.explanation && (
            <p className="explanation">{question.explanation}</p>
          )}
        </div>
      )
    )}

    {/* MODO TALLER: bloque largo con biografía, enlaces y poema */}
    {mode === "taller" && (
      <div className="meta-block">
        {question.longExplanation && (
          <p className="explanation">{question.longExplanation}</p>
        )}

        {question.fullPoem && (
          <pre className="poem-snippet">{question.fullPoem}</pre>
        )}
{question.links && question.links.length > 0 && (
  <ul className="resource-links">
    {question.links.map((link) => (
      <li key={link.url}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
)}
      </div>
    )}

    <button className="btn" onClick={onNext}>
      Siguiente
    </button>
  </div>
)}
    </main>
  );
}
function LearningSummary({ correctByCategory }) {
  const entries = Object.entries(correctByCategory);

  if (entries.length === 0) {
    return (
      <p>
        Has jugado poco como para sacar conclusiones poéticas. Vuelve a intentarlo.
      </p>
    );
  }

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const [bestCat] = sorted[0];
  const worstCat = sorted[sorted.length - 1][0];

  const narrative =
    sorted.length === 1
      ? `Has brillado en ${bestCat}.`
      : `Has brillado en ${bestCat}, te falta afinar en ${worstCat}.`;

  return (
    <div className="learning-summary">
      <h3>Resumen de aprendizaje</h3>
      <ul>
        {entries.map(([category, count]) => (
          <li key={category}>
            Has acertado {count} pregunta{count !== 1 ? "s" : ""} de {category}.
          </li>
        ))}
      </ul>
      <p className="learning-narrative">{narrative}</p>
    </div>
  );
}
function ResultsScreen({
  mode,
  score,
  correct,
  total,
  category,
  correctByCategory,
  onRestart,
  onSaveRanking,
  onViewRanking,
}) {
  const [name, setName] = useState("");
  function handleSave() {
    onSaveRanking(name.trim());
    setName("");
  }

  return (
    <main className="screen">
      <h2>Resultados</h2>
      <p>
        Categoría: <strong>{category}</strong>
      </p>
      <p>
        Aciertos: {correct} / {total}
      </p>

      {mode === "juego" && <p>Puntuación total: {score}</p>}
      <LearningSummary correctByCategory={correctByCategory} />

      {mode === "juego" && (
        <div className="ranking-form">
          <label>
            Guarda tu puntuación en el ranking:
            <input
              type="text"
              placeholder="Tu nombre o alias"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button
            className="btn"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Guardar en ranking
          </button>
        </div>
      )}
{mode === "taller" && (
  <p>Has estado en modo taller: aquí importa más lo aprendido que la puntuación.</p>
)}
      <div className="results-actions">
        <button className="btn" onClick={onRestart}>
          Volver al inicio
        </button>
        <button className="btn secondary" onClick={onViewRanking}>
          Ver ranking
        </button>
      </div>
    </main>
  );
}

function RankingScreen({ ranking, onBack }) {
  return (
    <main className="screen">
      <h2>Ranking</h2>
      {ranking.length === 0 ? (
        <p>Aún no hay puntuaciones guardadas.</p>
      ) : (
        <ol className="ranking-list">
          {ranking.map((entry, index) => (
            <li key={index}>
              <span className="rank-position">{index + 1}.</span>{" "}
              <span className="rank-name">{entry.name}</span>{" "}
              <span className="rank-score">{entry.score} puntos</span>{" "}
              <span className="rank-meta">
                ({entry.correct}/{entry.total} en {entry.category},{" "}
                {entry.mode}, {entry.level})
              </span>
            </li>
          ))}
        </ol>
      )}
      <button className="btn" onClick={onBack}>
        Volver
      </button>
    </main>
  );
}

export default App;
