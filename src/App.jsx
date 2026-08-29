import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import lopeImg from "./assets/lope.png";
import logoImg from "./assets/logo.png";
import { QUESTIONS, CATEGORIES } from "./data";

const LOCAL_STORAGE_KEY = "trivial-poesia-ranking";
const ROUND_OPTIONS = [5, 10, 15];
const TURN_SECONDS = 60;
const COUNTDOWN_START = 3;

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function filterQuestions(category, level) {
  if (category === "Todas las categorías") {
    return QUESTIONS.filter((q) => q.difficulty === level);
  }
  return QUESTIONS.filter((q) => q.category === category && q.difficulty === level);
}

function loadRanking() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRanking(ranking) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ranking));
}

function resolvePlayerName(name, fallback) {
  return name.trim() || fallback;
}

function App() {
  const [screen, setScreen] = useState("welcome");
  const [mode, setMode] = useState("juego");
  const [level, setLevel] = useState("básico");
  const [roundCount, setRoundCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pendingCategory, setPendingCategory] = useState(null);
  const [countdownValue, setCountdownValue] = useState(COUNTDOWN_START);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  // Modo solo (juego / taller)
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [statsByCategory, setStatsByCategory] = useState({});
  const [ranking, setRanking] = useState(loadRanking);

  // Modo 2 jugadores
  const [twoPlayerPool, setTwoPlayerPool] = useState([]);
  const [roundsActual, setRoundsActual] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [turn, setTurn] = useState("p1");
  const [handoffTarget, setHandoffTarget] = useState(null);
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);
  const [selectedOption2p, setSelectedOption2p] = useState(null);
  const [showFeedback2p, setShowFeedback2p] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TURN_SECONDS);
  const [lastTurnKey, setLastTurnKey] = useState(null);

  const totalQuestions = currentQuestions.length;
  const currentQuestion = useMemo(
    () => currentQuestions[currentIndex],
    [currentQuestions, currentIndex]
  );

  const currentTwoPlayerQuestion = useMemo(() => {
    const offset = turn === "p1" ? 0 : 1;
    return twoPlayerPool[currentRound * 2 + offset];
  }, [twoPlayerPool, currentRound, turn]);

  const isTurnActive = screen === "quiz2p" && !handoffTarget && !showFeedback2p;
  const p1Name = resolvePlayerName(player1Name, "Jugador 1");
  const p2Name = resolvePlayerName(player2Name, "Jugador 2");

  function persistRanking(updated) {
    setRanking(updated);
    saveRanking(updated);
  }

  function handleStart(category) {
    setSelectedCategory(category);
    setStatsByCategory({});
    const filtered = filterQuestions(category, level);
    const shuffled = shuffle(filtered).slice(0, roundCount);
    setCurrentQuestions(shuffled);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScreen("quiz");
  }

  function handleStart2P(category) {
    setSelectedCategory(category);
    const filtered = filterQuestions(category, level);
    const shuffled = shuffle(filtered);
    const rounds = Math.max(1, Math.min(roundCount, Math.floor(shuffled.length / 2)));
    setTwoPlayerPool(shuffled.slice(0, rounds * 2));
    setRoundsActual(rounds);
    setCurrentRound(0);
    setTurn("p1");
    setHandoffTarget(null);
    setScoreP1(0);
    setScoreP2(0);
    setSelectedOption2p(null);
    setShowFeedback2p(false);
    setScreen("quiz2p");
  }

  const startGameRef = useRef(() => {});
  useEffect(() => {
    startGameRef.current = () => {
      if (mode === "2jugadores") handleStart2P(pendingCategory);
      else handleStart(pendingCategory);
    };
  });

  function handleCategorySelect(category) {
    setPendingCategory(category);
    setCountdownValue(COUNTDOWN_START);
    setScreen("countdown");
  }

  useEffect(() => {
    if (screen !== "countdown" || countdownValue <= 0) return;
    const id = setTimeout(() => setCountdownValue((v) => v - 1), 700);
    return () => clearTimeout(id);
  }, [screen, countdownValue]);

  useEffect(() => {
    if (screen !== "countdown" || countdownValue !== 0) return;
    const id = setTimeout(() => startGameRef.current(), 550);
    return () => clearTimeout(id);
  }, [screen, countdownValue]);

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
    setStatsByCategory((prev) => {
      const cat = currentQuestion.category;
      const prevStats = prev[cat] || { correct: 0, total: 0 };
      return {
        ...prev,
        [cat]: {
          correct: prevStats.correct + (isCorrect ? 1 : 0),
          total: prevStats.total + 1,
        },
      };
    });
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
    persistRanking(updated.slice(0, 50));
  }

  function handleOption2PClick(index) {
    if (showFeedback2p || !currentTwoPlayerQuestion) return;
    setSelectedOption2p(index);
    setShowFeedback2p(true);
    const isCorrect = index === currentTwoPlayerQuestion.correctIndex;
    if (isCorrect) {
      if (turn === "p1") setScoreP1((prev) => prev + 1);
      else setScoreP2((prev) => prev + 1);
    }
  }

  const turnKey = `${currentRound}-${turn}`;
  if (screen === "quiz2p" && !handoffTarget && turnKey !== lastTurnKey) {
    setLastTurnKey(turnKey);
    setTimeLeft(TURN_SECONDS);
  }

  useEffect(() => {
    if (!isTurnActive || timeLeft <= 0) return;
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [isTurnActive, timeLeft]);

  useEffect(() => {
    if (!isTurnActive || timeLeft !== 0) return;
    const id = setTimeout(() => {
      setSelectedOption2p(-1);
      setShowFeedback2p(true);
    }, 0);
    return () => clearTimeout(id);
  }, [isTurnActive, timeLeft]);

  function handleNext2P() {
    if (turn === "p1") {
      setHandoffTarget("p2");
      return;
    }
    if (currentRound + 1 < roundsActual) {
      setHandoffTarget("p1");
    } else {
      setScreen("results2p");
    }
  }

  function handleHandoffContinue() {
    if (handoffTarget === "p2") {
      setTurn("p2");
    } else if (handoffTarget === "p1") {
      setCurrentRound((prev) => prev + 1);
      setTurn("p1");
    }
    setHandoffTarget(null);
    setSelectedOption2p(null);
    setShowFeedback2p(false);
  }

  function handleRestart() {
    setScreen("welcome");
    setSelectedCategory(null);
    setPendingCategory(null);
    setCountdownValue(COUNTDOWN_START);
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setTwoPlayerPool([]);
    setRoundsActual(0);
    setCurrentRound(0);
    setTurn("p1");
    setHandoffTarget(null);
    setScoreP1(0);
    setScoreP2(0);
    setSelectedOption2p(null);
    setShowFeedback2p(false);
    setTimeLeft(TURN_SECONDS);
    setLastTurnKey(null);
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

      {screen === "welcome" && (
        <WelcomeScreen
          mode={mode}
          player1Name={player1Name}
          player2Name={player2Name}
          onModeChange={setMode}
          onPlayer1NameChange={setPlayer1Name}
          onPlayer2NameChange={setPlayer2Name}
          onNext={() => setScreen("setup")}
        />
      )}

      {screen === "welcome" && (
        <button
          className="btn secondary ranking-link"
          onClick={() => setScreen("ranking")}
        >
          Ver ranking
        </button>
      )}

      {screen === "setup" && (
        <SetupScreen
          mode={mode}
          level={level}
          roundCount={roundCount}
          onLevelChange={setLevel}
          onRoundCountChange={setRoundCount}
          onBack={() => setScreen("welcome")}
          onNext={() => setScreen("category")}
        />
      )}

      {screen === "category" && (
        <CategoryScreen
          categories={CATEGORIES}
          onBack={() => setScreen("setup")}
          onSelect={handleCategorySelect}
        />
      )}

      {screen === "countdown" && <CountdownScreen value={countdownValue} />}

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
          statsByCategory={statsByCategory}
          onRestart={handleRestart}
          onSaveRanking={handleSaveRanking}
          onViewRanking={() => setScreen("ranking")}
        />
      )}

      {screen === "quiz2p" && handoffTarget && (
        <HandoffScreen
          playerName={handoffTarget === "p1" ? p1Name : p2Name}
          onContinue={handleHandoffContinue}
        />
      )}

      {screen === "quiz2p" && !handoffTarget && currentTwoPlayerQuestion && (
        <TwoPlayerQuizScreen
          category={selectedCategory}
          question={currentTwoPlayerQuestion}
          turn={turn}
          p1Name={p1Name}
          p2Name={p2Name}
          round={currentRound}
          totalRounds={roundsActual}
          scoreP1={scoreP1}
          scoreP2={scoreP2}
          selectedOption={selectedOption2p}
          showFeedback={showFeedback2p}
          timeLeft={timeLeft}
          onOptionClick={handleOption2PClick}
          onNext={handleNext2P}
        />
      )}

      {screen === "results2p" && (
        <ResultsTwoPlayerScreen
          category={selectedCategory}
          p1Name={p1Name}
          p2Name={p2Name}
          totalRounds={roundsActual}
          scoreP1={scoreP1}
          scoreP2={scoreP2}
          onRestart={handleRestart}
        />
      )}

      {screen === "ranking" && (
        <RankingScreen ranking={ranking} onBack={() => setScreen("welcome")} />
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

function WelcomeScreen({
  mode,
  player1Name,
  player2Name,
  onModeChange,
  onPlayer1NameChange,
  onPlayer2NameChange,
  onNext,
}) {
  return (
    <main className="screen">
      <img src={lopeImg} alt="Lope de Vega" className="lope-hero" />
      <p className="eyebrow">¡Bienvenido, poeta!</p>
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
        <button
          className={`mode-btn ${mode === "2jugadores" ? "active" : ""}`}
          onClick={() => onModeChange("2jugadores")}
        >
          2 jugadores
        </button>
      </div>
      <p className="mode-description">
        {mode === "juego" &&
          "Puntuación, ranking y ritmo más ágil, ideal para divertirte."}
        {mode === "taller" &&
          "Sin puntuación, con más énfasis en explicaciones, fragmentos y contexto, ideal para aprender."}
        {mode === "2jugadores" &&
          "Os pasáis el dispositivo: cada ronda responde primero el Jugador 1 y luego el Jugador 2 a una pregunta distinta. Gana quien acierte más."}
      </p>

      {mode === "2jugadores" && (
        <div className="player-names">
          <label>
            Nombre del Jugador 1
            <input
              type="text"
              placeholder="Jugador 1"
              maxLength={20}
              value={player1Name}
              onChange={(e) => onPlayer1NameChange(e.target.value)}
            />
          </label>
          <label>
            Nombre del Jugador 2
            <input
              type="text"
              placeholder="Jugador 2"
              maxLength={20}
              value={player2Name}
              onChange={(e) => onPlayer2NameChange(e.target.value)}
            />
          </label>
        </div>
      )}

      <div className="nav-actions">
        <button className="nav-btn primary" onClick={onNext}>
          Siguiente
        </button>
      </div>
    </main>
  );
}

function SetupScreen({
  mode,
  level,
  roundCount,
  onLevelChange,
  onRoundCountChange,
  onBack,
  onNext,
}) {
  const roundLabel = mode === "2jugadores" ? "Rondas" : "Preguntas";

  return (
    <main className="screen">
      <p className="eyebrow">Paso 2 de 3</p>
      <h2>Nivel y duración</h2>

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

      <h3>{roundLabel}</h3>
      <div className="mode-toggle">
        {ROUND_OPTIONS.map((n) => (
          <button
            key={n}
            className={`mode-btn ${roundCount === n ? "active" : ""}`}
            onClick={() => onRoundCountChange(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="nav-actions">
        <button className="nav-btn ghost" onClick={onBack}>
          Atrás
        </button>
        <button className="nav-btn primary" onClick={onNext}>
          Siguiente
        </button>
      </div>
    </main>
  );
}

function CategoryScreen({ categories, onBack, onSelect }) {
  return (
    <main className="screen">
      <p className="eyebrow">Paso 3 de 3</p>
      <h2>Elige una categoría</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className="btn category-btn"
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="nav-actions">
        <button className="nav-btn ghost" onClick={onBack}>
          Atrás
        </button>
      </div>
    </main>
  );
}

function CountdownScreen({ value }) {
  return (
    <main className="screen countdown-screen">
      <p className="eyebrow">Prepárate...</p>
      <div className="countdown-number" key={value}>
        {value > 0 ? value : "¡Ya!"}
      </div>
    </main>
  );
}

function QuestionMetaBlock({ question }) {
  return (
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
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function optionClassName(index, correctIndex, showFeedback) {
  if (!showFeedback) return "option-btn";
  return index === correctIndex ? "option-btn correct" : "option-btn incorrect";
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
        {question.options.map((opt, index) => (
          <button
            key={index}
            className={optionClassName(index, question.correctIndex, showFeedback)}
            onClick={() => onOptionClick(index)}
            disabled={showFeedback}
          >
            {opt}
          </button>
        ))}
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

          {mode === "taller" && <QuestionMetaBlock question={question} />}

          <button className="btn" onClick={onNext}>
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}

function HandoffScreen({ playerName, onContinue }) {
  return (
    <main className="screen handoff-screen">
      <h2>Pasa el dispositivo a {playerName}</h2>
      <p className="mode-description">
        Cuando {playerName} esté listo o lista, pulsa continuar para ver su
        pregunta.
      </p>
      <button className="btn" onClick={onContinue}>
        Continuar
      </button>
    </main>
  );
}

function TwoPlayerQuizScreen({
  category,
  question,
  turn,
  p1Name,
  p2Name,
  round,
  totalRounds,
  scoreP1,
  scoreP2,
  selectedOption,
  showFeedback,
  timeLeft,
  onOptionClick,
  onNext,
}) {
  const timedOut = selectedOption === -1;
  const isCorrect =
    !timedOut &&
    selectedOption !== null &&
    selectedOption === question.correctIndex;
  const playerLabel = turn === "p1" ? p1Name : p2Name;
  const isLastTurn = turn === "p2" && round + 1 === totalRounds;
  const timeUrgent = timeLeft <= 10;

  return (
    <main className="screen">
      <div className="quiz-header">
        <span className="badge">{category}</span>
        <span>
          Ronda {round + 1} / {totalRounds}
        </span>
        <span className="turn-badge">Turno: {playerLabel}</span>
      </div>

      <div className="score-row">
        <span>{p1Name}: {scoreP1}</span>
        <span>{p2Name}: {scoreP2}</span>
      </div>

      <div className="timer-row">
        <span className={timeUrgent ? "timer-text urgent" : "timer-text"}>
          {timeLeft}s
        </span>
        <div className="timer-bar">
          <div
            className={timeUrgent ? "timer-fill urgent" : "timer-fill"}
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((round + 1) / totalRounds) * 100}%` }}
        />
      </div>

      <h2 className="question-text">{question.question}</h2>

      <div className="options-list">
        {question.options.map((opt, index) => (
          <button
            key={index}
            className={optionClassName(index, question.correctIndex, showFeedback)}
            onClick={() => onOptionClick(index)}
            disabled={showFeedback}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`feedback ${isCorrect ? "ok" : "fail"}`}>
          <p>
            {isCorrect
              ? "¡Correcto!"
              : timedOut
              ? "Se acabó el tiempo."
              : "Respuesta incorrecta."}
          </p>
          <button className="btn" onClick={onNext}>
            {turn === "p1"
              ? `Pasar turno a ${p2Name}`
              : isLastTurn
              ? "Ver resultados finales"
              : "Siguiente ronda"}
          </button>
        </div>
      )}
    </main>
  );
}

function ResultsTwoPlayerScreen({
  category,
  p1Name,
  p2Name,
  totalRounds,
  scoreP1,
  scoreP2,
  onRestart,
}) {
  let winnerText;
  if (scoreP1 > scoreP2) winnerText = `¡Gana ${p1Name}!`;
  else if (scoreP2 > scoreP1) winnerText = `¡Gana ${p2Name}!`;
  else winnerText = "¡Empate!";

  return (
    <main className="screen">
      <h2>Resultados — 2 jugadores</h2>
      <p>
        Categoría: <strong>{category}</strong> · {totalRounds} rondas
      </p>
      <div className="score-row">
        <span>{p1Name}: {scoreP1} / {totalRounds}</span>
        <span>{p2Name}: {scoreP2} / {totalRounds}</span>
      </div>
      <p className="learning-narrative">{winnerText}</p>

      <div className="results-actions">
        <button className="btn" onClick={onRestart}>
          Volver al inicio
        </button>
      </div>
    </main>
  );
}

function LearningSummary({ statsByCategory }) {
  const entries = Object.entries(statsByCategory);
  if (entries.length === 0) {
    return (
      <p>
        Has jugado poco como para sacar conclusiones poéticas. Vuelve a
        intentarlo.
      </p>
    );
  }

  const withAccuracy = entries.map(([category, stats]) => ({
    category,
    ...stats,
    accuracy: stats.correct / stats.total,
  }));
  const sorted = [...withAccuracy].sort((a, b) => b.accuracy - a.accuracy);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  let narrative;
  if (sorted.length === 1) {
    narrative = `Has acertado ${best.correct}/${best.total} en ${best.category}.`;
  } else if (worst.accuracy === best.accuracy) {
    narrative =
      best.accuracy === 1
        ? "¡Pleno! Has acertado todas las preguntas, en todas las categorías."
        : "Nivel parejo en todas las categorías: ni una destaca sobre las demás.";
  } else {
    narrative = `Has brillado en ${best.category}, te falta afinar en ${worst.category}.`;
  }

  return (
    <div className="learning-summary">
      <h3>Resumen de aprendizaje</h3>
      <ul>
        {withAccuracy.map(({ category, correct, total }) => (
          <li key={category}>
            Has acertado {correct}/{total} en {category}.
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
  statsByCategory,
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

      <LearningSummary statsByCategory={statsByCategory} />

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
        <ul className="ranking-list">
          {ranking.map((entry, index) => (
            <li key={index} className="rank-entry">
              <span className="rank-position">{index + 1}</span>
              <div className="rank-main">
                <div className="rank-top-row">
                  <span className="rank-name">{entry.name}</span>
                  <span className="rank-score">{entry.score} pts</span>
                </div>
                <span className="rank-meta">
                  {entry.correct}/{entry.total} · {entry.category} ·{" "}
                  {entry.mode} · {entry.level}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="btn" onClick={onBack}>
        Volver
      </button>
    </main>
  );
}

export default App;
