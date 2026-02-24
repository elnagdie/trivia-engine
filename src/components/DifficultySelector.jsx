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
