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
