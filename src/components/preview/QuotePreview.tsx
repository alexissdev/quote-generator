import type { Quote } from '../../domain/types'
import { buildPaymentTermsText, buildValidityText, formatDate } from '../../domain/formatters'
import { LogoHeader } from './LogoHeader'
import { ItemList } from './ItemList'
import { AmountBox } from './AmountBox'

interface QuotePreviewProps {
  quote: Quote
}

export function QuotePreview({ quote }: QuotePreviewProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-petrol-800 bg-bone-100 p-5 shadow-2xl sm:p-6">
      <LogoHeader number={quote.number} />

      <div>
        <h2 className="font-display text-xl text-petrol-900 sm:text-2xl">
          {quote.title || 'Título del trabajo'}
        </h2>
        <p className="text-sm text-petrol-700">Obra: {quote.site || '—'}</p>
      </div>

      <div>
        <p className="font-display mb-1.5 text-xs tracking-widest text-petrol-700 uppercase">
          Alcance del trabajo
        </p>
        <ItemList items={quote.scopeItems} />
      </div>

      <AmountBox amount={quote.amount} withTax={quote.withTax} />

      <div className="flex flex-col gap-1 border-t-2 border-dashed border-petrol-700/40 pt-3 text-xs text-petrol-700">
        <p>{buildPaymentTermsText(quote.paymentTerms)}</p>
        <p className="italic">{buildValidityText(quote.validityDays)}</p>
        <p>Fecha de emisión: {formatDate(quote.date)}</p>
      </div>
    </div>
  )
}
