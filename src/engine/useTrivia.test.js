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
