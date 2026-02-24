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
