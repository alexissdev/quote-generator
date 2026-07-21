import { useMemo, useState } from 'react'
import type { Quote } from '../domain/types'
import { computePaymentTerms, parseScopeText, stringifyScopeItems } from '../domain/formatters'
import {
  validateAmount,
  validateDepositPercentage,
  validateSite,
  validateValidityDays,
} from '../domain/validators'
import {
  DEFAULT_DEPOSIT_PERCENTAGE,
  DEFAULT_SCOPE_TEXT,
  DEFAULT_VALIDITY_DAYS,
} from '../domain/constants'
import { quoteRepository, type QuoteRepository } from '../services/storage/QuoteRepository'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export interface UseQuoteFormResult {
  site: string
  setSite: (value: string) => void
  title: string
  setTitle: (value: string) => void
  scopeText: string
  setScopeText: (value: string) => void
  materialsIncluded: boolean
  setMaterialsIncluded: (value: boolean) => void
  amount: number
  setAmount: (value: number) => void
  withTax: boolean
  setWithTax: (value: boolean) => void
  depositPercentage: number
  setDepositPercentage: (value: number) => void
  validityDays: number
  setValidityDays: (value: number) => void
  quote: Quote
  errors: {
    site: string | null
    amount: string | null
    depositPercentage: string | null
    validityDays: string | null
  }
  isValid: boolean
  resetForm: () => void
  loadQuote: (entry: Quote) => void
}

export function useQuoteForm(repository: QuoteRepository = quoteRepository): UseQuoteFormResult {
  const [number, setNumber] = useState<number>(() => repository.getCurrentNumber())
  const [site, setSite] = useState('')
  const [title, setTitle] = useState('')
  const [scopeText, setScopeText] = useState(DEFAULT_SCOPE_TEXT)
  const [materialsIncluded, setMaterialsIncluded] = useState(false)
  const [amount, setAmount] = useState(0)
  const [withTax, setWithTax] = useState(false)
  const [depositPercentage, setDepositPercentage] = useState(DEFAULT_DEPOSIT_PERCENTAGE)
  const [validityDays, setValidityDays] = useState(DEFAULT_VALIDITY_DAYS)

  const quote = useMemo<Quote>(
    () => ({
      number,
      site,
      title,
      scopeItems: parseScopeText(scopeText, materialsIncluded),
      materialsIncluded,
      amount,
      withTax,
      paymentTerms: computePaymentTerms(depositPercentage),
      validityDays,
      date: todayISO(),
    }),
    [
      number,
      site,
      title,
      scopeText,
      materialsIncluded,
      amount,
      withTax,
      depositPercentage,
      validityDays,
    ],
  )

  const errors = useMemo(
    () => ({
      site: validateSite(site),
      amount: validateAmount(amount),
      depositPercentage: validateDepositPercentage(depositPercentage),
      validityDays: validateValidityDays(validityDays),
    }),
    [site, amount, depositPercentage, validityDays],
  )

  const isValid = Object.values(errors).every((error) => error === null)

  function resetForm(): void {
    setNumber(repository.incrementNumber())
    setSite('')
    setTitle('')
    setScopeText(DEFAULT_SCOPE_TEXT)
    setMaterialsIncluded(false)
    setAmount(0)
    setWithTax(false)
    setDepositPercentage(DEFAULT_DEPOSIT_PERCENTAGE)
    setValidityDays(DEFAULT_VALIDITY_DAYS)
  }

  function loadQuote(entry: Quote): void {
    setSite(entry.site)
    setTitle(entry.title)
    setScopeText(stringifyScopeItems(entry.scopeItems, entry.materialsIncluded))
    setMaterialsIncluded(entry.materialsIncluded)
    setAmount(entry.amount)
    setWithTax(entry.withTax)
    setDepositPercentage(entry.paymentTerms.depositPercentage)
    setValidityDays(entry.validityDays)
  }

  return {
    site,
    setSite,
    title,
    setTitle,
    scopeText,
    setScopeText,
    materialsIncluded,
    setMaterialsIncluded,
    amount,
    setAmount,
    withTax,
    setWithTax,
    depositPercentage,
    setDepositPercentage,
    validityDays,
    setValidityDays,
    quote,
    errors,
    isValid,
    resetForm,
    loadQuote,
  }
}
