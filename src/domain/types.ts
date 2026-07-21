export interface ScopeItem {
  description: string
}

export interface PaymentTerms {
  depositPercentage: number
  balancePercentage: number
}

export interface Quote {
  number: number
  site: string
  title: string
  scopeItems: ScopeItem[]
  materialsIncluded: boolean
  amount: number
  withTax: boolean
  paymentTerms: PaymentTerms
  validityDays: number
  date: string
}

export type HistoryEntry = Quote

export interface BackupPayload {
  currentNumber: number
  history: HistoryEntry[]
}
