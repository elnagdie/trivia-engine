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
