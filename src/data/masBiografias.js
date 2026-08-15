// Bloque adicional de 72 fichas de Biografías y anécdotas (ids 360-431)
// para completar 30 básico / 30 intermedio / 30 avanzado.
// Uso en App.jsx: import { MAS_BIOGRAFIAS } from './data/masBiografias';
// y luego: const QUESTIONS = [...QUESTIONS_BASE, ...MAS_BIOGRAFIAS];

export const MAS_BIOGRAFIAS = [
  {
    id: 360,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Dónde y cómo murió Antonio Machado en 1939?",
    options: [
      "En Sevilla, de vejez",
      "En Collioure (Francia), poco después de exiliarse",
      "En Madrid, durante un bombardeo",
      "En México, ya anciano"
    ],
    correctIndex: 1,
    longExplanation:
      "Antonio Machado cruzó a pie la frontera francesa a finales de enero de 1939, junto a miles de personas que huían del avance de las tropas franquistas. Llegó muy enfermo a Collioure, un pueblo costero cercano a la frontera, y murió allí el 22 de febrero de ese mismo año. Su madre falleció solo tres días después.",
    links: [
      { label: "Antonio Machado en Collioure", url: "https://redciudadesmachadianas.org/ciudad/collioure/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Antonio Machado está sujeta a derechos en muchas ediciones.",
  },
  {
    id: 361,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué le ocurrió al poeta Miguel Hernández tras el final de la Guerra Civil?",
    options: [
      "Se exilió sin problemas a Francia",
      "Fue detenido, encarcelado y murió en prisión",
      "Se retiró a escribir en el campo",
      "Emigró a Argentina"
    ],
    correctIndex: 1,
    longExplanation:
      "Miguel Hernández intentó huir a Portugal, fue detenido, pasó por varias cárceles y murió de tuberculosis en la prisión de Alicante en 1942, con 31 años.",
    links: [
      { label: "Miguel Hernández, biografía", url: "https://es.wikipedia.org/wiki/Miguel_Hern%C3%A1ndez" }
    ],
    fullPoem: "",
    poemSource: "La obra de Miguel Hernández está protegida por derechos de autor.",
  },
  {
    id: 362,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿En qué año recibió Juan Ramón Jiménez el Premio Nobel de Literatura?",
    options: [
      "1945",
      "1956",
      "1971",
      "1990"
    ],
    correctIndex: 1,
    longExplanation:
      "Juan Ramón Jiménez recibió el Nobel en 1956, exiliado en Puerto Rico. Su esposa Zenobia Camprubí murió tres días después del anuncio.",
    links: [
      { label: "Juan Ramón Jiménez, biografía", url: "https://www.cervantes.es/bibliotecas_documentacion_espanol/biografias/nueva_delhi_juan_ramon_jimenez.htm" }
    ],
    fullPoem: "",
    poemSource: "La obra de Juan Ramón Jiménez está sujeta a derechos de autor.",
  },
  {
    id: 363,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Quién fue Zenobia Camprubí en relación con Juan Ramón Jiménez?",
    options: [
      "Su editora en Francia",
      "Su esposa y colaboradora durante cuarenta años",
      "Su hermana",
      "Su traductora al inglés únicamente"
    ],
    correctIndex: 1,
    longExplanation:
      "Zenobia Camprubí fue esposa y colaboradora de Juan Ramón Jiménez durante cuatro décadas; él reconoció públicamente su papel al recibir el Nobel.",
    links: [
      { label: "Zenobia Camprubí", url: "https://www.larazon.es/cultura/20201012/jdtv3p26ibbbbbxrqfnnn7u7vu.html" }
    ],
    fullPoem: "",
    poemSource: "No aplica.",
  },
  {
    id: 364,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué edad tenía Miguel Hernández cuando murió?",
    options: [
      "21 años",
      "31 años",
      "45 años",
      "60 años"
    ],
    correctIndex: 1,
    longExplanation:
      "Miguel Hernández murió con 31 años en la prisión de Alicante, en 1942.",
    links: [
      { label: "Miguel Hernández, biografía", url: "https://www.revivemadrid.com/literatos/miguel-hernandez" }
    ],
    fullPoem: "",
    poemSource: "La obra de Miguel Hernández está sujeta a derechos de autor.",
  },
  {
    id: 365,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué causa provocó la muerte de Miguel Hernández en prisión?",
    options: [
      "Tuberculosis",
      "Fusilamiento",
      "Un accidente",
      "Envenenamiento"
    ],
    correctIndex: 0,
    longExplanation:
      "Murió de tuberculosis, agravada por las duras condiciones carcelarias de la posguerra.",
    links: [
      { label: "Miguel Hernández en prisión", url: "https://150valencianos.lasprovincias.es/miguel-hernandez/" }
    ],
    fullPoem: "",
    poemSource: "No se reproduce texto por derechos de autor.",
  },
  {
    id: 366,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿En qué país pasó Juan Ramón Jiménez buena parte de su exilio?",
    options: [
      "Argentina",
      "Puerto Rico",
      "Cuba únicamente",
      "México"
    ],
    correctIndex: 1,
    longExplanation:
      "Tras la Guerra Civil se exilió y se estableció en Puerto Rico, donde vivió sus últimos años.",
    links: [
      { label: "Juan Ramón Jiménez, biografía", url: "https://www.cervantes.es/bibliotecas_documentacion_espanol/biografias/nueva_delhi_juan_ramon_jimenez.htm" }
    ],
    fullPoem: "",
    poemSource: "La obra de Juan Ramón Jiménez está sujeta a derechos de autor.",
  },
  {
    id: 367,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué relación tenía Antonio Machado con la Guerra Civil española?",
    options: [
      "No se vio afectado por ella",
      "Tuvo que exiliarse y murió poco después, fuera de España",
      "Luchó como oficial del ejército",
      "Vivió la guerra sin cambiar de residencia"
    ],
    correctIndex: 1,
    longExplanation:
      "Machado apoyó la causa republicana y cruzó a Francia al final de la guerra, muriendo poco después en Collioure.",
    links: [
      { label: "Antonio Machado, biografía", url: "https://www.machado-collioure.fr/antonio-machado-los-dias-azules/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Antonio Machado está sujeta a derechos de autor.",
  },
  {
    id: 368,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Cómo autofinanció Walt Whitman la primera edición de Hojas de hierba en 1855?",
    options: [
      "Con una beca del gobierno",
      "Pagándola él mismo e incluso participando en la composición tipográfica",
      "Con un préstamo bancario",
      "Nunca llegó a pagarla, la regaló una editorial"
    ],
    correctIndex: 1,
    longExplanation:
      "Whitman financió la impresión con su propio dinero y participó en la composición tipográfica; la edición apareció sin su nombre en la portada.",
    links: [
      { label: "Hojas de hierba, Wikipedia", url: "https://es.wikipedia.org/wiki/Hojas_de_hierba" }
    ],
    fullPoem: "",
    poemSource: "La obra de Whitman está sujeta a derechos de traducción.",
  },
  {
    id: 369,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Cuántas ediciones distintas de Hojas de hierba publicó Walt Whitman a lo largo de su vida?",
    options: [
      "Solo una",
      "Dos",
      "Nueve",
      "Veinte"
    ],
    correctIndex: 2,
    longExplanation:
      "Whitman publicó nueve ediciones entre 1855 y 1892, pasando de doce a más de cuatrocientos poemas.",
    links: [
      { label: "Hojas de hierba, Wikipedia", url: "https://es.wikipedia.org/wiki/Hojas_de_hierba" }
    ],
    fullPoem: "",
    poemSource: "La obra de Whitman está sujeta a derechos de traducción.",
  },
  {
    id: 370,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué tiene de particular la muerte de Edgar Allan Poe en 1849?",
    options: [
      "Murió centenario, de causas naturales",
      "Fue hallado en estado de delirio en la calle y murió poco después sin que se aclarasen las causas",
      "Murió en un naufragio",
      "Se conocen con precisión todos los detalles de su muerte"
    ],
    correctIndex: 1,
    longExplanation:
      "Poe fue hallado delirante en Baltimore y murió pocos días después sin causas confirmadas.",
    links: [
      { label: "Edgar Allan Poe, biografía", url: "https://es.wikipedia.org/wiki/Edgar_Allan_Poe" }
    ],
    fullPoem: "",
    poemSource: "La obra de Poe está sujeta a derechos de traducción.",
  },
  {
    id: 371,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿En qué ciudad murió Edgar Allan Poe?",
    options: [
      "Boston",
      "Nueva York",
      "Baltimore",
      "Filadelfia"
    ],
    correctIndex: 2,
    longExplanation:
      "Nació en Boston pero murió en Baltimore en 1849.",
    links: [
      { label: "Edgar Allan Poe, National Geographic", url: "https://historia.nationalgeographic.com.es/a/edgar-allan-poe-maestro-literario-terror_14764" }
    ],
    fullPoem: "",
    poemSource: "La obra de Poe está sujeta a derechos de traducción.",
  },
  {
    id: 372,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué se atribuye tradicionalmente a la figura de Homero?",
    options: [
      "Haber sido un emperador romano",
      "Haber sido ciego y autor de la Ilíada y la Odisea",
      "Haber inventado la imprenta",
      "Haber vivido en el siglo XIX"
    ],
    correctIndex: 1,
    longExplanation:
      "La tradición presenta a Homero como poeta ciego, autor de la Ilíada y la Odisea, aunque puede ser el símbolo de una tradición oral colectiva.",
    links: [
      { label: "Homero, Wikipedia", url: "https://es.wikipedia.org/wiki/Homero" }
    ],
    fullPoem: "",
    poemSource: "Las traducciones varían según la edición.",
  },
  {
    id: 373,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué teoría defienden muchos especialistas sobre el origen de los poemas homéricos?",
    options: [
      "Que fueron escritos por una sola persona en el siglo XIX",
      "Que son producto de una larga tradición oral transmitida por generaciones de aedos",
      "Que se escribieron primero en latín",
      "Que no tienen ninguna relación con la cultura griega"
    ],
    correctIndex: 1,
    longExplanation:
      "La teoría oralista sostiene que los poemas homéricos proceden de una larga tradición oral de aedos.",
    links: [
      { label: "Homero, Wikipedia", url: "https://es.wikipedia.org/wiki/Homero" }
    ],
    fullPoem: "",
    poemSource: "Las traducciones varían según la edición.",
  },
  {
    id: 374,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué ocurrió con la primera edición de Hojas de hierba de Walt Whitman en cuanto a ventas?",
    options: [
      "Se agotó en pocas horas",
      "Apenas vendió unos pocos ejemplares",
      "Fue un éxito comercial inmediato",
      "Se prohibió su venta"
    ],
    correctIndex: 1,
    longExplanation:
      "Apenas vendió unos pocos ejemplares en 1855; el reconocimiento llegó de forma progresiva.",
    links: [
      { label: "Walt Whitman, Editorial Alma", url: "https://www.editorialalma.com/autores/walt-whitman" }
    ],
    fullPoem: "",
    poemSource: "La obra de Whitman está sujeta a derechos de traducción.",
  },
  {
    id: 375,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿En qué siglo se sitúa tradicionalmente a Homero?",
    options: [
      "Siglo I d.C.",
      "Siglo VIII a.C.",
      "Siglo XV",
      "Siglo III a.C."
    ],
    correctIndex: 1,
    longExplanation:
      "Se sitúa a Homero en torno al siglo VIII antes de Cristo, inicio de la literatura griega.",
    links: [
      { label: "Homero, Wikipedia", url: "https://es.wikipedia.org/wiki/Homero" }
    ],
    fullPoem: "",
    poemSource: "Las traducciones varían según la edición.",
  },
  {
    id: 376,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué le ocurrió a Dante Alighieri en 1302 que marcó el resto de su vida?",
    options: [
      "Fue nombrado embajador de Florencia",
      "Fue desterrado de Florencia bajo amenaza de muerte",
      "Ganó un concurso de poesía",
      "Se casó con Beatriz"
    ],
    correctIndex: 1,
    longExplanation:
      "En 1302 fue desterrado de Florencia y pasó veinte años en el exilio, periodo en que escribió la Divina Comedia.",
    links: [
      { label: "Dante Alighieri, biografía", url: "https://www.meer.com/es/86789-dante-alighieri-el-poeta-supremo-en-el-exilio" }
    ],
    fullPoem: "",
    poemSource: "Las traducciones varían según la edición.",
  },
  {
    id: 377,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿En qué ciudad murió Dante Alighieri, lejos de su Florencia natal?",
    options: [
      "Roma",
      "Venecia",
      "Rávena",
      "Milán"
    ],
    correctIndex: 2,
    longExplanation:
      "Dante murió en Rávena en 1321 sin poder regresar nunca a Florencia.",
    links: [
      { label: "Dante Alighieri, Wikipedia", url: "https://es.wikipedia.org/wiki/Dante_Alighieri" }
    ],
    fullPoem: "",
    poemSource: "Las traducciones varían según la edición.",
  },
  {
    id: 378,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿De qué poeta griega antigua se conservan solo fragmentos y unos pocos poemas completos?",
    options: [
      "Safo de Lesbos",
      "Sor Juana Inés de la Cruz",
      "Emily Dickinson",
      "Gabriela Mistral"
    ],
    correctIndex: 0,
    longExplanation:
      "De Safo apenas se conservan fragmentos y unos pocos poemas completos, transmitidos por citas y papiros.",
    links: [
      { label: "Safo, Wikipedia", url: "https://es.wikipedia.org/wiki/Safo" }
    ],
    fullPoem: "",
    poemSource: "Los fragmentos de Safo se transmiten en traducciones diversas.",
  },
  {
    id: 379,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿En qué isla griega vivió y desarrolló su obra la poeta Safo?",
    options: [
      "Creta",
      "Rodas",
      "Lesbos",
      "Chipre"
    ],
    correctIndex: 2,
    longExplanation:
      "Safo vivió principalmente en Lesbos, centrando su poesía en el amor y el deseo.",
    links: [
      { label: "Safo de Lesbos, Zenda Libros", url: "https://www.zendalibros.com/safo-lesbos-gorrion-las-rosas/" }
    ],
    fullPoem: "",
    poemSource: "Los fragmentos de Safo se transmiten en traducciones diversas.",
  },
  {
    id: 380,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿A qué isla se exilió Victor Hugo tras oponerse al golpe de Napoleón III?",
    options: [
      "Córcega",
      "Guernsey",
      "Sicilia",
      "Malta"
    ],
    correctIndex: 1,
    longExplanation:
      "Hugo se exilió en Guernsey tras oponerse al golpe de Napoleón III, viviendo allí quince años.",
    links: [
      { label: "Victor Hugo, el último gigante", url: "https://www.argentina.gob.ar/noticias/victor-hugo-el-ultimo-gigante" }
    ],
    fullPoem: "",
    poemSource: "La obra de Hugo está sujeta a derechos de traducción.",
  },
  {
    id: 381,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Cuántos años pasó aproximadamente Victor Hugo exiliado en Guernsey?",
    options: [
      "Dos años",
      "Cinco años",
      "Quince años",
      "Treinta años"
    ],
    correctIndex: 2,
    longExplanation:
      "Vivió exiliado en Guernsey unos quince años, entre 1855 y 1870, completando Los miserables.",
    links: [
      { label: "Victor Hugo, el exilio como isla", url: "https://www.jotdown.es/2021/04/victor-hugo-el-exilio-como-isla/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Hugo está sujeta a derechos de traducción.",
  },
  {
    id: 382,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué género literario cultivó principalmente Safo de Lesbos?",
    options: [
      "La épica guerrera",
      "La poesía lírica y amorosa",
      "La comedia teatral",
      "El ensayo filosófico"
    ],
    correctIndex: 1,
    longExplanation:
      "Safo cultivó la poesía lírica, centrada en emociones íntimas, en contraste con la épica de Homero.",
    links: [
      { label: "Safo de Lesbos, academialatin", url: "https://academialatin.com/literatura-griega/poemas-safo-lesbos/" }
    ],
    fullPoem: "",
    poemSource: "Los fragmentos de Safo se transmiten en traducciones diversas.",
  },
  {
    id: 383,
    category: "Biografías y anécdotas",
    difficulty: "básico",
    question: "¿Qué obra épica compuso Dante Alighieri durante su exilio?",
    options: [
      "La Ilíada",
      "La Divina Comedia",
      "Los miserables",
      "Hojas de hierba"
    ],
    correctIndex: 1,
    longExplanation:
      "Durante su destierro Dante escribió la Divina Comedia, una de las cumbres de la literatura universal.",
    links: [
      { label: "Dante Alighieri, europassitalian", url: "https://www.europassitalian.com/es/blog/dante-alighieri/" }
    ],
    fullPoem: "",
    poemSource: "Las traducciones varían según la edición.",
  },
  {
    id: 384,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué ocurrió con Charles Baudelaire tras la publicación de Las flores del mal en 1857?",
    options: [
      "Recibió un premio literario inmediato",
      "Fue procesado por ofensa a la moral pública y seis poemas quedaron censurados",
      "Se le concedió una pensión estatal",
      "La obra fue traducida de inmediato a diez idiomas"
    ],
    correctIndex: 1,
    longExplanation:
      "Baudelaire fue juzgado y multado; seis poemas quedaron censurados, prohibición que no se levantó en Francia hasta 1949.",
    links: [
      { label: "Las flores del mal, Wikipedia", url: "https://es.wikipedia.org/wiki/Las_flores_del_mal" }
    ],
    fullPoem: "",
    poemSource: "La obra de Baudelaire está sujeta a derechos de traducción.",
  },
  {
    id: 385,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Cuántos poemas de Las flores del mal fueron censurados tras el juicio de 1857?",
    options: [
      "Ninguno",
      "Seis",
      "Treinta",
      "Todos los del libro"
    ],
    correctIndex: 1,
    longExplanation:
      "Se suprimieron seis poemas concretos; el resto del libro siguió circulando y se ampliaría en 1861.",
    links: [
      { label: "Mujeres censuradas en Las flores del mal", url: "https://theconversation.com/las-mujeres-censuradas-en-las-flores-del-mal-de-baudelaire-199368" }
    ],
    fullPoem: "",
    poemSource: "La obra de Baudelaire está sujeta a derechos de traducción.",
  },
  {
    id: 386,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Hasta qué año estuvo vigente en Francia la prohibición sobre los poemas censurados de Baudelaire?",
    options: [
      "1861",
      "1900",
      "1949",
      "Nunca se levantó"
    ],
    correctIndex: 2,
    longExplanation:
      "La prohibición no se levantó hasta 1949, casi un siglo después de la condena.",
    links: [
      { label: "De culpable a perseguido: Baudelaire", url: "https://www.redalyc.org/journal/5037/503756200006/html/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Baudelaire está sujeta a derechos de traducción.",
  },
  {
    id: 387,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué caracterizó la relación personal entre Arthur Rimbaud y Paul Verlaine?",
    options: [
      "Fue una colaboración puramente profesional y distante",
      "Fue una relación amorosa intensa y muy conflictiva que terminó en violencia",
      "Nunca llegaron a conocerse en persona",
      "Fue una relación exclusivamente epistolar"
    ],
    correctIndex: 1,
    longExplanation:
      "Mantuvieron una relación amorosa intensa y conflictiva; en 1873 Verlaine disparó e hirió a Rimbaud en Bruselas.",
    links: [
      { label: "Rimbaud y Verlaine, la pasión de los relámpagos", url: "https://www.gatopardo.com/articulos/rimbaud-y-verlaine-la-pasion-de-los-relampagos" }
    ],
    fullPoem: "",
    poemSource: "La obra de ambos está sujeta a derechos de traducción.",
  },
  {
    id: 388,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué consecuencia legal tuvo el disparo de Verlaine contra Rimbaud en 1873?",
    options: [
      "Ninguna, no hubo denuncia",
      "Verlaine fue condenado a dos años de cárcel",
      "Rimbaud fue expulsado de Francia",
      "Ambos fueron encarcelados de por vida"
    ],
    correctIndex: 1,
    longExplanation:
      "Verlaine fue condenado por la justicia belga a dos años de prisión.",
    links: [
      { label: "Rimbaud y Verlaine, Fundación March", url: "https://www.facebook.com/fundacionmarch/" }
    ],
    fullPoem: "",
    poemSource: "La obra de ambos está sujeta a derechos de traducción.",
  },
  {
    id: 389,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿A qué edad abandonó Arthur Rimbaud la escritura de poesía?",
    options: [
      "A los 15 años",
      "A los 20 años",
      "A los 40 años",
      "Nunca la abandonó"
    ],
    correctIndex: 1,
    longExplanation:
      "Rimbaud dejó de escribir a los veinte años, dedicándose después al ejército colonial y al comercio; murió en 1891.",
    links: [
      { label: "Rimbaud, poeta maldito", url: "https://dorisan.wordpress.com/2015/04/16/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Rimbaud está sujeta a derechos de traducción.",
  },
  {
    id: 390,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué elementos de su vida personal escandalizaron a la sociedad inglesa de la época en el caso de Lord Byron?",
    options: [
      "Su vida disipada, sus escándalos amorosos y su implicación en causas revolucionarias",
      "Su total apego a las normas sociales",
      "Su rechazo absoluto a viajar fuera de Inglaterra",
      "Su desinterés total por la política"
    ],
    correctIndex: 0,
    longExplanation:
      "Byron mantuvo relaciones polémicas y se implicó en causas revolucionarias en Italia y Grecia.",
    links: [
      { label: "Lord Byron, National Geographic", url: "https://historia.nationalgeographic.com.es/a/lord-byron-el-poeta-del-romanticismo-que-quiso-liberar-grecia_7626" }
    ],
    fullPoem: "",
    poemSource: "La obra de Byron está sujeta a derechos de traducción.",
  },
  {
    id: 391,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Dónde y por qué murió Lord Byron en 1824?",
    options: [
      "En Londres, de vejez",
      "En Mesolongi (Grecia), de malaria, mientras apoyaba la independencia griega",
      "En Roma, en un duelo",
      "En un naufragio en el canal de la Mancha"
    ],
    correctIndex: 1,
    longExplanation:
      "Byron murió de malaria en Mesolongi mientras apoyaba la independencia griega.",
    links: [
      { label: "Lord Byron, Wikipedia", url: "https://es.wikipedia.org/wiki/Lord_Byron" }
    ],
    fullPoem: "",
    poemSource: "La obra de Byron está sujeta a derechos de traducción.",
  },
  {
    id: 392,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Cómo comenzó Anne Sexton a escribir poesía?",
    options: [
      "Estudiando en la universidad desde joven",
      "Por consejo de su terapeuta, tras sufrir crisis psicóticas",
      "Como encargo de una revista literaria",
      "Traduciendo a otros poetas"
    ],
    correctIndex: 1,
    longExplanation:
      "Sexton empezó a escribir por indicación de su terapeuta tras crisis psicóticas y un intento de suicidio.",
    links: [
      { label: "El suicidio de Anne Sexton", url: "https://gaceta.cch.unam.mx/es/el-suicidio-de-anne-sexton" }
    ],
    fullPoem: "",
    poemSource: "La obra de Sexton está sujeta a derechos de traducción.",
  },
  {
    id: 393,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Cómo murió la poeta Anne Sexton en 1974?",
    options: [
      "De causas naturales, en la vejez",
      "Por suicidio, tras varios intentos previos",
      "En un accidente de tráfico",
      "Asesinada"
    ],
    correctIndex: 1,
    longExplanation:
      "Se suicidó en 1974, en su décimo intento, a los 45 años.",
    links: [
      { label: "El suicidio de mi madre, BBC", url: "https://www.bbc.com/mundo/noticias-48026062" }
    ],
    fullPoem: "",
    poemSource: "La obra de Sexton está sujeta a derechos de traducción.",
  },
  {
    id: 394,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Cuántas veces recibió Robert Frost el Premio Pulitzer de poesía a lo largo de su carrera?",
    options: [
      "Una vez",
      "Dos veces",
      "Cuatro veces",
      "Nunca lo recibió"
    ],
    correctIndex: 2,
    longExplanation:
      "Frost recibió el Pulitzer cuatro veces entre 1924 y 1943.",
    links: [
      { label: "Robert Frost, Wikipedia", url: "https://es.wikipedia.org/wiki/Robert_Frost" }
    ],
    fullPoem: "",
    poemSource: "La obra de Frost está sujeta a derechos de traducción.",
  },
  {
    id: 395,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿En qué institución educativa enseñó Robert Frost durante varias etapas de su vida?",
    options: [
      "Harvard University",
      "Amherst College",
      "Yale University",
      "Columbia University"
    ],
    correctIndex: 1,
    longExplanation:
      "Frost enseñó en el Amherst College en varios periodos entre 1916 y 1938.",
    links: [
      { label: "Robert Frost, Wikipedia", url: "https://es.wikipedia.org/wiki/Robert_Frost" }
    ],
    fullPoem: "",
    poemSource: "La obra de Frost está sujeta a derechos de traducción.",
  },
  {
    id: 396,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿En qué año recibió la poeta polaca Wisława Szymborska el Premio Nobel de Literatura?",
    options: [
      "1976",
      "1996",
      "2004",
      "2012"
    ],
    correctIndex: 1,
    longExplanation:
      "Szymborska recibió el Nobel en 1996.",
    links: [
      { label: "Wisława Szymborska, Wikipedia", url: "https://es.wikipedia.org/wiki/Wis%C5%82awa_Szymborska" }
    ],
    fullPoem: "",
    poemSource: "La obra de Szymborska está sujeta a derechos de traducción.",
  },
  {
    id: 397,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué caracteriza el lenguaje poético de Wisława Szymborska según la crítica?",
    options: [
      "Es deliberadamente arcaico y grandilocuente",
      "Es aparentemente sencillo, pero con una mirada filosófica profunda",
      "Se limita a la descripción de paisajes naturales",
      "Está escrito exclusivamente en verso alejandrino clásico"
    ],
    correctIndex: 1,
    longExplanation:
      "Su lenguaje es aparentemente sencillo pero con una mirada filosófica profunda sobre la vida cotidiana.",
    links: [
      { label: "Wisława Szymborska, Nueva Revista", url: "https://www.nuevarevista.net/wislawa-szymborska/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Szymborska está sujeta a derechos de traducción.",
  },
  {
    id: 398,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué profesión ejerció Anne Sexton antes de convertirse en poeta reconocida?",
    options: [
      "Fue ama de casa de clase acomodada antes de escribir poesía por indicación médica",
      "Fue abogada durante veinte años",
      "Fue enfermera militar",
      "Fue profesora de matemáticas"
    ],
    correctIndex: 0,
    longExplanation:
      "Llevaba una vida convencional de clase acomodada antes de empezar a escribir por indicación médica.",
    links: [
      { label: "Anne Sexton: vida, obra y poemas clave", url: "https://queridobartleby.es/anne-sexton-1/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Sexton está sujeta a derechos de traducción.",
  },
  {
    id: 399,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué relación tuvo Anne Sexton con Sylvia Plath?",
    options: [
      "Fueron rivales que nunca se conocieron",
      "Coincidieron en talleres de poesía y compartieron una amistad literaria",
      "Sexton fue la traductora de Plath",
      "No existió ninguna relación entre ambas"
    ],
    correctIndex: 1,
    longExplanation:
      "Se conocieron en talleres de poesía en Boston y compartieron amistad literaria; ambas murieron por suicidio.",
    links: [
      { label: "Tras las huellas de un suicidio: Anne Sexton", url: "https://esquimalenator.wordpress.com/2010/08/05/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Sexton está sujeta a derechos de traducción.",
  },
  {
    id: 400,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Cómo murió Alejandra Pizarnik en 1972?",
    options: [
      "De vejez, en su casa",
      "Por suicidio, con una sobredosis de barbitúricos",
      "En un accidente de tráfico",
      "Asesinada en Buenos Aires"
    ],
    correctIndex: 1,
    longExplanation:
      "Se suicidó con una sobredosis de Seconal en 1972, a los 36 años.",
    links: [
      { label: "Alejandra Pizarnik, Wikipedia", url: "https://es.wikipedia.org/wiki/Alejandra_Pizarnik" }
    ],
    fullPoem: "",
    poemSource: "La obra de Pizarnik está sujeta a derechos de autor.",
  },
  {
    id: 401,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿A qué edad murió Alejandra Pizarnik?",
    options: [
      "25 años",
      "36 años",
      "50 años",
      "70 años"
    ],
    correctIndex: 1,
    longExplanation:
      "Murió a los 36 años, tras una vida marcada por trastornos de salud mental.",
    links: [
      { label: "Alejandra Pizarnik, Infobae", url: "https://www.infobae.com/cultura/2025/04/29/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Pizarnik está sujeta a derechos de autor.",
  },
  {
    id: 402,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué edad alcanzó el poeta chileno Nicanor Parra, fundador de la antipoesía?",
    options: [
      "65 años",
      "80 años",
      "103 años",
      "120 años"
    ],
    correctIndex: 2,
    longExplanation:
      "Parra vivió 103 años, de 1914 a 2018.",
    links: [
      { label: "Nicanor Parra, Wikipedia", url: "https://es.wikipedia.org/wiki/Nicanor_Parra" }
    ],
    fullPoem: "",
    poemSource: "La obra de Parra está sujeta a derechos de autor.",
  },
  {
    id: 403,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿En qué campo científico se formó Nicanor Parra antes de destacar como poeta?",
    options: [
      "En medicina",
      "En física",
      "En derecho",
      "En arquitectura"
    ],
    correctIndex: 1,
    longExplanation:
      "Se formó como físico y matemático, enseñando en la Universidad de Chile.",
    links: [
      { label: "Biobibliografía de Nicanor Parra", url: "https://www.cervantesvirtual.com/portales/nicanor_parra/autor_biobibliografia/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Parra está sujeta a derechos de autor.",
  },
  {
    id: 404,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Con qué escritor uruguayo mantuvo Idea Vilariño una larga y tormentosa relación amorosa?",
    options: [
      "Mario Benedetti",
      "Juan Carlos Onetti",
      "Eduardo Galeano",
      "Horacio Quiroga"
    ],
    correctIndex: 1,
    longExplanation:
      "Mantuvo casi cuarenta años una relación intermitente con Juan Carlos Onetti.",
    links: [
      { label: "La tóxica relación entre Idea Vilariño y Onetti", url: "https://www.clarin.com/cultura/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Vilariño está sujeta a derechos de autor.",
  },
  {
    id: 405,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿A qué grupo generacional uruguayo perteneció Idea Vilariño?",
    options: [
      "A la Generación del 27 española",
      "A la Generación del 45 uruguaya",
      "Al modernismo hispanoamericano",
      "Al creacionismo chileno"
    ],
    correctIndex: 1,
    longExplanation:
      "Perteneció a la Generación del 45 uruguaya, junto a Onetti y Benedetti.",
    links: [
      { label: "Idea Vilariño, Wikipedia", url: "https://es.wikipedia.org/wiki/Idea_Vilari%C3%B1o" }
    ],
    fullPoem: "",
    poemSource: "La obra de Vilariño está sujeta a derechos de autor.",
  },
  {
    id: 406,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué mensaje dejó escrito Alejandra Pizarnik poco antes de morir?",
    options: [
      "Una carta de despedida a su familia",
      "Un mensaje en el espejo de su habitación",
      "Un poema publicado en un periódico",
      "Una grabación de audio"
    ],
    correctIndex: 1,
    longExplanation:
      "Dejó escrito en el espejo: «No quiero ir nada más que hasta el fondo».",
    links: [
      { label: "Alejandra Pizarnik, Infobae", url: "https://www.infobae.com/cultura/2025/04/29/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Pizarnik está sujeta a derechos de autor.",
  },
  {
    id: 407,
    category: "Biografías y anécdotas",
    difficulty: "intermedio",
    question: "¿Qué estilo poético fundó Nicanor Parra, caracterizado por la ironía y el lenguaje coloquial?",
    options: [
      "El creacionismo",
      "La antipoesía",
      "El neobarroco",
      "El exteriorismo"
    ],
    correctIndex: 1,
    longExplanation:
      "Fundó la «antipoesía», estilo coloquial e irónico que influyó en la poesía latinoamericana.",
    links: [
      { label: "Nicanor Parra, el antipoeta por excelencia", url: "https://elpais.com/cultura/2021-09-05/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Parra está sujeta a derechos de autor.",
  },
  {
    id: 408,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué le costó a Ósip Mandelstam escribir un breve poema satírico contra Stalin en 1933?",
    options: [
      "Una multa económica",
      "La expulsión de la Unión de Escritores",
      "El arresto, el destierro y finalmente la muerte en un campo de tránsito",
      "Ningún tipo de consecuencia"
    ],
    correctIndex: 2,
    longExplanation:
      "Fue arrestado y desterrado, y en 1938 murió en un campo de tránsito cerca de Vladivostok tras un segundo arresto.",
    links: [
      { label: "Ósip Mandelshtam, Wikipedia", url: "https://es.wikipedia.org/wiki/%C3%93sip_Mandelshtam" }
    ],
    fullPoem: "",
    poemSource: "La obra de Mandelstam está sujeta a derechos de traducción.",
  },
  {
    id: 409,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Dónde y en qué circunstancias murió Ósip Mandelstam en 1938?",
    options: [
      "En su casa de Moscú, de vejez",
      "En un campo de tránsito cerca de Vladivostok, tras una condena a trabajos forzados",
      "En un hospital de Leningrado",
      "En el exilio en París"
    ],
    correctIndex: 1,
    longExplanation:
      "Murió en diciembre de 1938 en un campo de tránsito cerca de Vladivostok, camino a Kolymá.",
    links: [
      { label: "Sobre un poema de Ósip Mandelstam", url: "https://letraslibres.com/revista-mexico/sobre-un-poema-de-osip-mandelstam/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Mandelstam está sujeta a derechos de traducción.",
  },
  {
    id: 410,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué acontecimiento histórico está en el centro del poema «Fuga de la muerte» de Paul Celan?",
    options: [
      "La Revolución Francesa",
      "El Holocausto y los campos de exterminio nazis",
      "La Guerra Civil española",
      "La Primera Guerra Mundial"
    ],
    correctIndex: 1,
    longExplanation:
      "El poema describe la deshumanización de los campos de exterminio nazis; Celan lo escribió tras la muerte de sus padres en el Holocausto.",
    links: [
      { label: "Fuga de la muerte, Wikipedia", url: "https://es.wikipedia.org/wiki/Fuga_de_la_muerte" }
    ],
    fullPoem: "",
    poemSource: "La obra de Celan está sujeta a derechos de traducción.",
  },
  {
    id: 411,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué le ocurrió a la familia de Paul Celan durante la Segunda Guerra Mundial?",
    options: [
      "Emigraron sin dificultades a Estados Unidos",
      "Sus padres murieron en campos de concentración nazis",
      "Se convirtieron al cristianismo para evitar la persecución",
      "No se vieron afectados por la guerra"
    ],
    correctIndex: 1,
    longExplanation:
      "Sus padres murieron en campos de concentración; su madre fue asesinada en el campo de Janowska.",
    links: [
      { label: "Paul Celan, El País", url: "https://elpais.com/cultura/2020-05-04/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Celan está sujeta a derechos de traducción.",
  },
  {
    id: 412,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Cómo terminó su vida Paul Celan?",
    options: [
      "Murió de vejez en Alemania",
      "Se suicidó, ahogándose en el río Sena, en 1970",
      "Murió en un campo de concentración",
      "Falleció en un accidente de avión"
    ],
    correctIndex: 1,
    longExplanation:
      "Celan se suicidó arrojándose al río Sena en 1970.",
    links: [
      { label: "Poemas de Paul Celan, Nueva Revista", url: "https://www.nuevarevista.net/poemas-paul-celan-paul-pesaj-anschel/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Celan está sujeta a derechos de traducción.",
  },
  {
    id: 413,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Por qué fue arrestado el poeta Ezra Pound al final de la Segunda Guerra Mundial?",
    options: [
      "Por espionaje a favor de los aliados",
      "Por traición, debido a sus emisiones de radio en apoyo a Mussolini y Hitler",
      "Por un delito común no relacionado con la política",
      "Por publicar poesía sin autorización"
    ],
    correctIndex: 1,
    longExplanation:
      "Fue arrestado por traición por sus emisiones de radio a favor de Mussolini y Hitler.",
    links: [
      { label: "Ezra Pound, la historia del poeta", url: "https://www.abc.es/cultura/20150220/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Pound está sujeta a derechos de traducción.",
  },
  {
    id: 414,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Cuántos años pasó Ezra Pound internado en un hospital psiquiátrico tras su juicio por traición?",
    options: [
      "Dos años",
      "Cinco años",
      "Doce años",
      "Treinta años"
    ],
    correctIndex: 2,
    longExplanation:
      "Estuvo internado doce años, de 1946 a 1958, para evitar la pena de muerte.",
    links: [
      { label: "Ezra Pound, el poeta en el manicomio", url: "https://elasombrario.publico.es/ezra-pound-poeta-manicomio/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Pound está sujeta a derechos de traducción.",
  },
  {
    id: 415,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué figuras literarias intervinieron para evitar que Ezra Pound fuera condenado a muerte?",
    options: [
      "Solo autoridades militares",
      "Ernest Hemingway y otras figuras del mundo literario, alegando demencia",
      "Nadie intervino, se salvó por azar",
      "Exclusivamente su familia"
    ],
    correctIndex: 1,
    longExplanation:
      "Hemingway y otros alegaron demencia para evitar su ejecución.",
    links: [
      { label: "Ezra Pound, el poeta milagroso que enfermó de fascismo", url: "https://www.elconfidencial.com/cultura/2018-12-15/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Pound está sujeta a derechos de traducción.",
  },
  {
    id: 416,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Cómo terminó la vida de la poeta rusa Marina Tsvietáieva en 1941?",
    options: [
      "Murió de vejez en Francia",
      "Se ahorcó en Yelábuga, tras años de exilio y penurias",
      "Fue ejecutada por el régimen soviético",
      "Murió en un bombardeo alemán"
    ],
    correctIndex: 1,
    longExplanation:
      "Se ahorcó en Yelábuga en 1941 tras años de exilio en Berlín, Praga y París.",
    links: [
      { label: "Marina Tsvetáyeva, Wikipedia", url: "https://es.wikipedia.org/wiki/Marina_Tsvet%C3%A1yeva" }
    ],
    fullPoem: "",
    poemSource: "La obra de Tsvietáieva está sujeta a derechos de traducción.",
  },
  {
    id: 417,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Por qué tuvo que exiliarse Marina Tsvietáieva tras la Revolución rusa?",
    options: [
      "Por motivos exclusivamente económicos",
      "Porque su marido había sido oficial del ejército blanco, opuesto a los bolcheviques",
      "Por publicar un libro prohibido en Francia",
      "Porque fue expulsada por motivos religiosos"
    ],
    correctIndex: 1,
    longExplanation:
      "Se exilió porque su marido había sido oficial del ejército blanco.",
    links: [
      { label: "Marina Tsvietáieva, Anagrama", url: "https://www.anagrama-ed.es/autor/tsvietaieva-marina-1064" }
    ],
    fullPoem: "",
    poemSource: "La obra de Tsvietáieva está sujeta a derechos de traducción.",
  },
  {
    id: 418,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué le ocurrió a Anna Ajmátova en 1946 a manos del régimen soviético?",
    options: [
      "Recibió un premio estatal",
      "Fue expulsada de la Unión de Escritores Soviéticos y se le prohibió publicar",
      "Fue nombrada embajadora cultural",
      "Se le concedió una gran pensión vitalicia"
    ],
    correctIndex: 1,
    longExplanation:
      "Fue expulsada de la Unión de Escritores en 1946, con prohibición de publicar.",
    links: [
      { label: "Anna Ajmátova, poesía más poesía", url: "https://poesiamaspoesia.com/245-poesia-mas-poesia-anna-ajmatova/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Ajmátova está sujeta a derechos de traducción.",
  },
  {
    id: 419,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué ciclo de poemas escribió Anna Ajmátova sobre la represión estalinista y el sufrimiento de las mujeres cuyos familiares fueron perseguidos?",
    options: [
      "Réquiem",
      "Cántico espiritual",
      "Trilce",
      "Las flores del mal"
    ],
    correctIndex: 0,
    longExplanation:
      "Escribió Réquiem, que circuló de forma clandestina por la censura soviética.",
    links: [
      { label: "Anna Ajmátova y su Réquiem por Rusia", url: "https://elobrero.es/historalia/116921-anna-ajmatova-y-su-requiem-por-rusia.html" }
    ],
    fullPoem: "",
    poemSource: "La obra de Ajmátova está sujeta a derechos de traducción.",
  },
  {
    id: 420,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿En qué contexto personal escribió T. S. Eliot La tierra baldía, publicada en 1922?",
    options: [
      "Durante una etapa de gran estabilidad y felicidad",
      "En un periodo de crisis nerviosa, mientras seguía tratamiento médico junto al lago Lemán",
      "Mientras viajaba por América Latina",
      "Durante su servicio militar en la Primera Guerra Mundial"
    ],
    correctIndex: 1,
    longExplanation:
      "Escribió el poema durante una crisis nerviosa, con tratamiento médico junto al lago Lemán.",
    links: [
      { label: "T.S. Eliot, cien años después de La tierra baldía", url: "https://eternacadencia.com.ar/blog/t-s-eliot-cien-anos-despues-de-la-tierra-baldia" }
    ],
    fullPoem: "",
    poemSource: "La obra de Eliot está sujeta a derechos de traducción.",
  },
  {
    id: 421,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué papel desempeñó Ezra Pound en la edición final de La tierra baldía de T. S. Eliot?",
    options: [
      "Ninguno, Eliot trabajó completamente solo",
      "Colaboró estrechamente revisando y recortando el manuscrito original",
      "Tradujo el poema al francés",
      "Se opuso a su publicación"
    ],
    correctIndex: 1,
    longExplanation:
      "Pound revisó y recortó el manuscrito original, dando forma a la estructura final del poema.",
    links: [
      { label: "La tierra baldía, Wikipedia", url: "https://es.wikipedia.org/wiki/La_tierra_bald%C3%ADa" }
    ],
    fullPoem: "",
    poemSource: "La obra de Eliot está sujeta a derechos de traducción.",
  },
  {
    id: 422,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué acusación política se empleó contra la poesía de Anna Ajmátova en la Unión Soviética de los años veinte?",
    options: [
      "Ser demasiado propagandística",
      "Ser «individualista» y ajena a los intereses de las masas",
      "Estar escrita en un idioma extranjero",
      "Copiar directamente a otros autores"
    ],
    correctIndex: 1,
    longExplanation:
      "Se la calificó de «individualista» y ajena a los intereses de las masas.",
    links: [
      { label: "Anna Ajmátova, la poeta destacada de su generación", url: "https://www.poemas-del-alma.com/blog/especiales/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Ajmátova está sujeta a derechos de traducción.",
  },
  {
    id: 423,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué elemento estructural distintivo tiene La tierra baldía de T. S. Eliot?",
    options: [
      "Está escrita íntegramente en soneto clásico",
      "Combina múltiples voces, fragmentos y referencias culturales superpuestas",
      "Es un poema narrativo lineal sin ninguna complejidad formal",
      "Se limita a describir un único paisaje natural"
    ],
    correctIndex: 1,
    longExplanation:
      "Combina múltiples voces y referencias culturales, reflejando la fragmentación cultural de posguerra.",
    links: [
      { label: "La modernidad desolada de La tierra baldía", url: "https://www.nuevarevista.net/la-modernidad-desolada-de-la-tierra-baldia-centenario-del-poema-de-t-s-eliot/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Eliot está sujeta a derechos de traducción.",
  },
  {
    id: 424,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué se sabe con certeza hoy sobre la ubicación exacta de los restos de Federico García Lorca?",
    options: [
      "Se conoce con total precisión desde hace décadas",
      "Se cree que podría estar en el barranco de Víznar, junto a otras víctimas, pero no se ha confirmado con certeza",
      "Fueron trasladados oficialmente a Madrid en los años setenta",
      "Nunca se ha buscado, la familia se opuso siempre a cualquier investigación"
    ],
    correctIndex: 1,
    longExplanation:
      "No se han localizado con certeza; se cree que podrían estar en el barranco de Víznar.",
    links: [
      { label: "La fosa que los Lorca no quieren abrir", url: "https://canal.ugr.es/prensa-y-comunicacion/medios-digitales/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Lorca está sujeta a derechos de autor.",
  },
  {
    id: 425,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué postura mantuvo durante años la familia de Federico García Lorca respecto a la exhumación de sus restos?",
    options: [
      "Exigió la exhumación inmediata desde el primer momento",
      "Mostró reticencias, considerando que podría desvirtuar su memoria histórica",
      "Se mostró completamente indiferente al asunto",
      "Vendió los derechos de la investigación a una empresa privada"
    ],
    correctIndex: 1,
    longExplanation:
      "Mostró reticencias durante años, temiendo desvirtuar la memoria histórica del poeta.",
    links: [
      { label: "La familia de Lorca accede a abrir la fosa", url: "https://www.rtve.es/noticias/20080918/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Lorca está sujeta a derechos de autor.",
  },
  {
    id: 426,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Cómo terminó el matrimonio entre Sylvia Plath y Ted Hughes?",
    options: [
      "Duraron juntos toda la vida sin conflictos",
      "Hughes abandonó a Plath por otra mujer, poco antes de que ella se suicidara",
      "Plath abandonó a Hughes por otro poeta",
      "Nunca llegaron a convivir"
    ],
    correctIndex: 1,
    longExplanation:
      "Hughes abandonó a Plath por otra mujer; poco después ella se suicidó en 1963.",
    links: [
      { label: "La atroz historia de Sylvia Plath y Ted Hughes", url: "https://www.infobae.com/america/cultura-america/2018/10/19/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Plath está sujeta a derechos de traducción.",
  },
  {
    id: 427,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué controversia generó la gestión de los manuscritos de Sylvia Plath tras su muerte?",
    options: [
      "Ninguna, se publicaron sin cambios inmediatamente",
      "Ted Hughes, como viudo legal, controló y en parte censuró parte de su obra inédita",
      "Los manuscritos se perdieron por completo",
      "Fueron vendidos a un museo sin consultar a la familia"
    ],
    correctIndex: 1,
    longExplanation:
      "Hughes destruyó al menos un diario de Plath, decisión muy criticada.",
    links: [
      { label: "El último poema de Ted Hughes a Sylvia Plath", url: "https://algundiaenalgunaparte.com/2015/10/29/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Plath está sujeta a derechos de traducción.",
  },
  {
    id: 428,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Cómo se suicidó el poeta soviético Vladímir Mayakovski en 1930?",
    options: [
      "Ahogándose en un río",
      "De un disparo en el corazón",
      "Ingiriendo veneno",
      "Arrojándose desde un edificio"
    ],
    correctIndex: 1,
    longExplanation:
      "Se suicidó de un disparo en el corazón en 1930.",
    links: [
      { label: "Vladímir Mayakovski, Wikipedia", url: "https://es.wikipedia.org/wiki/Vlad%C3%ADmir_Mayakovski" }
    ],
    fullPoem: "",
    poemSource: "La obra de Mayakovski está sujeta a derechos de traducción.",
  },
  {
    id: 429,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué papel había desempeñado Vladímir Mayakovski en relación con la Revolución rusa antes de su muerte?",
    options: [
      "Se opuso siempre a la Revolución desde el exilio",
      "Fue una de las voces poéticas más comprometidas con la causa revolucionaria bolchevique",
      "No tuvo ninguna relación con la política de su país",
      "Fue perseguido desde el principio por el régimen soviético"
    ],
    correctIndex: 1,
    longExplanation:
      "Fue una de las voces más comprometidas con la Revolución bolchevique.",
    links: [
      { label: "80 años de la muerte del poeta comunista", url: "http://espina-roja.blogspot.com/2010/04/" }
    ],
    fullPoem: "",
    poemSource: "La obra de Mayakovski está sujeta a derechos de traducción.",
  },
  {
    id: 430,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué reconocimiento recibió Sylvia Plath de forma póstuma en 1982?",
    options: [
      "El Premio Nobel de Literatura",
      "El Premio Pulitzer de poesía",
      "El Premio Cervantes",
      "El Premio Nacional de Poesía de España"
    ],
    correctIndex: 1,
    longExplanation:
      "Recibió el Pulitzer de poesía en 1982, casi veinte años después de su muerte.",
    links: [
      { label: "Sylvia Plath, la poeta que ganó el primer Pulitzer póstumo", url: "https://historia.nationalgeographic.com.es/a/sylvia-plath-poeta-que-gano-primer-pulitzer-postumo_17832" }
    ],
    fullPoem: "",
    poemSource: "La obra de Plath está sujeta a derechos de traducción.",
  },
  {
    id: 431,
    category: "Biografías y anécdotas",
    difficulty: "avanzado",
    question: "¿Qué tienen en común los casos de Mandelstam, Ajmátova y Mayakovski dentro de la poesía rusa y soviética del siglo XX?",
    options: [
      "Los tres vivieron vidas tranquilas, ajenas a la política",
      "Los tres sufrieron de distintas formas la presión del poder soviético sobre su obra o su vida",
      "Los tres emigraron juntos a Estados Unidos",
      "Ninguno de los tres escribió sobre temas políticos"
    ],
    correctIndex: 1,
    longExplanation:
      "Los tres sufrieron de distintas formas la presión del poder soviético sobre su obra o su vida.",
    links: [
      { label: "Anna Ajmátova, Wikipedia", url: "https://es.wikipedia.org/wiki/Anna_Ajm%C3%A1tova" }
    ],
    fullPoem: "",
    poemSource: "No aplica; ficha de síntesis.",
  }
];

export default MAS_BIOGRAFIAS;
