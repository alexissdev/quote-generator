import type { HistoryEntry, PaymentTerms, Quote, ScopeItem } from './types'
import { COMPANY_CONTACT, COMPANY_NAME } from './constants'

export const TAX_PERCENTAGE = 21
const TAX_MULTIPLIER = 1 + TAX_PERCENTAGE / 100

export function formatMoney(value: number): string {
  const rounded = Math.round(value)
  return `$ ${rounded.toLocaleString('es-AR')}`
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export function formatTicketNumber(number: number): string {
  return `N° ${String(number).padStart(3, '0')}`
}

export function parseScopeText(text: string, materialsIncluded: boolean): ScopeItem[] {
  const items = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((description) => ({ description }))

  if (materialsIncluded) {
    items.push({ description: 'Materiales incluidos' })
  }

  return items
}

export function stringifyScopeItems(scopeItems: ScopeItem[], materialsIncluded: boolean): string {
  const items = materialsIncluded ? scopeItems.slice(0, -1) : scopeItems
  return items.map((item) => item.description).join('\n')
}

export function filterHistoryBySite(history: HistoryEntry[], query: string): HistoryEntry[] {
  const normalized = query.trim().toLowerCase()
  if (normalized.length === 0) return history
  return history.filter((entry) => entry.site.toLowerCase().includes(normalized))
}

export function computePaymentTerms(depositPercentage: number): PaymentTerms {
  return {
    depositPercentage,
    balancePercentage: 100 - depositPercentage,
  }
}

export function computeFinalAmount(amount: number, withTax: boolean): number {
  return withTax ? amount * TAX_MULTIPLIER : amount
}

export function computeTaxAmount(amount: number, withTax: boolean): number {
  return withTax ? amount * (TAX_MULTIPLIER - 1) : 0
}

export function buildPaymentTermsText(terms: PaymentTerms): string {
  return `${terms.depositPercentage}% de anticipo y ${terms.balancePercentage}% del saldo contra avance de obra.`
}

export function buildValidityText(validityDays: number): string {
  return `Presupuesto válido por ${validityDays} días desde la fecha de emisión.`
}

export function formatPhone(number: string): string {
  const digits = number.replace(/\D/g, '')
  if (digits.length !== 10) return number
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6)}`
}

export function buildContactText(): string {
  return `Tel: ${formatPhone(COMPANY_CONTACT.phone)}   ·   IG: @${COMPANY_CONTACT.instagram}   ·   ${COMPANY_CONTACT.website}`
}

export function buildWhatsappText(quote: Quote): string {
  const items = quote.scopeItems.map((item) => `• ${item.description}`).join('\n')
  const finalAmount = computeFinalAmount(quote.amount, quote.withTax)
  const amountLabel = quote.withTax ? 'Valor total (IVA incluido)' : 'Valor total'

  const amountLines = quote.withTax
    ? [
        `Subtotal: ${formatMoney(quote.amount)}`,
        `IVA (${TAX_PERCENTAGE}%): ${formatMoney(computeTaxAmount(quote.amount, true))}`,
        `*${amountLabel}: ${formatMoney(finalAmount)}*`,
      ]
    : [`*${amountLabel}: ${formatMoney(finalAmount)}*`]

  return [
    `*${COMPANY_NAME}*`,
    `Presupuesto ${formatTicketNumber(quote.number)}`,
    '',
    `*${quote.title}*`,
    `Obra: ${quote.site}`,
    '',
    'Alcance del trabajo:',
    items,
    '',
    ...amountLines,
    '',
    buildPaymentTermsText(quote.paymentTerms),
    buildValidityText(quote.validityDays),
  ].join('\n')
}
