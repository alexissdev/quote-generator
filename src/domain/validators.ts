import type { BackupPayload, HistoryEntry } from './types'

export type ValidationResult = string | null

export function validateAmount(amount: number): ValidationResult {
  if (Number.isNaN(amount) || amount <= 0) {
    return 'El valor debe ser un número mayor a 0.'
  }
  return null
}

export function validateDepositPercentage(percentage: number): ValidationResult {
  if (Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
    return 'El % de anticipo debe estar entre 0 y 100.'
  }
  return null
}

export function validateValidityDays(days: number): ValidationResult {
  if (Number.isNaN(days) || days <= 0 || !Number.isInteger(days)) {
    return 'La validez debe ser un número entero de días mayor a 0.'
  }
  return null
}

export function validateSite(site: string): ValidationResult {
  if (site.trim().length === 0) {
    return 'Ingresá la obra o el cliente.'
  }
  return null
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry.number === 'number' &&
    typeof entry.site === 'string' &&
    typeof entry.title === 'string' &&
    Array.isArray(entry.scopeItems) &&
    typeof entry.materialsIncluded === 'boolean' &&
    typeof entry.amount === 'number' &&
    typeof entry.withTax === 'boolean' &&
    typeof entry.paymentTerms === 'object' &&
    entry.paymentTerms !== null &&
    typeof entry.validityDays === 'number' &&
    typeof entry.date === 'string'
  )
}

export function parseBackupPayload(data: unknown): BackupPayload | null {
  if (typeof data !== 'object' || data === null) return null
  const payload = data as Record<string, unknown>

  if (typeof payload.currentNumber !== 'number') return null
  if (!Array.isArray(payload.history)) return null
  if (!payload.history.every(isHistoryEntry)) return null

  return {
    currentNumber: payload.currentNumber,
    history: payload.history,
  }
}

export function isQuoteReady(params: {
  site: string
  amount: number
  depositPercentage: number
  validityDays: number
}): boolean {
  return (
    validateSite(params.site) === null &&
    validateAmount(params.amount) === null &&
    validateDepositPercentage(params.depositPercentage) === null &&
    validateValidityDays(params.validityDays) === null
  )
}
