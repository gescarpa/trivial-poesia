import { useEffect, useMemo, useState } from "react";
import "./index.css";

const LOCAL_STORAGE_KEY = "trivial-poesia-ranking";

const CATEGORIES = [
  "Siglo de Oro",
  "Generación del 27",
  "Poesía latinoamericana",
  "Poesía escrita por mujeres",
  "Poesía contemporánea",
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
    const filtered = QUESTIONS.filter(
      (q) => q.category === category && q.difficulty === level
    );
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
        <h1>Trivial de Poesía</h1>
        <p className="subtitle">
          Juego y taller para navegar por distintas tradiciones poéticas.
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
          onRestart={handleRestart}
          onSaveRanking={handleSaveRanking}
          onViewRanking={() => setScreen("ranking")}
        />
      )}

      {screen === "ranking" && (
        <RankingScreen ranking={ranking} onBack={() => setScreen("home")} />
      )}

      <footer className="app-footer">
        <small>Trivial de poesía · Modo juego / taller</small>
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
          ? "Puntuación, ranking y ritmo más ágil, ideal para dinamizar."
          : "Más énfasis en explicaciones, fragmentos y contexto, ideal para aprender."}
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

          {(question.author ||
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
          )}

          <button className="btn" onClick={onNext}>
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}

function ResultsScreen({
  mode,
  score,
  correct,
  total,
  category,
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
