import strangerThings from '../themes/stranger-things.json'
import harryPotter from '../themes/harry-potter.json'
import friends from '../themes/friends.json'

const THEMES = [strangerThings, harryPotter, friends]

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
