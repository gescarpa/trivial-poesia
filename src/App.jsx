import { useEffect, useMemo, useState } from "react";
import "./index.css";
import lopeImg from "./assets/lope.png";
import logoImg from "./assets/logo.png";
import { QUESTIONS as BASE_QUESTIONS, CATEGORIES } from "./data/questions";
import { MAS_BIOGRAFIAS } from "./data/masBiografias";
import { BIOGRAFIAS_METAS } from "./data/biografias/index.js";

function mergeQuestionWithMeta(question) {
  if (!question) return question;

  const meta = BIOGRAFIAS_METAS[question.id];
  if (!meta) return question;

  return {
    ...question,
    longExplanation: meta.longExplanation || meta.fullAnswer || question.longExplanation,
    links: meta.links || question.links,
    fullPoem: meta.fullPoem || meta.poemFragment || question.fullPoem,
    poemSource: meta.poemSource || meta.source || question.poemSource,
  };
}
const LOCAL_STORAGE_KEY = "trivial-poesia-ranking";

const QUESTIONS = [...BASE_QUESTIONS, ...MAS_BIOGRAFIAS];

function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("juego");
  const [level, setLevel] = useState("básico");
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
const mergedQuestion = mergeQuestionWithMeta(currentQuestion);
  function handleStart(category) {
    setSelectedCategory(category);
    setCorrectByCategory({});
    let filtered;
    if (category === "Todas las categorías") {
      filtered = QUESTIONS.filter((q) => q.difficulty === level);
    } else {
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
        return { ...prev, [cat]: (prev[cat] || 0) + 1 };
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
          Pon a prueba tus conocimientos poéticos y deja ya de creerte Lope de
          Vega.
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

      {screen === "quiz" && mergedQuestion && (
  <QuizScreen
    mode={mode}
    category={selectedCategory}
    question={mergedQuestion}
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
        <small>
          POETRIVIAL · Un jueguito de{" "}
          <a
            href="https://instagram.com/escarpa"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Gonzalo Escarpa
          </a>
        </small>
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
      <img src={lopeImg} alt="Lope de Vega" className="lope-hero" />
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
            if (index === question.correctIndex) className = "correct";
            else if (index === selectedOption) className = "incorrect";
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

          {mode === "juego" &&
            (question.author ||
              question.sourcePeriod ||
              question.explanation ||
              question.difficulty) && (
              <div className="meta-block">
                {question.author && (
                  <p>
                    <strong>Autor:</strong> {question.author}
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

          {mode === "taller" && (
            <div className="meta-block">
              {mergedQuestion.longExplanation && (
                <p className="explanation">{mergedQuestion.longExplanation}</p>
              )}
              {mergedQuestion.fullPoem && (
                <pre className="poem-snippet">{mergedQuestion.fullPoem}</pre>
              )}
              {mergedQuestion.links && mergedQuestion.links.length > 0 && (
                <ul className="resource-links">
                  {mergedQuestion.links.map((link) => (
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
        Has jugado poco como para sacar conclusiones poéticas. Vuelve a
        intentarlo.
      </p>
    );
  }
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const bestCat = sorted[0];
  const worstCat = sorted[sorted.length - 1];
  const narrative =
    sorted.length === 1
      ? `Has brillado en ${bestCat[0]}.`
      : `Has brillado en ${bestCat[0]}, te falta afinar en ${worstCat[0]}.`;

  return (
    <div className="learning-summary">
      <h3>Resumen de aprendizaje</h3>
      <ul>
        {entries.map(([category, count]) => (
          <li key={category}>
            Has acertado {count} pregunta{count !== 1 ? "s" : ""} de{" "}
            {category}.
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
            Guarda tu puntuación en el ranking
            <input
              type="text"
              placeholder="Tu nombre o alias"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button className="btn" onClick={handleSave} disabled={!name.trim()}>
            Guardar en ranking
          </button>
        </div>
      )}

      {mode === "taller" && (
        <p>
          Has estado en modo taller: aquí importa más lo aprendido que la
          puntuación.
        </p>
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
              <span className="rank-position">{index + 1}.</span>
              <span className="rank-name">{entry.name}</span>
              <span className="rank-score">{entry.score} puntos</span>
              <span className="rank-meta">
                {entry.correct}/{entry.total} en {entry.category},{" "}
                {entry.mode}, {entry.level}
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
