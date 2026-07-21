import type { BackupPayload, HistoryEntry } from '../../domain/types'

const INITIAL_NUMBER = 1
const MAX_HISTORY = 20

export interface QuoteRepository {
  getCurrentNumber(): number
  incrementNumber(): number
  getHistory(): HistoryEntry[]
  addToHistory(entry: HistoryEntry): void
  exportBackup(): BackupPayload
  importBackup(payload: BackupPayload): void
}

const STORAGE_KEYS = {
  number: 'quote:currentNumber',
  history: 'quote:history',
} as const

export class LocalStorageQuoteRepository implements QuoteRepository {
  getCurrentNumber(): number {
    const raw = localStorage.getItem(STORAGE_KEYS.number)
    if (raw === null) return INITIAL_NUMBER
    const number = Number(raw)
    return Number.isNaN(number) ? INITIAL_NUMBER : number
  }

  incrementNumber(): number {
    const next = this.getCurrentNumber() + 1
    localStorage.setItem(STORAGE_KEYS.number, String(next))
    return next
  }

  getHistory(): HistoryEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.history)
    if (raw === null) return []
    try {
      const parsed = JSON.parse(raw) as HistoryEntry[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  addToHistory(entry: HistoryEntry): void {
    const history = [entry, ...this.getHistory()].slice(0, MAX_HISTORY)
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history))
  }

  exportBackup(): BackupPayload {
    return {
      currentNumber: this.getCurrentNumber(),
      history: this.getHistory(),
    }
  }

  importBackup(payload: BackupPayload): void {
    localStorage.setItem(STORAGE_KEYS.number, String(payload.currentNumber))
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(payload.history))
  }
}

export const quoteRepository: QuoteRepository = new LocalStorageQuoteRepository()
