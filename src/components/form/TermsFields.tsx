import { ERROR_CLASS, INPUT_CLASS, LABEL_CLASS } from './inputStyles'

interface TermsFieldsProps {
  depositPercentage: number
  onDepositPercentageChange: (value: number) => void
  depositPercentageError: string | null
  validityDays: number
  onValidityDaysChange: (value: number) => void
  validityDaysError: string | null
}

export function TermsFields({
  depositPercentage,
  onDepositPercentageChange,
  depositPercentageError,
  validityDays,
  onValidityDaysChange,
  validityDaysError,
}: TermsFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>% Anticipo</span>
        <input
          type="number"
          min={0}
          max={100}
          className={`${INPUT_CLASS} font-mono`}
          value={depositPercentage}
          onChange={(event) => onDepositPercentageChange(Number(event.target.value))}
        />
        {depositPercentageError && <span className={ERROR_CLASS}>{depositPercentageError}</span>}
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={LABEL_CLASS}>Validez (días)</span>
        <input
          type="number"
          min={1}
          className={`${INPUT_CLASS} font-mono`}
          value={validityDays}
          onChange={(event) => onValidityDaysChange(Number(event.target.value))}
        />
        {validityDaysError && <span className={ERROR_CLASS}>{validityDaysError}</span>}
      </label>
    </div>
  )
}
