import { useCallback, useState } from 'react'
import type { HistoryEntry } from '../domain/types'
import { quoteRepository, type QuoteRepository } from '../services/storage/QuoteRepository'

export interface UseQuoteHistoryResult {
  history: HistoryEntry[]
  addEntry: (entry: HistoryEntry) => void
}

export function useQuoteHistory(
  repository: QuoteRepository = quoteRepository,
): UseQuoteHistoryResult {
  const [history, setHistory] = useState<HistoryEntry[]>(() => repository.getHistory())

  const addEntry = useCallback(
    (entry: HistoryEntry) => {
      repository.addToHistory(entry)
      setHistory(repository.getHistory())
    },
    [repository],
  )

  return { history, addEntry }
}
