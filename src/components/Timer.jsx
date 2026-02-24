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
