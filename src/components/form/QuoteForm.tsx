import type { UseQuoteFormResult } from '../../hooks/useQuoteForm'
import { SiteInput } from './SiteInput'
import { TitleInput } from './TitleInput'
import { ScopeTextarea } from './ScopeTextarea'
import { AmountFields } from './AmountFields'
import { TermsFields } from './TermsFields'
import { ActionButtons } from './ActionButtons'

interface QuoteFormProps {
  form: UseQuoteFormResult
  onDownloadPdf: () => void
  onShareWhatsapp: () => void
}

export function QuoteForm({ form, onDownloadPdf, onShareWhatsapp }: QuoteFormProps) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border-2 border-petrol-800 bg-petrol-900/60 p-4 sm:p-6">
      <SiteInput value={form.site} onChange={form.setSite} error={form.errors.site} />
      <TitleInput value={form.title} onChange={form.setTitle} />
      <ScopeTextarea
        value={form.scopeText}
        onChange={form.setScopeText}
        materialsIncluded={form.materialsIncluded}
        onMaterialsIncludedChange={form.setMaterialsIncluded}
      />
      <AmountFields
        amount={form.amount}
        onAmountChange={form.setAmount}
        amountError={form.errors.amount}
        withTax={form.withTax}
        onWithTaxChange={form.setWithTax}
      />
      <TermsFields
        depositPercentage={form.depositPercentage}
        onDepositPercentageChange={form.setDepositPercentage}
        depositPercentageError={form.errors.depositPercentage}
        validityDays={form.validityDays}
        onValidityDaysChange={form.setValidityDays}
        validityDaysError={form.errors.validityDays}
      />
      <ActionButtons
        onDownloadPdf={onDownloadPdf}
        onShareWhatsapp={onShareWhatsapp}
        onNewQuote={form.resetForm}
        disabled={!form.isValid}
      />
    </section>
  )
}
