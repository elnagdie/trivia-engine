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
