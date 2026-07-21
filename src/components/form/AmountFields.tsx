import { CHECKBOX_CLASS, ERROR_CLASS, INPUT_CLASS, LABEL_CLASS } from './inputStyles'

interface AmountFieldsProps {
  amount: number
  onAmountChange: (value: number) => void
  amountError: string | null
  withTax: boolean
  onWithTaxChange: (value: boolean) => void
}

export function AmountFields({
  amount,
  onAmountChange,
  amountError,
  withTax,
  onWithTaxChange,
}: AmountFieldsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Valor ($)</span>
        <input
          type="number"
          min={0}
          className={`${INPUT_CLASS} font-mono`}
          value={amount === 0 ? '' : amount}
          onChange={(event) => onAmountChange(Number(event.target.value))}
        />
        {amountError && <span className={ERROR_CLASS}>{amountError}</span>}
      </label>
      <label className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          className={CHECKBOX_CLASS}
          checked={withTax}
          onChange={(event) => onWithTaxChange(event.target.checked)}
        />
        <span className="text-sm text-bone-200">+ IVA</span>
      </label>
    </div>
  )
}
