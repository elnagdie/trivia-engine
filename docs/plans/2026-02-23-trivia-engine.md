# Trivia Engine Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a reusable React trivia engine with swappable JSON themes, starting with Stranger Things and Harry Potter.

**Architecture:** A custom `useTrivia` hook owns all game state (questions, timer, score, answers). Components are pure UI. Themes are JSON files with questions tagged by difficulty; a CSS file per theme handles visual identity. Adding a new theme = one JSON + one CSS file.

**Tech Stack:** React 18, Vite, Vitest, CSS Modules

---

## Task 1: Scaffold the Vite + React project

**Files:**
- Create: `/Users/esraa/Developer/code/trivia-engine/` (project root)

**Step 1: Scaffold**

```bash
cd /Users/esraa/Developer/code
npm create vite@latest trivia-engine -- --template react
cd trivia-engine
npm install
```

**Step 2: Install Vitest for testing**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

**Step 3: Add vitest config to `vite.config.js`**

Replace the contents of `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
```

**Step 4: Create `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

**Step 5: Clean up Vite boilerplate**

Delete: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

Replace `src/index.css` with an empty file for now.

Replace `src/App.jsx` with:

```jsx
export default function App() {
  return <div>Trivia Engine</div>
}
```

**Step 6: Verify it runs**

```bash
npm run dev
```

Expected: "Trivia Engine" visible at localhost:5173

**Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold vite react project with vitest"
```

---

## Task 2: Create JSON theme files

**Files:**
- Create: `src/themes/stranger-things.json`
- Create: `src/themes/harry-potter.json`

**Step 1: Create `src/themes/stranger-things.json`**

Each question needs: `id`, `type` (`"multiple-choice"` or `"true-false"`), `difficulty` (`"easy"`, `"medium"`, `"hard"`), `question`, and either `options` + `correct` (index) for MC or `correct` (boolean) for TF.

```json
{
  "id": "stranger-things",
  "name": "Stranger Things",
  "description": "Enter the Upside Down... if you dare.",
  "icon": "🔦",
  "questions": [
    {
      "id": 1,
      "type": "multiple-choice",
      "difficulty": "easy",
      "question": "What is the name of the alternate dimension in Stranger Things?",
      "options": ["The Shadow Realm", "The Upside Down", "The Void", "The Dark Side"],
      "correct": 1
    },
    {
      "id": 2,
      "type": "true-false",
      "difficulty": "easy",
      "question": "Eleven's real name is Jane Hopper.",
      "correct": true
    },
    {
      "id": 3,
      "type": "multiple-choice",
      "difficulty": "easy",
      "question": "What is the name of the town where Stranger Things is set?",
      "options": ["Hawkins", "Springfield", "Riverdale", "Castle Rock"],
      "correct": 0
    },
    {
      "id": 4,
      "type": "true-false",
      "difficulty": "easy",
      "question": "Mike Wheeler is Eleven's boyfriend.",
      "correct": true
    },
    {
      "id": 5,
      "type": "multiple-choice",
      "difficulty": "easy",
      "question": "Which character was held captive in the Upside Down in Season 1?",
      "options": ["Dustin", "Will Byers", "Mike", "Lucas"],
      "correct": 1
    },
    {
      "id": 6,
      "type": "multiple-choice",
      "difficulty": "medium",
      "question": "What government lab conducted experiments on Eleven?",
      "options": ["Hawkins National Laboratory", "Area 51", "Starcourt Labs", "The Vault"],
      "correct": 0
    },
    {
      "id": 7,
      "type": "true-false",
      "difficulty": "medium",
      "question": "The Mind Flayer is the main villain in Season 1.",
      "correct": false
    },
    {
      "id": 8,
      "type": "multiple-choice",
      "difficulty": "medium",
      "question": "What season does the character Max Mayfield first appear?",
      "options": ["Season 1", "Season 2", "Season 3", "Season 4"],
      "correct": 1
    },
    {
      "id": 9,
      "type": "true-false",
      "difficulty": "medium",
      "question": "Hopper fakes his death at the end of Season 3.",
      "correct": false
    },
    {
      "id": 10,
      "type": "multiple-choice",
      "difficulty": "medium",
      "question": "What song does Max use to escape Vecna's curse?",
      "options": ["Thriller", "Running Up That Hill", "Don't You Forget About Me", "Come On Eileen"],
      "correct": 1
    },
    {
      "id": 11,
      "type": "multiple-choice",
      "difficulty": "hard",
      "question": "What is Eleven's original lab subject number?",
      "options": ["Eight", "Eleven", "Twelve", "One"],
      "correct": 1
    },
    {
      "id": 12,
      "type": "true-false",
      "difficulty": "hard",
      "question": "Henry Creel is also known as One and later Vecna.",
      "correct": true
    },
    {
      "id": 13,
      "type": "multiple-choice",
      "difficulty": "hard",
      "question": "What is the name of the Soviet prison where Hopper is held in Season 4?",
      "options": ["Kamchatka", "Siberia", "The Gulag", "Chernobyl"],
      "correct": 0
    },
    {
      "id": 14,
      "type": "true-false",
      "difficulty": "hard",
      "question": "Eddie Munson survives the events of Season 4.",
      "correct": false
    },
    {
      "id": 15,
      "type": "multiple-choice",
      "difficulty": "hard",
      "question": "What DnD creature name do the kids give to the villain in Season 1?",
      "options": ["Beholder", "Demogorgon", "Lich", "Mindflayer"],
      "correct": 1
    }
  ]
}
```

**Step 2: Create `src/themes/harry-potter.json`**

```json
{
  "id": "harry-potter",
  "name": "Harry Potter",
  "description": "You're a wizard. Prove it.",
  "icon": "⚡",
  "questions": [
    {
      "id": 1,
      "type": "multiple-choice",
      "difficulty": "easy",
      "question": "What house is Harry Potter sorted into at Hogwarts?",
      "options": ["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"],
      "correct": 2
    },
    {
      "id": 2,
      "type": "true-false",
      "difficulty": "easy",
      "question": "Hermione Granger is a Muggle-born witch.",
      "correct": true
    },
    {
      "id": 3,
      "type": "multiple-choice",
      "difficulty": "easy",
      "question": "What sport do wizards play on broomsticks?",
      "options": ["Broom Racing", "Quidditch", "Wizardball", "Seeker"],
      "correct": 1
    },
    {
      "id": 4,
      "type": "true-false",
      "difficulty": "easy",
      "question": "Voldemort's real name is Tom Riddle.",
      "correct": true
    },
    {
      "id": 5,
      "type": "multiple-choice",
      "difficulty": "easy",
      "question": "What is the name of Harry's owl?",
      "options": ["Crookshanks", "Scabbers", "Hedwig", "Fawkes"],
      "correct": 2
    },
    {
      "id": 6,
      "type": "multiple-choice",
      "difficulty": "medium",
      "question": "What does the spell 'Expelliarmus' do?",
      "options": ["Kills the target", "Disarms the opponent", "Creates a shield", "Summons an object"],
      "correct": 1
    },
    {
      "id": 7,
      "type": "true-false",
      "difficulty": "medium",
      "question": "Sirius Black is Harry's godfather.",
      "correct": true
    },
    {
      "id": 8,
      "type": "multiple-choice",
      "difficulty": "medium",
      "question": "What is the name of the wizarding bank in Diagon Alley?",
      "options": ["Gringotts", "Vaultmore", "Galleon Bank", "The Ministry Vault"],
      "correct": 0
    },
    {
      "id": 9,
      "type": "true-false",
      "difficulty": "medium",
      "question": "Dumbledore was a Slytherin when he attended Hogwarts.",
      "correct": false
    },
    {
      "id": 10,
      "type": "multiple-choice",
      "difficulty": "medium",
      "question": "What creature is Hagrid's pet Norbert?",
      "options": ["Hippogriff", "Norwegian Ridgeback dragon", "Basilisk", "Thestral"],
      "correct": 1
    },
    {
      "id": 11,
      "type": "multiple-choice",
      "difficulty": "hard",
      "question": "What are the three Deathly Hallows?",
      "options": [
        "Elder Wand, Resurrection Stone, Invisibility Cloak",
        "Sorting Hat, Mirror of Erised, Philosopher's Stone",
        "Horcrux, Patronus, Time-Turner",
        "Elder Wand, Marauder's Map, Invisibility Cloak"
      ],
      "correct": 0
    },
    {
      "id": 12,
      "type": "true-false",
      "difficulty": "hard",
      "question": "Snape kills Dumbledore on Dumbledore's own request.",
      "correct": true
    },
    {
      "id": 13,
      "type": "multiple-choice",
      "difficulty": "hard",
      "question": "What is the incantation for the Patronus charm?",
      "options": ["Riddikulus", "Expecto Patronum", "Lumos Maxima", "Protego"],
      "correct": 1
    },
    {
      "id": 14,
      "type": "true-false",
      "difficulty": "hard",
      "question": "Harry Potter is himself a Horcrux.",
      "correct": true
    },
    {
      "id": 15,
      "type": "multiple-choice",
      "difficulty": "hard",
      "question": "Who was the original owner of the Elder Wand before Dumbledore?",
      "options": ["Grindelwald", "Voldemort", "Antioch Peverell", "Nicolas Flamel"],
      "correct": 2
    }
  ]
}
```

**Step 3: Commit**

```bash
git add src/themes/
git commit -m "feat: add stranger things and harry potter question data"
```

---

## Task 3: Build the `useTrivia` hook (core game logic)

**Files:**
- Create: `src/engine/useTrivia.js`
- Create: `src/engine/useTrivia.test.js`

**Step 1: Write the failing tests first**

Create `src/engine/useTrivia.test.js`:

```js
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useTrivia from './useTrivia'
import strangerThings from '../themes/stranger-things.json'

describe('useTrivia', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('starts in idle state', () => {
    const { result } = renderHook(() => useTrivia())
    expect(result.current.phase).toBe('idle')
  })

  it('moves to playing phase after startGame', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    expect(result.current.phase).toBe('playing')
  })

  it('loads exactly 10 questions filtered by difficulty', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    expect(result.current.questions.length).toBe(
      Math.min(10, strangerThings.questions.filter(q => q.difficulty === 'easy').length)
    )
  })

  it('records answer and advances to next question', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    const firstIndex = result.current.currentIndex
    act(() => result.current.submitAnswer(0))
    expect(result.current.currentIndex).toBe(firstIndex + 1)
  })

  it('timer counts down from 30', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    expect(result.current.timeLeft).toBe(30)
    act(() => vi.advanceTimersByTime(5000))
    expect(result.current.timeLeft).toBe(25)
  })

  it('auto-submits wrong answer when timer hits 0', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    act(() => vi.advanceTimersByTime(30000))
    expect(result.current.answers[0].selectedAnswer).toBe(null)
    expect(result.current.answers[0].correct).toBe(false)
  })

  it('moves to reviewing phase after last question', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    const total = result.current.questions.length
    for (let i = 0; i < total; i++) {
      act(() => result.current.submitAnswer(0))
    }
    expect(result.current.phase).toBe('reviewing')
  })

  it('calculates score correctly', () => {
    const { result } = renderHook(() => useTrivia())
    act(() => result.current.startGame(strangerThings, 'easy'))
    // Answer all questions wrong
    const total = result.current.questions.length
    for (let i = 0; i < total; i++) {
      act(() => result.current.submitAnswer(null))
    }
    expect(result.current.score).toBe(0)
  })
})
```

**Step 2: Run tests to verify they fail**

```bash
npm run test
```

Expected: All tests FAIL (useTrivia not yet implemented)

**Step 3: Implement `src/engine/useTrivia.js`**

```js
import { useState, useEffect, useRef, useCallback } from 'react'

const QUESTION_COUNT = 10
const TIMER_SECONDS = 30

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function isCorrect(question, selectedAnswer) {
  if (question.type === 'true-false') {
    return selectedAnswer === question.correct
  }
  return selectedAnswer === question.correct
}

export default function useTrivia() {
  const [phase, setPhase] = useState('idle') // idle | playing | reviewing
  const [theme, setTheme] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const timerRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const advanceQuestion = useCallback((selectedAnswer, currentQuestions, currentIdx, currentAnswers) => {
    clearTimer()

    const question = currentQuestions[currentIdx]
    const correct = selectedAnswer !== null && isCorrect(question, selectedAnswer)

    const newAnswers = [
      ...currentAnswers,
      { questionId: question.id, selectedAnswer, correct }
    ]

    setAnswers(newAnswers)

    const nextIndex = currentIdx + 1
    if (nextIndex >= currentQuestions.length) {
      setPhase('reviewing')
    } else {
      setCurrentIndex(nextIndex)
      setTimeLeft(TIMER_SECONDS)
    }
  }, [clearTimer])

  // We need refs to access current state inside the timer interval
  const questionsRef = useRef(questions)
  const currentIndexRef = useRef(currentIndex)
  const answersRef = useRef(answers)

  useEffect(() => { questionsRef.current = questions }, [questions])
  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])
  useEffect(() => { answersRef.current = answers }, [answers])

  const startTimer = useCallback(() => {
    clearTimer()
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          advanceQuestion(null, questionsRef.current, currentIndexRef.current, answersRef.current)
          return TIMER_SECONDS
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer, advanceQuestion])

  const startGame = useCallback((themeData, difficulty) => {
    const filtered = themeData.questions.filter(q => q.difficulty === difficulty)
    const selected = pickRandom(filtered, Math.min(QUESTION_COUNT, filtered.length))
    setTheme(themeData)
    setQuestions(selected)
    setCurrentIndex(0)
    setAnswers([])
    setTimeLeft(TIMER_SECONDS)
    setPhase('playing')
  }, [])

  const submitAnswer = useCallback((selectedAnswer) => {
    advanceQuestion(selectedAnswer, questionsRef.current, currentIndexRef.current, answersRef.current)
  }, [advanceQuestion])

  const resetGame = useCallback(() => {
    clearTimer()
    setPhase('idle')
    setTheme(null)
    setQuestions([])
    setCurrentIndex(0)
    setAnswers([])
    setTimeLeft(TIMER_SECONDS)
  }, [clearTimer])

  // Start timer when phase becomes playing or currentIndex changes
  useEffect(() => {
    if (phase === 'playing') {
      startTimer()
    } else {
      clearTimer()
    }
    return clearTimer
  }, [phase, currentIndex, startTimer, clearTimer])

  const score = answers.filter(a => a.correct).length

  return {
    phase,
    theme,
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    answers,
    timeLeft,
    score,
    startGame,
    submitAnswer,
    resetGame,
  }
}
```

**Step 4: Run tests to verify they pass**

```bash
npm run test
```

Expected: All tests PASS

**Step 5: Commit**

```bash
git add src/engine/
git commit -m "feat: implement useTrivia hook with timer and scoring"
```

---

## Task 4: Build ThemeSelector and DifficultySelector components

**Files:**
- Create: `src/components/ThemeSelector.jsx`
- Create: `src/components/DifficultySelector.jsx`

**Step 1: Create `src/components/ThemeSelector.jsx`**

```jsx
import strangerThings from '../themes/stranger-things.json'
import harryPotter from '../themes/harry-potter.json'

const THEMES = [strangerThings, harryPotter]

export default function ThemeSelector({ onSelect }) {
  return (
    <div className="theme-selector">
      <h1>Trivia Engine</h1>
      <p>Pick your universe</p>
      <div className="theme-grid">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            className={`theme-card theme-card--${theme.id}`}
            onClick={() => onSelect(theme)}
          >
            <span className="theme-icon">{theme.icon}</span>
            <span className="theme-name">{theme.name}</span>
            <span className="theme-desc">{theme.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Create `src/components/DifficultySelector.jsx`**

```jsx
const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', description: 'Casual fan' },
  { id: 'medium', label: 'Medium', description: 'True fan' },
  { id: 'hard', label: 'Hard', description: 'Superfan' },
]

export default function DifficultySelector({ theme, onSelect, onBack }) {
  return (
    <div className="difficulty-selector">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>{theme.icon} {theme.name}</h2>
      <p>Choose your difficulty</p>
      <div className="difficulty-grid">
        {DIFFICULTIES.map(d => (
          <button
            key={d.id}
            className={`difficulty-card difficulty-card--${d.id}`}
            onClick={() => onSelect(d.id)}
          >
            <span className="difficulty-label">{d.label}</span>
            <span className="difficulty-desc">{d.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/
git commit -m "feat: add ThemeSelector and DifficultySelector components"
```

---

## Task 5: Build Timer and QuestionCard components

**Files:**
- Create: `src/components/Timer.jsx`
- Create: `src/components/QuestionCard.jsx`

**Step 1: Create `src/components/Timer.jsx`**

```jsx
const TOTAL = 30

export default function Timer({ timeLeft }) {
  const pct = (timeLeft / TOTAL) * 100
  const urgent = timeLeft <= 10

  return (
    <div className={`timer ${urgent ? 'timer--urgent' : ''}`}>
      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="timer-label">{timeLeft}s</span>
    </div>
  )
}
```

**Step 2: Create `src/components/QuestionCard.jsx`**

```jsx
export default function QuestionCard({ question, questionNumber, total, onAnswer }) {
  if (!question) return null

  if (question.type === 'true-false') {
    return (
      <div className="question-card">
        <div className="question-meta">Question {questionNumber} of {total}</div>
        <p className="question-text">{question.question}</p>
        <div className="options-grid options-grid--tf">
          <button className="option-btn" onClick={() => onAnswer(true)}>True</button>
          <button className="option-btn" onClick={() => onAnswer(false)}>False</button>
        </div>
      </div>
    )
  }

  return (
    <div className="question-card">
      <div className="question-meta">Question {questionNumber} of {total}</div>
      <p className="question-text">{question.question}</p>
      <div className="options-grid">
        {question.options.map((option, i) => (
          <button
            key={i}
            className="option-btn"
            onClick={() => onAnswer(i)}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/
git commit -m "feat: add Timer and QuestionCard components"
```

---

## Task 6: Build ScoreScreen and AnswerReview components

**Files:**
- Create: `src/components/ScoreScreen.jsx`

**Step 1: Create `src/components/ScoreScreen.jsx`**

```jsx
export default function ScoreScreen({ score, total, answers, questions, theme, onPlayAgain, onChangeTheme }) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="score-screen">
      <h2>{theme.icon} Game Over</h2>
      <div className="score-summary">
        <span className="score-number">{score}/{total}</span>
        <span className="score-pct">{pct}%</span>
      </div>

      <h3>Answer Review</h3>
      <ul className="answer-list">
        {questions.map((q, i) => {
          const answer = answers[i]
          const isCorrect = answer?.correct

          let selectedLabel = '— (no answer)'
          if (answer?.selectedAnswer !== null && answer?.selectedAnswer !== undefined) {
            if (q.type === 'true-false') {
              selectedLabel = String(answer.selectedAnswer)
            } else {
              selectedLabel = q.options[answer.selectedAnswer]
            }
          }

          let correctLabel
          if (q.type === 'true-false') {
            correctLabel = String(q.correct)
          } else {
            correctLabel = q.options[q.correct]
          }

          return (
            <li key={q.id} className={`answer-item ${isCorrect ? 'answer-item--correct' : 'answer-item--wrong'}`}>
              <span className="answer-status">{isCorrect ? '✓' : '✗'}</span>
              <div className="answer-detail">
                <p className="answer-question">{q.question}</p>
                {!isCorrect && (
                  <p className="answer-correction">
                    Your answer: <em>{selectedLabel}</em> · Correct: <strong>{correctLabel}</strong>
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <div className="score-actions">
        <button className="btn btn--primary" onClick={onPlayAgain}>Play Again</button>
        <button className="btn btn--secondary" onClick={onChangeTheme}>Change Theme</button>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ScoreScreen.jsx
git commit -m "feat: add ScoreScreen with answer review"
```

---

## Task 7: Wire everything together in App.jsx

**Files:**
- Modify: `src/App.jsx`

**Step 1: Replace `src/App.jsx`**

```jsx
import { useState } from 'react'
import useTrivia from './engine/useTrivia'
import ThemeSelector from './components/ThemeSelector'
import DifficultySelector from './components/DifficultySelector'
import Timer from './components/Timer'
import QuestionCard from './components/QuestionCard'
import ScoreScreen from './components/ScoreScreen'

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState(null)
  const trivia = useTrivia()

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme)
  }

  const handleDifficultySelect = (difficulty) => {
    trivia.startGame(selectedTheme, difficulty)
  }

  const handleBack = () => {
    setSelectedTheme(null)
  }

  const handlePlayAgain = () => {
    trivia.resetGame()
    // Keep theme selected, go back to difficulty
  }

  const handleChangeTheme = () => {
    trivia.resetGame()
    setSelectedTheme(null)
  }

  const themeClass = selectedTheme ? `theme-${selectedTheme.id}` : ''

  return (
    <div className={`app ${themeClass}`}>
      {trivia.phase === 'idle' && !selectedTheme && (
        <ThemeSelector onSelect={handleThemeSelect} />
      )}

      {trivia.phase === 'idle' && selectedTheme && (
        <DifficultySelector
          theme={selectedTheme}
          onSelect={handleDifficultySelect}
          onBack={handleBack}
        />
      )}

      {trivia.phase === 'playing' && (
        <div className="game-screen">
          <Timer timeLeft={trivia.timeLeft} />
          <QuestionCard
            question={trivia.currentQuestion}
            questionNumber={trivia.currentIndex + 1}
            total={trivia.questions.length}
            onAnswer={trivia.submitAnswer}
          />
        </div>
      )}

      {trivia.phase === 'reviewing' && (
        <ScoreScreen
          score={trivia.score}
          total={trivia.questions.length}
          answers={trivia.answers}
          questions={trivia.questions}
          theme={trivia.theme}
          onPlayAgain={handlePlayAgain}
          onChangeTheme={handleChangeTheme}
        />
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire all components together in App"
```

---

## Task 8: Base styles

**Files:**
- Modify: `src/index.css`

**Step 1: Replace `src/index.css` with base styles**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0f0f0f;
  --surface: #1a1a1a;
  --text: #f0f0f0;
  --text-muted: #888;
  --accent: #e63946;
  --correct: #2dc653;
  --wrong: #e63946;
  --radius: 12px;
  --font: system-ui, sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
}

.app {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

/* Theme Selector */
.theme-selector { text-align: center; }
.theme-selector h1 { font-size: 2.5rem; margin-bottom: .5rem; }
.theme-selector p { color: var(--text-muted); margin-bottom: 2rem; }
.theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.theme-card {
  background: var(--surface);
  border: 2px solid transparent;
  border-radius: var(--radius);
  padding: 2rem 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  transition: border-color .2s, transform .1s;
}
.theme-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.theme-icon { font-size: 2.5rem; }
.theme-name { font-size: 1.2rem; font-weight: bold; }
.theme-desc { font-size: .85rem; color: var(--text-muted); }

/* Difficulty Selector */
.difficulty-selector { text-align: center; }
.back-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; margin-bottom: 1.5rem; font-size: 1rem; }
.back-btn:hover { color: var(--text); }
.difficulty-selector h2 { font-size: 1.8rem; margin-bottom: .5rem; }
.difficulty-selector p { color: var(--text-muted); margin-bottom: 2rem; }
.difficulty-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.difficulty-card {
  background: var(--surface);
  border: 2px solid transparent;
  border-radius: var(--radius);
  padding: 1.5rem 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: .4rem;
  transition: border-color .2s;
}
.difficulty-card:hover { border-color: var(--accent); }
.difficulty-label { font-size: 1.1rem; font-weight: bold; }
.difficulty-desc { font-size: .8rem; color: var(--text-muted); }

/* Game Screen */
.game-screen { display: flex; flex-direction: column; gap: 1.5rem; }

/* Timer */
.timer { display: flex; align-items: center; gap: 1rem; }
.timer-bar { flex: 1; height: 8px; background: var(--surface); border-radius: 4px; overflow: hidden; }
.timer-fill { height: 100%; background: var(--accent); border-radius: 4px; transition: width .9s linear; }
.timer--urgent .timer-fill { background: #ff4d4d; }
.timer-label { font-size: .9rem; color: var(--text-muted); width: 2.5rem; text-align: right; }

/* Question Card */
.question-card { background: var(--surface); border-radius: var(--radius); padding: 2rem; }
.question-meta { font-size: .8rem; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: .05em; }
.question-text { font-size: 1.3rem; line-height: 1.5; margin-bottom: 1.5rem; }
.options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
.options-grid--tf { grid-template-columns: 1fr 1fr; }
.option-btn {
  background: #2a2a2a;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 1rem;
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  display: flex;
  gap: .75rem;
  align-items: center;
  transition: border-color .15s, background .15s;
}
.option-btn:hover { border-color: var(--accent); background: #333; }
.option-letter { font-weight: bold; color: var(--accent); min-width: 1.2rem; }

/* Score Screen */
.score-screen { display: flex; flex-direction: column; gap: 1.5rem; }
.score-screen h2 { font-size: 2rem; }
.score-summary { display: flex; gap: 1rem; align-items: baseline; }
.score-number { font-size: 3rem; font-weight: bold; }
.score-pct { font-size: 1.2rem; color: var(--text-muted); }
.answer-list { list-style: none; display: flex; flex-direction: column; gap: .75rem; }
.answer-item {
  display: flex;
  gap: 1rem;
  background: var(--surface);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid transparent;
}
.answer-item--correct { border-color: var(--correct); }
.answer-item--wrong { border-color: var(--wrong); }
.answer-status { font-size: 1.2rem; }
.answer-question { font-size: .95rem; margin-bottom: .25rem; }
.answer-correction { font-size: .85rem; color: var(--text-muted); }
.score-actions { display: flex; gap: 1rem; }
.btn {
  padding: .75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: opacity .15s;
}
.btn:hover { opacity: .85; }
.btn--primary { background: var(--accent); color: white; }
.btn--secondary { background: var(--surface); color: var(--text); border: 2px solid #444; }
```

**Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add base styles"
```

---

## Task 9: Theme styles

**Files:**
- Create: `src/styles/stranger-things.css`
- Create: `src/styles/harry-potter.css`
- Modify: `src/main.jsx` to import both

**Step 1: Create `src/styles/stranger-things.css`**

```css
.theme-stranger-things {
  --accent: #e40000;
  --bg: #050505;
  --surface: #100000;
  font-family: 'Courier New', monospace;
}

.theme-stranger-things .theme-card--stranger-things {
  border-color: #e40000;
  background: #1a0000;
}

.theme-stranger-things .question-card {
  border: 1px solid #e4000033;
  box-shadow: 0 0 20px #e4000022;
}

.theme-stranger-things .option-btn:hover {
  border-color: #e40000;
  box-shadow: 0 0 8px #e4000066;
}
```

**Step 2: Create `src/styles/harry-potter.css`**

```css
.theme-harry-potter {
  --accent: #c9a84c;
  --bg: #1a1208;
  --surface: #2a1f0e;
  font-family: Georgia, serif;
}

.theme-harry-potter .theme-card--harry-potter {
  border-color: #c9a84c;
  background: #2a1f0e;
}

.theme-harry-potter .question-card {
  border: 1px solid #c9a84c33;
  box-shadow: 0 0 20px #c9a84c11;
}

.theme-harry-potter .option-btn:hover {
  border-color: #c9a84c;
  background: #3a2a10;
}
```

**Step 3: Import theme styles in `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/stranger-things.css'
import './styles/harry-potter.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 4: Commit**

```bash
git add src/styles/ src/main.jsx
git commit -m "feat: add stranger things and harry potter theme styles"
```

---

## Task 10: Final verification

**Step 1: Run all tests**

```bash
npm run test
```

Expected: All tests PASS

**Step 2: Run the app**

```bash
npm run dev
```

Expected: App runs at localhost:5173. Walk through full game flow:
1. Pick Stranger Things → Easy → play 10 questions → see score + review
2. Change theme → Harry Potter → Hard → play 10 questions → see score + review

**Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete trivia engine with stranger things and harry potter themes"
```
